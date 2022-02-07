import React from 'react'
import { useTweet } from './tweet/tweet'

export const Img = ({ width, height, src, ...p }) => {
  const tweet = useTweet()
  const tweetUrl = `https://twitter.com/${tweet.username}/status/${tweet.id}`

  return (
    <details className='static-tweet-details'>
      <summary
        className='static-tweet-summary'
        style={{
          paddingBottom: `${(height / width) * 100 || 0}%`
        }}
      >
        <a
          href={tweetUrl}
          className='avatar'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img {...p} className='bare' src={`${src}&name=small`} />
        </a>
      </summary>
    </details>
  )
}
