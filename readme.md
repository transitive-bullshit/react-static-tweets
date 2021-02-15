<p align="center">
  <img alt="Twitter Static Tweets" src="https://raw.githubusercontent.com/transitive-bullshit/react-static-tweets/master/media/notion-ts.png" width="689">
</p>

# Twitter Static Tweets

> Extremely fast static renderer for tweets. TS batteries included. ⚡️

[![NPM](https://img.shields.io/npm/v/notion-client.svg)](https://www.npmjs.com/package/notion-client) [![Build Status](https://travis-ci.com/transitive-bullshit/react-static-tweets.svg?branch=master)](https://travis-ci.com/transitive-bullshit/react-static-tweets) [![Prettier Code Formatting](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)](https://prettier.io)

## Features

- 🚀 **Simple** - TypeScript + React.
- ⚡ **Fast** - 10-100x faster than using Twitter's embed widget iframe.
  - 95-100% Lighthouse scores.
- 🔥 **Solid** - Used in production by [Twitter Search](https://twitter-search.vercel.app) and [react-notion-x](https://transitivebullsh.it).

## Usage

The easiest way to get started is to render tweets client-side (which will by default fetch the tweet AST data on-the-fly).

```tsx
import React from 'react'
import { Tweet } from 'react-static-tweets'

export default Example({ tweetId }) => (
  <Tweet id={tweetId} />
)
```

For more optimized SSR usage, you'll want to pre-fetch the tweet AST data server-side:

```tsx
import React from 'react'
import [ fetchTweetAst } from 'static-tweets'
import { Tweet } from 'react-static-tweets'

const tweetId = '1358199505280262150'

export const getStaticProps = async () => {
  try {
    const tweetAst = await fetchTweetAst(tweetId)

    return {
      props: {
        tweetId,
        tweetAst
      },
      revalidate: 10
    }
  } catch (err) {
    console.error('error fetching tweet info', err)

    throw err
  }
}

export default Example({ tweetId, tweetAst }) => {
  return <Tweet id={tweetId} ast={tweetAst} />
}
```

## Styles

You'll need to import some CSS styles as well. If you're using Next.js, we recommend you put these in `pages/_app.js`:

```ts
// core styles shared by all of react-static-tweets (required)
import 'react-static-tweets/styles.css'
```

## Next.js Example

Here's a full [Next.js example project](https://github.com/transitive-bullshit/react-static-tweets/tree/master/example) with the most important code in [`pages/[pageId]`.tsx](https://github.com/transitive-bullshit/react-static-tweets/blob/master/example/pages/%5BpageId%5D.tsx).

You can check out an [example hosted live on Vercel](https://twitter-search.vercel.app) which provides an Algolia search UI on top of my personal twitter history ([@transitive_bs](https://twitter.com/transitive_bs)).

## Packages

| Package                                               | NPM                                                                                                               | Docs                                   | Environment   | Description                                        |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------------- | -------------------------------------------------- |
| [react-static-tweets](./packages/react-static-tweets) | [![NPM](https://img.shields.io/npm/v/react-static-tweets.svg)](https://www.npmjs.com/package/react-static-tweets) | [docs](./packages/react-static-tweets) | Browser + SSR | Fast React renderer for Tweets.                    |
| [static-tweets](./packages/static-tweets)             | [![NPM](https://img.shields.io/npm/v/static-tweets.svg)](https://www.npmjs.com/package/static-tweets)             | [docs](./docs/static-tweets.md)        | Server-side   | Utilities for fetching and manipulating tweet ASTs |

## License

MIT © [Travis Fischer](https://transitivebullsh.it)

Support my OSS work by <a href="https://twitter.com/transitive_bs">following me on twitter <img src="https://storage.googleapis.com/saasify-assets/twitter-logo.svg" alt="twitter" height="24px" align="center"></a>
