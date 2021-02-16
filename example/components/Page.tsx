import React from 'react'
import { Tweet } from 'react-static-tweets'
import { GitHubShareButton } from './GitHubShareButton'
import { RandomTweet } from './RandomTweet'
import styles from './styles.module.css'

const defaultRandomTweet = '1358199505280262150'

export const Page: React.FC<{ tweetId: string; tweetAst?: any }> = ({
  tweetId,
  tweetAst
}) => {
  return (
    <>
      <div>
        <h1 className={styles.title}>React Static Tweets Demo</h1>

        <Tweet id={tweetId} ast={tweetAst} />

        <RandomTweet initialId={defaultRandomTweet} />
      </div>

      <GitHubShareButton />
    </>
  )
}
