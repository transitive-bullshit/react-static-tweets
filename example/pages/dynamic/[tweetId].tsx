import * as React from 'react'
import useSWR from 'swr'
import { Tweet } from 'react-static-tweets'

/**
 * This example shows how you can use react-static-tweets to render dynamic
 * content on the client-side by wrapping `fetchTweetAst` in an API route.
 *
 * See `api/get-tweet-ast/[tweetId].tsx` for the corresponding API.
 */

// default dynamic tweet
const tweetId = '1352687755621351425'

const fetcher = (id: string) =>
  fetch(`/api/get-tweet-ast/${id}`).then((r) => r.json())

const DynamicTweet: React.FC<{ tweetId: string }> = ({ tweetId }) => {
  const { data: tweetAst } = useSWR(tweetId, fetcher)
  if (!tweetAst) return null

  return <Tweet id={tweetId} ast={tweetAst} />
}

export default () => {
  return (
    <div>
      <DynamicTweet tweetId={tweetId} />
    </div>
  )
}
