import { fetchTweetAst } from 'static-tweets'
import { ExampleTweetPage } from 'components/TweetPage'
import { notFound } from 'next/navigation'

// default tweet to show on the homepage
const tweetId = '1352687755621351425'

export default async function HomePage() {
  const tweetAst = await fetchTweetAst(tweetId)
  if (!tweetAst) {
    console.warn('tweet not found', tweetId)
    return notFound()
  }

  return <ExampleTweetPage tweetId={tweetId} tweetAst={tweetAst} />
}
