import React, { createContext, ReactNode, useContext } from 'react'
import { ConfigInterface } from 'swr'

// TODO: make this more specific
export type TweetAst = Array<any>

export type TwitterContextValue = {
  // static tweet ast info
  tweetAstMap: TweetAstMap

  // SWR config for dynamically fetching tweet ast info
  swrOptions: ConfigInterface
}

export type TweetAstMap = {
  [tweetId: string]: TweetAst
}

// Saves the tweets returned as props to the page
const TwitterContext = createContext<TwitterContextValue>({
  tweetAstMap: {},
  swrOptions: {
    fetcher: (id) =>
      fetch(`https://twitter-search.vercel.app/api/get-tweet-ast/${id}`).then(
        (r) => r.json()
      )
  }
})

export function useTwitterContext () {
  return useContext(TwitterContext)
}

type TwitterContextProviderProps = {
  value: Partial<TwitterContextValue>
  children?: ReactNode
}

// allows partials that override outer providers
export function TwitterContextProvider ({ value, children }: TwitterContextProviderProps) {
  const currentContext = useContext(TwitterContext)
  const mergedContext = {
    tweetAstMap: {
      ...value.tweetAstMap,
      ...currentContext.tweetAstMap
    },
    swrOptions: {
      ...value.swrOptions,
      ...currentContext.swrOptions
    }
  }
  return (
    <TwitterContext.Provider value={mergedContext}>
      {children}
    </TwitterContext.Provider>
  )
}
