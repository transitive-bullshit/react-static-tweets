import { NextApiRequest, NextApiResponse } from 'next'
import { fetchTweetAst } from 'static-tweets'
import Cors from 'cors'

const cors = initMiddleware(
  Cors({
    methods: ['GET', 'OPTIONS']
  })
)

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  await cors(req, res)

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).send({ error: 'method not allowed' })
  }

  const tweetId = req.query.tweetId as string

  if (!tweetId) {
    return res
      .status(400)
      .send({ error: 'missing required parameter "tweetId"' })
  }

  console.log('getTweetAst', tweetId)
  const tweetAst = await fetchTweetAst(tweetId)
  console.log('tweetAst', tweetId, tweetAst)

  res.status(200).json(tweetAst)
}

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    })
}
