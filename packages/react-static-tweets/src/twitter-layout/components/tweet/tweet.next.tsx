import React from 'react'
import TweetHeader from './tweet-header'
import TweetInfo from './tweet-info'

const TweetContext = React.createContext<any>({})

export const useTweet = () => React.useContext(TweetContext)

export default function Tweet({ children, data }) {
  return (
    <div className='static-tweet-body'>
      <blockquote className='static-tweet-body-blockquote'>
        <TweetHeader tweet={data} />
        <TweetContext.Provider value={data}>{children}</TweetContext.Provider>
        <TweetInfo tweet={data} />
      </blockquote>
    </div>
  )
}
