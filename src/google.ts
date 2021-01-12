import fs, {promises as fsP} from "fs";
import {GoogleAuth} from "google-auth-library";
import {drive_v3, google} from "googleapis";
import os from "os";
import path from "path";

import {
  companyDetails as companyDetails2,
  emptyCompany,
  processHtml,
} from "./formatter";
import {CompanyDetails} from "./types";
import {memoize, unreachable} from "./utils";

type GoogleDownload = {
  target: string;
  mimeType: "text/html" | "application/zip";
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
const rootFolder = "1Hu0Bi5yMBk-NSzsoTMV42ldA-d0ji2vA";
const companiesFolder = "1aByjKhv9N9nNQBRNK1GVdraU0qorv7dX";

// The scopes we require to have the right permissions.
const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"];

// FIXME: I don't want to hard code this path.
process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(
  process.cwd(),
  ".auth.json",
);

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
  const target = path.join(targetDir, `${name}.zip`);
  const dest = fs.createWriteStream(target);
  const drive = google.drive({version: "v3", auth});

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
      .pipe(dest)
      .on("error", reject)
      .on("finish", () => {
        const download: GoogleDownload = {target, mimeType: "text/html"};
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
 * Load the policy recommendations from Google Docs.
 */
export const policyRecommendations = async (): Promise<string> => {
  const auth = getAuth();
  const googleDocs = await listFiles(auth, rootFolder);
  const downloadsDir = await fsP.mkdtemp(path.join(os.tmpdir(), "index2020-"));

  const googleDoc = googleDocs.find(
    ({name}) => name === "Policy Recommendations",
  );
  if (!googleDoc) return unreachable("unable to fetch policy recommendations");
  const doc = await fetchDocumentHtml(auth, downloadsDir, googleDoc);
  if (!doc.download)
    return unreachable("unable to find policy recommendations download");
  const src = await fsP.readFile(doc.download.target, "utf-8");
  const html = processHtml(src);

  return html;
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
