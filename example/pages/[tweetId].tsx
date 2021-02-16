import { fetchTweetAst } from 'static-tweets'
import { Page } from 'components/Page'

export const getStaticProps = async (context) => {
  const tweetId = context.params.tweetId as string

  try {
    const tweetAst = await fetchTweetAst(tweetId)

    return {
      props: {
        tweetId,
        tweetAst
      },
      revalidate: 10
    }
  } catch (err) {
    console.error('error fetching tweet info', tweetId, err)

    throw err
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  }
}

export default Page
