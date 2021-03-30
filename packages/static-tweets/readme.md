<p align="center">
  <a href="https://react-static-tweets.vercel.app/1352687755621351425">
    <img alt="React Static Tweets" src="https://raw.githubusercontent.com/transitive-bullshit/react-static-tweets/master/example/demo.jpg" width="550">
  </a>
</p>

# static-tweets

> Utilities for fetching and manipulating tweet ASTs.

[![NPM](https://img.shields.io/npm/v/static-tweets.svg)](https://www.npmjs.com/package/static-tweets) [![Build Status](https://github.com/transitive-bullshit/react-static-tweets/actions/workflows/build.yml/badge.svg)](https://github.com/transitive-bullshit/react-static-tweets/actions/workflows/build.yml) [![Prettier Code Formatting](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)](https://prettier.io)

## Install

```bash
npm install static-tweets
```

This package is compatible with Node.js.

## Usage

```ts
import [ fetchTweetAst } from 'static-tweets'
import { Tweet } from 'react-static-tweets'

const tweetId = '1358199505280262150'

async function example (tweetId) {
  const tweetAst = await fetchTweetAst(tweetId)

  // tweetAst is a JSON representation of this tweet's contents
  // which `react-static-tweets` can use to render
}
```

## Docs

See the [auto-generated docs](https://github.com/transitive-bullshit/react-static-tweets/blob/master/docs/static-tweets.md).

## License

MIT © [Travis Fischer](https://transitivebullsh.it)

Support my OSS work by <a href="https://twitter.com/transitive_bs">following me on twitter <img src="https://storage.googleapis.com/saasify-assets/twitter-logo.svg" alt="twitter" height="24px" align="center"></a>
