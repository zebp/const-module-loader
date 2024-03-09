<h1 align="center">const-module-loader</h1>

<p align="center">
  A Webpack loader for compile-time execution of ESM modules.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/const-module-loader">
    <img src="https://img.shields.io/npm/v/const-module-loader?style=for-the-badge" alt="downloads" height="24">
  </a>
  <a href="https://www.npmjs.com/package/const-module-loader">
    <img src="https://img.shields.io/github/actions/workflow/status/zebp/const-module-loader/ci.yml?branch=main&style=for-the-badge" alt="npm version" height="24">
  </a>
  <a href="https://github.com/zebp/streaming-tar">
    <img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" alt="MIT license" height="24">
  </a>
</p>

## Installation

```bash
# NPM
$ npm install const-module-loader
# Yarn
$ yarn add const-module-loader
# PNPM
$ pnpm add const-module-loader
# Bun
$ bun add const-module-loader
```

## Usage

Depending on what framework you are using your configuration will look slightly different. If you are using a [Vite](https://vitejs.dev) based framework you should instead look towards [vite-plugin-const](https://github.com/zebp/vite-plugin-const), which is the same functionality but for Vite based frameworks.

### Webpack

Add `const-module-loader` as a module rules in your `webpack.config.js`.

```js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.const.ts/,
        use: [{ loader: "const-module-loader" }],
      },
    ],
  },
};
```

### NextJS

Add `const-module-loader` as a module rules in the [webpack section](https://nextjs.org/docs/app/api-reference/next-config-js/webpack) of your `next.config.mjs`.

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    config.module.rules.push({
      test: /\.const.ts/,
      use: [{ loader: "const-module-loader" }],
    });

    return config;
  },
};
```

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
