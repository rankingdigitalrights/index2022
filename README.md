# Index 2020 - Proof of Concept

This is a test to see how well this stack would work for the Index 2020.

## Requirements

Make sure to have a recent version of [NodeJS](https://nodejs.org). This project is developed using NodeJS 12. Further, install the [Yarn package manager](https://yarnpkg.com/).

To fetch the editorial content from Google Docs the authentication token for Google Drive has to be placed in the `./.auth.json` file in the repository root.

## Getting Started

Install all dependencies,

```
yarn install
```

### Storybook

There is a [Storybook](https://storybook.js.org/) for UI component development.

```
yarn storybook
```

The Storybook is accessible at `http://localhost:6006`.

### Development server

```sh
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Verify

```sh
yarn verify
```

This will run `yarn lint` and `yarn type-check`. 

### Production builds

```sh
yarn prod
```

### Storybook

```sh
yarn storybook
```

