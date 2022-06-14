import { GetStaticProps } from 'next'
import { fetchTweetAst } from 'static-tweets'
import { ExampleTweetPage } from 'components/TweetPage'

// default tweet to show on the homepage
const tweetId = '1352687755621351425'

export const getStaticProps: GetStaticProps = async () => {
  try {
    const tweetAst = await fetchTweetAst(tweetId)
    if (!tweetAst) {
      console.warn('tweet not found', tweetId)
      return {
        notFound: true
      }
    }

    return {
      props: {
        tweetId,
        tweetAst
      },
      revalidate: 30
    }
  } catch (err) {
    console.error('error fetching tweet info', tweetId, err)

    throw err
  }
}

export default ExampleTweetPage
