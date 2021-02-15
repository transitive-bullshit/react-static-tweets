<p align="center">
  <img alt="Twitter Static Tweets" src="https://raw.githubusercontent.com/transitive-bullshit/react-static-tweets/master/media/notion-ts.png" width="689">
</p>

# Twitter Static Tweets

> Extremely fast static renderer for tweets.

[![NPM](https://img.shields.io/npm/v/react-static-tweets.svg)](https://www.npmjs.com/package/react-static-tweets) [![Build Status](https://travis-ci.com/transitive-bullshit/react-static-tweets.svg?branch=master)](https://travis-ci.com/transitive-bullshit/react-static-tweets) [![Prettier Code Formatting](https://img.shields.io/badge/code_style-prettier-brightgreen.svg)](https://prettier.io)

## Install

```bash
npm install react-static-tweets
```

## Usage

The easiest way to get started is to render tweets client-side (which will by default fetch the tweet AST data on-the-fly).

```tsx
import React from 'react'
import { Tweet } from 'react-static-tweets'

export default Example({ tweetId }) => (
  <Tweet
    id={tweetId}
  />
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
import 'react-static-tweets/styles.css'
```

## License

MIT © [Travis Fischer](https://transitivebullsh.it)

Support my OSS work by <a href="https://twitter.com/transitive_bs">following me on twitter <img src="https://storage.googleapis.com/saasify-assets/twitter-logo.svg" alt="twitter" height="24px" align="center"></a>
