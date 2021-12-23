import React from 'react'
import TweetHeader, { TweetHeaderImageProps } from './tweet-header'
import TweetInfo from './tweet-info'
import type { ReactNode } from 'react'

const TweetContext = React.createContext<any>({})

export const useTweet = () => React.useContext(TweetContext)

// could be extracted in utils
// https://fettblog.eu/typescript-react-why-i-dont-use-react-fc/
export type WithChildren<T = {}> = T & { children?: ReactNode }

export default function Tweet({ children, data, avatarImageProps = {} as TweetHeaderImageProps }: {
  children: WithChildren<{}>,
  data: any,
  avatarImageProps: TweetHeaderImageProps
}) {
  return (
    <div className='static-tweet-body'>
      <blockquote className='static-tweet-body-blockquote'>
        <TweetHeader tweet={data} avatarImageProps={avatarImageProps} />
        <TweetContext.Provider value={data}>{children}</TweetContext.Provider>
        <TweetInfo tweet={data} />
      </blockquote>
    </div>
  )
}
