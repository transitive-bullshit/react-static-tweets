import type { ImageProps } from 'next/image'
import Image from 'next/image'
import React from 'react'

// Could be extracted outside
// https://github.com/Microsoft/TypeScript/issues/25760#issuecomment-405931434
type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;


export type TweetHeaderImageProps = WithOptional< Omit<ImageProps, 'layout'>, 'src' | 'alt' | 'height' | 'width'> & {
  layout: "fixed" | "intrinsic" | "responsive";
}


export default function TweetHeader({ tweet, avatarImageProps = {} as TweetHeaderImageProps }: {
  tweet: {
    name: string;
    username: string;
    id: string;
    avatar: {
      normal: string;
    }
  },
  avatarImageProps?: TweetHeaderImageProps
}) {
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
          {...avatarImageProps}
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
