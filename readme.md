<p align="center">
  <a href="https://react-static-tweets.vercel.app/1352687755621351425">
    <img alt="React Static Tweets" src="https://raw.githubusercontent.com/transitive-bullshit/react-static-tweets/master/example/demo.jpg" width="550">
  </a>
</p>

# React Static Tweets

> Extremely fast static renderer for tweets.

[![NPM](https://img.shields.io/npm/v/react-static-tweets.svg)](https://www.npmjs.com/package/react-static-tweets) [![Build Status](https://github.com/transitive-bullshit/react-static-tweets/actions/workflows/test.yml/badge.svg)](https://github.com/transitive-bullshit/react-static-tweets/actions/workflows/test.yml) [![Prettier Code Formatting](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)](https://prettier.io)

## Why?

Twitter's embedding SDK is horribly slow and inefficient. For embedding tweets on your site (including SSR), this solution is 10-100x faster! 🔥

This project takes Vercel's work on [static tweet rendering](https://static-tweet.vercel.app) and packages it up into two easy-to-use NPM packages.

This project is being used in production by [super.so](https://s.super.so/x).

## Features

- ⚡ **Fast** - 10-100x faster than using Twitter's iframe widget.
- 🔥 **Solid** - Used in production by [super.so](https://s.super.so/x), [addpotion.so](https://addpotion.so), [Twitter Search](https://twitter-search.vercel.app) and [react-notion-x](https://transitivebullsh.it/nextjs-notion-starter-kit).
- 🚀 **Simple** - TypeScript + React.

## Install

```bash
npm install react-static-tweets static-tweets date-fns
# or
yarn add react-static-tweets static-tweets date-fns
```

## Usage

The easiest way to get started is to render tweets client-side (which will fetch the tweet data on-the-fly).

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
import { value fetchTweetAst } from 'static-tweets'
import { value Tweet } from 'react-static-tweets'

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

export default function Example({ tweetId, tweetAst }) {
  return <Tweet id={tweetId} ast={tweetAst} />
}
```

Add `pbs.twimg.com` to your `next.config.js` since we use `next/image` to load images.

```js
module.exports = {
  images: {
    domains: ['pbs.twimg.com']
  }
}
```

## Styles

You'll need to import some CSS styles as well. If you're using Next.js, we recommend you put these in `pages/_app`:

```ts
import 'react-static-tweets/styles.css'
```

## Next.js Example

Here is an [example Next.js project](https://github.com/transitive-bullshit/react-static-tweets/tree/master/example), with the most important code in [`pages/[tweetId]`.tsx](https://github.com/transitive-bullshit/react-static-tweets/blob/master/example/pages/%5BtweetId%5D.tsx). You can view this example [live on Vercel](https://react-static-tweets.vercel.app)

Here is a [demo page](https://react-notion-x-demo.transitivebullsh.it/7b7f063709034186adbfb46f455d5065) which shows how different types of tweets render.

For more advanced exammples, check out:

- [twitter search](https://twitter-search.vercel.app) - An Algolia search UI on top of my twitter history ([@transitive_bs](https://twitter.com/transitive_bs)).
- [react-notion-x](https://github.com/NotionX/react-notion-x) - A React renderer for Notion with batteries included. ([demo of tweet embedding](<(https://react-notion-x-demo.transitivebullsh.it/7b7f063709034186adbfb46f455d5065)>))
- [nextjs-notion-starter-kit](https://github.com/transitive-bullshit/nextjs-notion-starter-kit/blob/c7d572ed58d49d2c3f6a7245a1f1edc8929e96df/components/NotionPage.tsx#L167) - Production-ready starter kit for building websites with Notion, including static tweet embeds.

## Packages

| Package                                               | NPM                                                                                                               | Docs                                   | Environment   | Description                     |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------------- | ------------------------------- |
| [react-static-tweets](./packages/react-static-tweets) | [![NPM](https://img.shields.io/npm/v/react-static-tweets.svg)](https://www.npmjs.com/package/react-static-tweets) | [docs](./packages/react-static-tweets) | Browser + SSR | Fast React renderer for Tweets. |
| [static-tweets](./packages/static-tweets)             | [![NPM](https://img.shields.io/npm/v/static-tweets.svg)](https://www.npmjs.com/package/static-tweets)             | [docs](./docs/static-tweets.md)        | Node.js       | Fetches tweet ASTs.             |

## Credit

My main contribution is packaging the Vercel team's excellent work into two isolated packages: `static-tweets` for server-side fetching of tweet ASTs and `react-static-tweets` for client-side rendering as well as SSR.

- Inspired by this [demo](https://static-tweet.vercel.app/) from the Vercel team
- And the underlying [repo](https://github.com/lfades/static-tweet) by [Luis Alvarez](https://github.com/lfades)
- Most of the core code is adapted from [Guillermo Rauch's blog](https://github.com/rauchg/blog/blob/master/pages/2020/2019-in-review.js)
- Converted the JS codebase to TypeScript
- Removed `styled-jsx` because using a flat CSS file (with a `.static-tweet` class prefix) makes bundling for NPM easier
- Fixed some minor formatting bugs

## License

MIT © [Travis Fischer](https://transitivebullsh.it)

Support my OSS work by <a href="https://twitter.com/transitive_bs">following me on twitter <img src="https://storage.googleapis.com/saasify-assets/twitter-logo.svg" alt="twitter" height="24px" align="center"></a>
