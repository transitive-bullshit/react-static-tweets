# Deprecation Notice

Vercel released [react-tweet](https://github.com/vercel/react-tweet) which is a better maintained version of this library. Please use that instead.

---

# React Static Tweets

> Extremely fast static renderer for tweets.

[![NPM](https://img.shields.io/npm/v/react-static-tweets.svg)](https://www.npmjs.com/package/react-static-tweets) [![Build Status](https://github.com/transitive-bullshit/react-static-tweets/actions/workflows/test.yml/badge.svg)](https://github.com/transitive-bullshit/react-static-tweets/actions/workflows/test.yml) [![Prettier Code Formatting](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)](https://prettier.io)

<p align="center">
  <a href="https://react-static-tweets.vercel.app/1352687755621351425">
    <img alt="React Static Tweets" src="https://raw.githubusercontent.com/transitive-bullshit/react-static-tweets/master/example/demo.jpg" width="550">
  </a>
</p>

## Demo

Visit [react-static-tweets.vercel.app](https://react-static-tweets.vercel.app/1352687755621351425) and append your tweet ID. You can also append `/dynamic/<tweetId>` if you want to test the non-SSR version.

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

Note: this project currently only works with **Next.js** (see [#2](https://github.com/transitive-bullshit/react-static-tweets/issues/2) for more info).

## Usage

You'll need to pre-fetch tweet data server-side using `fetchTweetAst` and then render it using the `Tweet` component.

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
        tweetAst
      },
      revalidate: 10
    }
  } catch (err) {
    console.error('error fetching tweet', err)

    throw err
  }
}

export default function Example({ tweetAst }) {
  return <Tweet ast={tweetAst} />
}
```

Note that `Tweet` is a React server component, and has been tested with Next.js 13 `appDir`.

## Advanced Usage

If you have multiple tweets and are okay with using client components, then we recommend using the built-in `TwitterContextProvider` to store a map from tweet ID to tweet AST.

In this example, we're using the client component imports from `react-static/tweets/client` which use React Context under the hood:

```tsx
import React from 'react'
import pMap from 'p-map'
import { fetchTweetAst } from 'static-tweets'
import { TweetClient, TwitterContextProvider } from 'react-static-tweets/client'

// NOTE: You'll likely infer your list of tweets by introspecting your page's
// content from a CMS.
const tweetIds = [
  '1358199505280262150',
  '1374492662061953034',
  '1358199505280262150'
  // ...
]

export const getStaticProps = async () => {
  try {
    // Fetch all tweet ASTs statically
    const tweetAsts = await pMap(tweetIds, fetchTweetAst, {
      concurrency: 4
    })

    // Create a map from tweet ID to tweet AST
    const tweetAstMap = tweetIds.reduce((tweetId, map, index) => ({
      ...map,
      [tweetId]: tweetAsts[index]
    }))

    return {
      props: {
        tweetAstMap
      },
      revalidate: 60
    }
  } catch (err) {
    console.error('error fetching tweets', err)

    throw err
  }
}

export default function Example({ tweetAstMap }) {
  return (
    <TwitterContextProvider value={{ tweetAstMap }}>
      {tweetIds.map((tweetId) => (
        <div key={tweetId}>
          {/* 
          There's no need to pass the tweet AST directly if it is provided via TwitterContextProvider. This is nice in situations where you're 
          rendering tweets in deeply nested component trees.
          */}
          <TweetClient id={tweetId} />
        </div>
      ))}
    </TwitterContextProvider>
  )
}
```

## Styles

You'll need to import some CSS styles as well. For Next.js, we recommend you put these in `pages/_app`:

```ts
import 'react-static-tweets/styles.css'
```

## Next.js Config

Add `pbs.twimg.com` to your `next.config.js` since we use `next/image` to load images.

```js
module.exports = {
  images: {
    domains: ['pbs.twimg.com']
  }
}
```

## Next.js Example

Here is an [example Next.js project](./example), with the most important code in [`pages/[tweetId].tsx`](./example/pages/%5BtweetId%5D.tsx). You can view this example [live on Vercel](https://react-static-tweets.vercel.app).

## Packages

| Package                                               | NPM                                                                                                               | Environment   | Description                             |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ------------- | --------------------------------------- |
| [static-tweets](./packages/static-tweets)             | [![NPM](https://img.shields.io/npm/v/static-tweets.svg)](https://www.npmjs.com/package/static-tweets)             | Node.js       | Fetches tweet ASTs.                     |
| [react-static-tweets](./packages/react-static-tweets) | [![NPM](https://img.shields.io/npm/v/react-static-tweets.svg)](https://www.npmjs.com/package/react-static-tweets) | Browser + SSR | React renderer for tweets given an AST. |

## Dynamic Client-Side Rendering

`react-static-tweets` is meant for rendering tweets as efficiently as possible. The `Tweet` component assumes that you've already pre-fetched tweet AST data ahead of time, most likely during SSR.

Rendering dynamic tweets on the client-side is supported; however, you'll need to wrap `fetchTweetAst` in an API route since it can't be used from the browser.

You can view an example of this in action via [`example/pages/dynamic/[tweetId].tsx`](./example/pages/dynamic/%5BtweetId%5D.tsx).

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
