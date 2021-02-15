<p align="center">
  <img alt="Twitter Static Tweets" src="https://raw.githubusercontent.com/transitive-bullshit/react-static-tweets/master/media/notion-ts.png" width="689">
</p>

# Twitter Static Tweets

> Extremely fast static renderer for tweets. TS batteries included. ⚡️

[![NPM](https://img.shields.io/npm/v/notion-client.svg)](https://www.npmjs.com/package/notion-client) [![Build Status](https://travis-ci.com/transitive-bullshit/react-static-tweets.svg?branch=master)](https://travis-ci.com/transitive-bullshit/react-static-tweets) [![Prettier Code Formatting](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)](https://prettier.io)

---

If you want to build a website with Notion and React, we recommend using this amazing [Next.js template](https://github.com/transitive-bullshit/nextjs-notion-starter-kit) (which uses `react-static-tweets` under the hood).

Just edit one config file to point to your Notion page and deploy in a few minutes!

---

## Features

- 🚀 **Simple** - TypeScript + React.
- ⚡ **Fast** - 10-100x faster than Notion.
  - 95-100% Lighthouse scores.
- 🔥 **Solid** - Used in production by [Twitter Search](https://twitter-search.vercel.app) and [react-notion-x](https://transitivebullsh.it).

## Usage

First you'll want to fetch the content for a Notion page:

```ts
import { NotionAPI } from 'notion-client'

const notion = new NotionAPI()

const recordMap = await notion.getPage('067dd719a912471ea9a3ac10710e7fdf')
```

Once you have the data for a Notion page, you can render it via React:

```tsx
import React from 'react'
import { NotionRenderer } from 'react-static-tweets'

export default ({ recordMap }) => (
  <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={false} />
)
```

You may optionally pass an `authToken` to the API if you want to access private Notion resources.

Note: for heavier blocks, you'll have to opt into using them via `NotionRenderer.components`. These are not included in the default `NotionRenderer` export because they're too heavyweight for the majority of use cases.

## Styles

You'll need to import some CSS styles as well. If you're using Next.js, we recommend you place these imports at the top of `pages/_app.js`:

```ts
// core styles shared by all of react-static-tweets (required)
import 'react-static-tweets/src/styles.css'

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css'

// used for collection views (optional)
import 'rc-dropdown/assets/index.css'

// used for rendering equations (optional)
import 'katex/dist/katex.min.css'
```

## Next.js Example

Here's a full [Next.js example project](https://github.com/transitive-bullshit/react-static-tweets/tree/master/example) with the most important code in [`pages/[pageId]`.tsx](https://github.com/transitive-bullshit/react-static-tweets/blob/master/example/pages/%5BpageId%5D.tsx).

You can check out this [example hosted live on Vercel](https://react-demo.transitive-bullshit.so).

If you're interested in a more robust service built around `react-static-tweets` that features a bunch of additional goodies and optimizations, check out the equivalent [Notion X Demo](https://demo.transitive-bullshit.so).

## Packages

| Package                                               | NPM                                                                                                               | Docs                                   | Environment   | Description                                    |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------------- | ---------------------------------------------- |
| [react-static-tweets](./packages/react-static-tweets) | [![NPM](https://img.shields.io/npm/v/react-static-tweets.svg)](https://www.npmjs.com/package/react-static-tweets) | [docs](./packages/react-static-tweets) | Browser + SSR | Fast React renderer for Notion.                |
| [static-tweets](./packages/static-tweets)             | [![NPM](https://img.shields.io/npm/v/static-tweets.svg)](https://www.npmjs.com/package/static-tweets)             | [docs](./docs/static-tweets.md)        | Universal     | Useful utilities for working with Notion data. |

\* Notion's API should not be called from client-side browsers due to CORS restrictions. `notion-client` is compatible with Node.js and Deno.

## Supported Blocks

The majority of Notion blocks and collection views are fully supported.

## License

MIT © [Travis Fischer](https://transitivebullsh.it)

Support my OSS work by <a href="https://twitter.com/transitive_bs">following me on twitter <img src="https://storage.googleapis.com/saasify-assets/twitter-logo.svg" alt="twitter" height="24px" align="center"></a>
