import https from 'node:https'
import fetch from 'node-fetch'

const API_URL = 'https://api.twitter.com'
const SYNDICATION_URL = 'https://syndication.twitter.com'
const agent = new https.Agent({ maxCachedSessions: 0 })

function twitterLabsEnabled(expansions) {
  if (process.env.TWITTER_LABS_ENABLED !== 'true') return false
  if (!expansions) return true

  const exp = process.env.TWITTER_LABS_EXPANSIONS || ''

  return exp.includes(expansions)
}

async function get(url: string, opts?: any) {
  // twitter's syndication API has some weird bugs with TLS, so we're explicitly
  // disabling TLS session reuse as a workaround
  // @see https://github.com/transitive-bullshit/react-static-tweets/issues/43
  const res = await fetch(url, {
    ...opts,
    agent
  })

  if (res.ok) {
    return res.json()
  }

  if (res.status === 404) {
    return {}
  }

  throw new Error(`Twitter fetch error ${res.status} ${res.statusText}`)
}

export async function fetchTweetsHtml(ids) {
  return get(`${SYNDICATION_URL}/tweets.json?ids=${ids}`)
}

export async function fetchTweetHtml(id) {
  const html = await fetchTweetsHtml(id)
  return html[id]
}

export async function fetchUserStatus(tweetId) {
  // If there isn't an API token don't do anything, this is only required for videos.
  if (!process.env.TWITTER_ACCESS_TOKEN) return null

  return get(
    `${API_URL}/1.1/statuses/show/${tweetId}.json?include_entities=true&tweet_mode=extended`,
    {
      headers: {
        authorization: `Bearer ${process.env.TWITTER_ACCESS_TOKEN}`
      }
    }
  )
}

export async function fetchTweetWithPoll(tweetId) {
  const expansions = 'attachments.poll_ids'

  // If there isn't an API token or Twitter Labs is not enabled, don't do anything,
  // this is only required for Polls.
  if (!process.env.TWITTER_ACCESS_TOKEN || !twitterLabsEnabled(expansions))
    return null

  return get(
    `${API_URL}/labs/1/tweets?format=compact&expansions=${expansions}&ids=${tweetId}`,
    {
      headers: {
        authorization: `Bearer ${process.env.TWITTER_ACCESS_TOKEN}`
      }
    }
  )
}

export async function getEmbeddedTweetHtml(url) {
  return get(`https://publish.twitter.com/oembed?url=${url}`)
}
