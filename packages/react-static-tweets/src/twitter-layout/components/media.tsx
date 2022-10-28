import React from 'react'
import Image from 'next/image'
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
          <Image
            {...p}
            src={`${src}&name=small`}
            quality={80}
            alt={`Image from ${tweetUrl}`}
            fill
            sizes='100vw'
            style={{
              objectFit: 'cover'
            }}
          />
        </a>
      </summary>
    </details>
  )
}
