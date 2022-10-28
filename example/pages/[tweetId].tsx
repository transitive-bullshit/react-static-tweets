import { GetStaticProps } from 'next'
import { fetchTweetAst } from 'static-tweets'
import { ExampleTweetPage } from 'components/TweetPage'

export const getStaticProps: GetStaticProps = async (context) => {
  const tweetId = context.params.tweetId as string

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

export async function getStaticPaths() {
  return {
    paths: ['/1352687755621351425', '/1358199505280262150'],
    fallback: true
  }
}

export default ExampleTweetPage
