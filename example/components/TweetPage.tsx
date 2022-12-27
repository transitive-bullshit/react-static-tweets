import React from 'react'
import { Tweet } from 'react-static-tweets'
import { GitHubShareButton } from './GitHubShareButton'
import { RandomTweet } from './RandomTweet'
import styles from './styles.module.css'

const defaultRandomTweet = '1358199505280262150'

export const ExampleTweetPage: React.FC<{
  tweetId: string
  tweetAst: any
}> = ({ tweetAst }) => {
  return (
    <>
      <div>
        <h1 className={styles.title}>React Static Tweets Demo</h1>

        <Tweet ast={tweetAst} />

        <RandomTweet initialId={defaultRandomTweet} />
      </div>

      <GitHubShareButton />
    </>
  )
}
