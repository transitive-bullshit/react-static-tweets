import { createContext, useContext } from 'react'
import { ConfigInterface } from 'swr'

// TODO: make this more specific
export type TweetAst = Array<any>

export interface TwitterContext {
  // static tweet ast info
  tweetAstMap: TweetAstMap

  // SWR config for dynamically fetching tweet ast info
  swrOptions: ConfigInterface
}

export interface TweetAstMap {
  [tweetId: string]: TweetAst
}

// TODO: expose ability to set partial context

// Saves the tweets returned as props to the page
export const Twitter = createContext<TwitterContext>({
  tweetAstMap: {},
  swrOptions: {
    fetcher: (id) =>
      fetch(
        `https://twitter-search.vercel.app/api/get-tweet-ast/${id}`
      ).then((r) => r.json())
  }
})

export function useTwitter() {
  const twitterContext = useContext(Twitter)

  return twitterContext
}
