import React from 'react'
import TweetHeader from './tweet-header'
import TweetInfo from './tweet-info'

export default function Tweet({ children, data }) {
  return (
    <div className='static-tweet-body'>
      <blockquote className='static-tweet-body-blockquote'>
        <TweetHeader tweet={data} />
        {children}
        <TweetInfo tweet={data} />
      </blockquote>
    </div>
  )
}
