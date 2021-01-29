import slugify from "@sindresorhus/slugify";
import fs, {promises as fsP} from "fs";
import {GoogleAuth} from "google-auth-library";
import {drive_v3, google} from "googleapis";
import os from "os";
import path from "path";
import unzipper from "unzipper";

import {
  companyDetails as companyDetails2,
  emptyCompany,
  narrativeMdx,
  processHtml,
} from "./formatter";
import {CompanyDetails} from "./types";
import {memoize, unreachable} from "./utils";

type GoogleDownload = {
  target: string;
  mimeType: "text/html" | "application/zip";
  images?: string[];
};

type GoogleDoc = {
  id: string;
  name: string;
  download?: GoogleDownload;
};

/*
 * The ID's of the Google Drive folders. Maybe move this into some
 * configuration file?
 */
const rootFolder = "1utj9lW171_bANdksQsExR4ObqhDXT-eZ";
const companiesFolder = "1ynbMjZEfM8yPJNSlV63_VvvXrbMTzMYo";

// The scopes we require to have the right permissions.
const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];

// FIXME: I don't want to hard code this path.
process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(
  process.cwd(),
  ".auth.json",
);

// Move a file locally.
const moveFile = async (file: string, dir: string): Promise<void> => {
  const f = path.basename(file);
  const dest = path.resolve(dir, f);

  await fsP.rename(file, dest);
};

export const getAuth = memoize<() => GoogleAuth>(() => {
  const credentialPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  const auth = new google.auth.GoogleAuth({
    keyFile: credentialPath,
    scopes: SCOPES,
  });

  google.options({auth});
  return auth;
});

export const listFiles = async (
  auth: GoogleAuth,
  parent: string,
): Promise<GoogleDoc[]> => {
  const iter = async (pageToken?: string): Promise<drive_v3.Schema$File[]> => {
    const drive = google.drive({version: "v3", auth});
    const {
      data: {files, nextPageToken},
    } = await drive.files.list({
      q: `'${parent}' in parents`,
      pageSize: 10,
      fields: "nextPageToken, files(id,name,mimeType)",
      ...(pageToken ? {pageToken} : undefined),
    });
    if (!files) return [];

    if (nextPageToken) {
      const nextDocs = await iter(nextPageToken);
      return files.concat(nextDocs);
    }

    return files;
  };

  const files = await iter();
  const docs: GoogleDoc[] = [];

  files.forEach(({id, name, mimeType}) => {
    if (id && name) {
      // We have a document.
      if (mimeType === "application/vnd.google-apps.document") {
        docs.push({id, name});
      }
    }
  });

  return docs;
};

/*
 * Fetch a google doc by it's file id and export the document and any
 * associated images as a ZIP file. The document itself is a HTML and images
 * are linked as a relative file path to the media directory within the ZIP
 * file. Use this one if you want to handle images embedded inside of
 * documents.
 */
export const fetchDocumentZip = async (
  auth: GoogleAuth,
  targetDir: string,
  {id, name}: GoogleDoc,
): Promise<GoogleDoc> => {
  let target: string;
  const drive = google.drive({version: "v3", auth});
  const images: string[] = [];

  const res = await drive.files.export(
    {
      fileId: id,
      mimeType: "application/zip",
    },
    {responseType: "stream"},
  );

  return new Promise((resolve, reject) => {
    res.data
      .on("error", reject)
      .pipe(unzipper.Parse())
      .on("entry", (entry) => {
        const entryName = entry.path;
        const targetFile = path.join(targetDir, entryName);

        fs.mkdirSync(path.dirname(targetFile), {recursive: true});

        // We register any downloaded images.
        if (entryName.startsWith("images")) {
          images.push(targetFile);
        }

        // We assume there is only one HTML file per zip file. In our case this
        // is true.
        if (path.extname(entryName) === ".html") {
          target = targetFile;
        }

        // Write out the file to the temporary location.
        entry.pipe(fs.createWriteStream(targetFile));
      })
      .on("error", reject)
      .on("finish", () => {
        if (!target)
          throw new Error(`No HTML file downloaded for ${id}/${name}`);

        const download: GoogleDownload = {
          target,
          images,
          mimeType: "text/html",
        };
        resolve({id, name, download});
      });
  });
};

/*
 * Fetch a google doc by it's file id and export it as HTML. Any images
 * included are links to Google. Use this one if your documents have no images
 * embedded, e.g. companies.
 */
export const fetchDocumentHtml = async (
  auth: GoogleAuth,
  targetDir: string,
  {id, name}: GoogleDoc,
): Promise<GoogleDoc> => {
  const target = path.join(targetDir, `${name}.html`);
  const dest = fs.createWriteStream(target);
  const drive = google.drive({version: "v3", auth});

  const res = await drive.files.export(
    {
      fileId: id,
      mimeType: "text/html",
    },
    {responseType: "stream"},
  );

  return new Promise((resolve, reject) => {
    res.data
      .on("error", reject)
      .pipe(dest)
      .on("error", reject)
      .on("finish", () => {
        const download: GoogleDownload = {target, mimeType: "text/html"};
        resolve({id, name, download});
      });
  });
};

/*
 * Load editorial content from Google Docs.
 */
export const companyDetails = async (): Promise<CompanyDetails[]> => {
  const auth = getAuth();
  const googleDocs = await listFiles(auth, companiesFolder);
  const companiesDir = await fsP.mkdtemp(path.join(os.tmpdir(), "index2020-"));

  return Promise.all(
    googleDocs.map(async (googleDoc) => {
      const doc = await fetchDocumentHtml(auth, companiesDir, googleDoc);
      if (!doc.download) return emptyCompany(doc.id);
      const src = await fsP.readFile(doc.download.target, "utf-8");
      const html = processHtml(src);
      return companyDetails2(doc.name, html);
    }),
  );
};

/*
 * Load the narrative page from Google Docs.
 */
export const narrativeContent = async (name: string): Promise<string> => {
  const auth = getAuth();
  const googleDocs = await listFiles(auth, rootFolder);
  const downloadsDir = await fsP.mkdtemp(path.join(os.tmpdir(), "index2020-"));

  const googleDoc = googleDocs.find(({name: n}) => n === name);
  if (!googleDoc) return unreachable(`unable to fetch ${name}`);
  const doc = await fetchDocumentZip(auth, downloadsDir, googleDoc);
  if (!doc.download) return unreachable(`unable to find ${name} download`);
  const slug = slugify(name);

  const imageDir = path.join(process.cwd(), "src/images", slug);

  await fsP.mkdir(imageDir, {recursive: true});
  await Promise.all(
    (doc.download.images || []).map((file) => {
      return moveFile(file, imageDir);
    }),
  );
  const src = await fsP.readFile(doc.download.target, "utf-8");
  const html = processHtml(src);

  const mdx = narrativeMdx(slug, html);

  return mdx;
};

// FIXME: I keep this code in case I might need it in the future. Create
// recursively a tree from a Google Docs folder.
//
// type Directory = {
//     id: string;
//     name: string;
//     docs: GoogleDoc[];
//     directories: Directory[];
// };
//
// export const tree = async (
//   auth: GoogleAuth,
//   parent: string,
//   parentName: string,
// ): Promise<Directory | undefined> => {
//   const drive = google.drive({version: "v3", auth});
//   const {
//     data: {files},
//   } = await drive.files.list({
//     q: `'${parent}' in parents`,
//     pageSize: 50,
//     fields:
//       "nextPageToken, files(contentHints/thumbnail,fileExtension,iconLink,id,name,size,thumbnailLink,webContentLink,webViewLink,mimeType,parents)",
//   });

//   if (!files) return;

//   const docs: GoogleDoc[] = [];
//   const directories: Promise<Directory | undefined>[] = [];

//   for (const file of files) {
//     const {id, name, mimeType} = file;

//     if (id && name) {
//       // We have a directory.
//       if (mimeType === "application/vnd.google-apps.folder") {
//         directories.push(tree(auth, id, name));
//       }

//       // We have a document.
//       if (mimeType === "application/vnd.google-apps.document") {
//         docs.push({
//           id,
//           name,
//         });
//       }
//     }
//   }

//   return {
//     id: parent,
//     name: parentName,
//     docs,
//     directories: (await Promise.all(directories)).reduce(
//       (memo, d) => (d == undefined ? memo : memo.concat([d])),
//       [],
//     ),
//   };
// };
