# Ranking Digital Rights - 2020 Corporate Accountability Index

> Surveying internet and telecommunications companies on user privacy and freedom of expression

## Setup Development Environment

Make sure to have a recent version of [NodeJS](https://nodejs.org). This project is developed using NodeJS 12. Further, install the [Yarn package manager](https://yarnpkg.com/).

To fetch the editorial content from Google Docs the authentication token for Google Drive has to be placed in the `./.auth.json` file in the repository root.

Once NodeJS and Yarn are setup install all dependencies:

```sh
yarn install
```

## I want to do ...

There are a few common tasks that developers and administrators of this website want to commonly do. This is a summary of each of these tasks and recipes on how to them. All of those tasks are executed on the terminal. Please see [Setup Development Environment](#setup-development-environment) and make sure the environment and dependencies are set up.

- [Update the site data](#update-the-site-data)
- [Generate the company PDFs](#generate-the-company-pdfs)
- [Update HTML meta tags](#update-html-meta-tags)
- [Fetch the latest version](#fetch-the-latest-version)
- [Commit data changes](#commit-data-changes)
- [Deploy website](#deploy-website)
- [Run the local development server](#run-the-local-development-server)
- [Verify code quality](#verify-code-quality)

### Update the site data

1. [Fetch the latest version](#fetch-the-latest-version).
2. Run `yarn data` to regenerate the complete data structures for the website. See below for more information.
3. [Commit data changes](#commit-data-changes).
4. _Optionally:_ [Run the local development server](#run-the-local-development-server) to verify the changes are working as expected.
5. [Deploy website](#deploy-website).

The `yarn data` commands regenerates the **complete** data structure for the website. This is usually the command you want to call. The `yarn data` command is a wrapper for several more specialized commands that each generate a different aspect of the website data.

- The index raw data are stored in different CSV files in [`./csv`](./csv). The `yarn data:csv` command generates JSON data that can be used by the website.
- Narrative content is stored on Google Docs. To only update the narrative content run `yarn data:google`.

Note that no PDF's are generated as part of generating the site data. See [Generate the company PDFs](#generate-the-company-pdfs) for more information.

Calling `yarn data` is equivalent to calling each of the specialized data commands individually.

### Generate the company PDFs

1. [Fetch the latest version](#fetch-the-latest-version).
2. Run `yarn data` to regenerate the complete data structures for the website. See below for more information.
3. Run `yarn data:pdf` to generate new PDF's.
4. [Commit data changes](#commit-data-changes).
5. _Optionally:_ [Run the local development server](#run-the-local-development-server) to verify the changes are working as expected.
6. [Deploy website](#deploy-website).

### Update HTML meta tags

1. [Fetch the latest version](#fetch-the-latest-version).
2. Edit [`data/html-meta.json`](./data/html-meta.json) and update fields as needed. The file is in JSON format and consists of keys and values. Each key generates one entry in the HTML `<head>` section in the form of `<meta name="<key>" content="<value>" />`. The only required keys in this file are `title` and `description`. The other keys are taken as they are.
3. [Commit data changes](#commit-data-changes).
4. _Optionally:_ [Run the local development server](#run-the-local-development-server) to verify the changes are working as expected.
5. [Deploy website](#deploy-website).

### Fetch the latest version

```sh
git pull
yarn install
```

### Commit data changes

```sh
git add data
git commit -m "update website data"
git push
```

### Deploy website

The website can be deployed to staging or to production. The deploy works such that it builds the complete website locally on your own computer and then copies your version of the website to the remote server.

#### Deploy to staging

```sh
yarn deploy
```

#### Deploy to production

Use the `-p` flag to deploy to production instead.

```sh
yarn deploy -p
```

### Run the local development server

```sh
yarn dev
```

Open [http://localhost:3000/index2020](http://localhost:3000/index2020) with your browser to see the result.

### Verify code quality

```sh
yarn verify
```

This will run `yarn lint` and `yarn type-check`.

### Start Storybook

There is a [Storybook](https://storybook.js.org/) for UI component development.

```sh
yarn storybook
```

The Storybook is accessible at `http://localhost:6006`.

## Other bits and pieces

### `indexctl`

The `bin/indexctl.ts` script provides operational support for the index 2020. The command can be invoked with `yarn indexctl`. See all available commands by calling `yarn indexctl -h`.
