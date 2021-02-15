import React from 'react'
import Image from 'next/image'

export default function TweetHeader({ tweet }) {
  const authorUrl = `https://twitter.com/${tweet.username}`
  const tweetUrl = `https://twitter.com/${tweet.username}/status/${tweet.id}`
  const avatar = tweet.avatar.normal

  return (
    <div className='static-tweet-header'>
      <a
        href={authorUrl}
        className='static-tweet-header-avatar'
        target='_blank'
        rel='noopener noreferrer'
      >
        <Image
          className='static-tweet-header-rounded'
          src={avatar}
          alt={tweet.name}
          height={36}
          width={36}
        />
      </a>

      <a
        href={authorUrl}
        className='static-tweet-header-author'
        target='_blank'
        rel='noopener noreferrer'
      >
        <span className='static-tweet-header-name' title={tweet.name}>
          {tweet.name}
        </span>

        <span
          className='static-tweet-header-username'
          title={`@${tweet.username}`}
        >
          @{tweet.username}
        </span>
      </a>

      <a
        href={tweetUrl}
        className='static-tweet-header-brand'
        target='_blank'
        rel='noopener noreferrer'
      >
        <div
          className='static-tweet-header-icon-twitter'
          title='View on Twitter'
          role='img'
        />
      </a>
    </div>
  )
}
