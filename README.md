# Index 2020 - Proof of Concept

This is a test to see how well this stack would work for the Index 2020.

## Requirements

Make sure to have a recent version of [NodeJS](https://nodejs.org). This project is developed using NodeJS 12. Further, install the [Yarn package manager](https://yarnpkg.com/).

## Getting Started

This repository depends on the index2019 repository. The repository has to be cloned into the parent directory of this repository and be named `index2019`, e.g.

```
+-~
  +-Projects
    +-index2019
    +-index2020-poc
```

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

