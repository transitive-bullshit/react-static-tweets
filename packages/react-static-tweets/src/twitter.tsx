import React, { createContext, ReactNode, useContext } from 'react'

// TODO: make this more specific
export type TweetAst = Array<any>

export type TwitterContextValue = {
  // static tweet ast info
  tweetAstMap: TweetAstMap
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
  tweetAstMap: {}
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
  const { tweetAstMap, ...rest } = value
  const mergedContext = {
    ...currentContext,
    ...rest,
    tweetAstMap: {
      ...currentContext.tweetAstMap,
      ...tweetAstMap
    }
  }

  return (
    <TwitterContext.Provider value={mergedContext}>
      {children}
    </TwitterContext.Provider>
  )
}

export const TwitterContextConsumer = TwitterContext.Consumer
