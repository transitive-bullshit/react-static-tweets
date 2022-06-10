import GithubSlugger from 'github-slugger'
import { fetchTweetHtml } from './twitter/api'
import { getTweetData } from './twitter/embed/tweet-html'
import getTweetHtml from './twitter/getTweetHtml'
import htmlToAst from './markdown/htmlToAst'

class Context {
  slugger = new GithubSlugger()
  map = []

  get(id) {
    return this.map[Number(id)]
  }

  add(data, nodes) {
    return this.map.push({ data, nodes }) - 1
  }
}

export async function fetchTweetAst(tweetId: string): Promise<any> {
  const tweetHtml = await fetchTweetHtml(tweetId)
  const tweet = tweetHtml && getTweetData(tweetHtml)

  if (!tweet) return null

  const context = new Context()
  const html = await getTweetHtml(tweet, context)
  const ast = await htmlToAst(html, context)

  return ast
}

// temporal! new code goes here in preparation for an incoming refactor
// --------------------------------------------------------------------

export async function unstable_fetchTweetAst(tweetId: string) {
  const tweetHtml = await fetchTweetHtml(tweetId)
  const tweet = tweetHtml && getTweetData(tweetHtml)

  if (!tweet) return null

  const apiData = await fetchTweetAPIData(tweetId)
  const tweetData = extractData(apiData)

  tweet.video = tweetData?.media?.video

  const context = new Context()
  const html = await getTweetHtml(tweet, context)
  const ast = await htmlToAst(html, context)

  return ast
}

// API
// ---

const SYNDICATION_URL = 'https://cdn.syndication.twimg.com'

type VideoVariant = {
  type: string
  src: string
}

type APIVideoData = {
  aspectRatio: [number, number]
  contentType: 'media_entity'
  durationMs: number
  mediaAvailability: {
    status: 'available' | string
  }
  /** URL to the video's thumbnail image. */
  poster: string
  variants: VideoVariant[]
  videoId: {
    type: 'tweet'
    id: string
  }
  viewCount: number
}

type APIData = {
  video?: APIVideoData
}

async function fetchTweetAPIData(
  tweetId: string
): Promise<APIData | undefined> {
  const res = await fetch(`${SYNDICATION_URL}/tweet?id=${tweetId}`)

  if (res.ok) return res.json()
  return undefined
}

// extractors
// ----------

// types: output (extracted data)

type OutputVideo = {
  poster: string
  variants: VideoVariant[]
}

type OutputMedia = {
  video?: OutputVideo
}

type OutputData = {
  media?: OutputMedia
}

function extractVideo(videoData: APIVideoData): OutputVideo {
  const { poster, variants } = videoData
  return { poster, variants }
}

function extractMedia(data: APIData): OutputMedia {
  const outputMedia: OutputMedia = {}

  if (data.video) outputMedia.video = extractVideo(data.video)

  return outputMedia
}

function extractData(data: APIData): OutputData {
  return {
    media: extractMedia(data)
  }
}
