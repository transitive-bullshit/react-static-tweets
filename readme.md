<p align="center">
  <a href="https://react-static-tweets.vercel.app/1352687755621351425">
    <img alt="React Static Tweets" src="https://raw.githubusercontent.com/transitive-bullshit/react-static-tweets/master/example/demo.jpg" width="550">
  </a>
</p>

# React Static Tweets

> Extremely fast static renderer for tweets.

[![NPM](https://img.shields.io/npm/v/react-static-tweets.svg)](https://www.npmjs.com/package/react-static-tweets) [![Build Status](https://github.com/transitive-bullshit/react-static-tweets/actions/workflows/test.yml/badge.svg)](https://github.com/transitive-bullshit/react-static-tweets/actions/workflows/test.yml) [![Prettier Code Formatting](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)](https://prettier.io)

## Why?

Twitter's embedding SDK is horribly slow and inefficient. For embedding tweets on your site (including SSR), this solution is significantly more performant. 🔥

This project takes Vercel's work on [static tweet rendering](https://static-tweet.vercel.app) and packages it up into two easy-to-use NPM packages.

## Features

- ⚡ **Fast** - 10-100x faster than using Twitter's iframe embedding.
- 🔥 **Solid** - Used in production by [super.so](https://s.super.so/x), [react-notion-x](https://transitivebullsh.it/nextjs-notion-starter-kit), and others.
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
import { fetchTweetAst } from 'static-tweets'
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

Here is an [example Next.js project](./example), with the most important code in [`pages/[tweetId]`.tsx](./example/pages/%5BtweetId%5D.tsx). You can view this example [live on Vercel](https://react-static-tweets.vercel.app).

## Packages

| Package                                               | NPM                                                                                                               | Environment   | Description                             |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------- | --------------------------------------- |
| [static-tweets](./packages/static-tweets)             | [![NPM](https://img.shields.io/npm/v/static-tweets.svg)](https://www.npmjs.com/package/static-tweets)             | Node.js       | Fetches tweet ASTs.                     |
| [react-static-tweets](./packages/react-static-tweets) | [![NPM](https://img.shields.io/npm/v/react-static-tweets.svg)](https://www.npmjs.com/package/react-static-tweets) | Browser + SSR | React renderer for tweets given an AST. |

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
