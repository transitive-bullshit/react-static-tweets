import { fetchTweetAst } from 'static-tweets'
import { Page } from 'components/Page'

// default tweet to show on the homepage
const tweetId = '1361462293918343169'

export const getStaticProps = async () => {
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

export default Page
