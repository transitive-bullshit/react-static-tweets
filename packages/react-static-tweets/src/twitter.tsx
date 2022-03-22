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

export interface TwitterContextProviderProps {
  value: Partial<TwitterContextValue>
  children?: ReactNode
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

export function useTwitterContext() {
  return useContext(TwitterContext)
}

// allows partials that override outer providers
export function TwitterContextProvider({
  value,
  children
}: TwitterContextProviderProps) {
  const currentContext = useContext(TwitterContext)
  const { tweetAstMap, swrOptions, ...rest } = value
  const mergedContext = {
    ...currentContext,
    ...rest,
    tweetAstMap: {
      ...currentContext.tweetAstMap,
      ...tweetAstMap
    },
    swrOptions: {
      ...currentContext.swrOptions,
      ...swrOptions
    }
  }

  return (
    <TwitterContext.Provider value={mergedContext}>
      {children}
    </TwitterContext.Provider>
  )
}

export const TwitterContextConsumer = TwitterContext.Consumer
