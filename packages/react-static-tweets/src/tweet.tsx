import React, { forwardRef } from 'react'
import cs from 'clsx'
import useSWR from 'swr'

import { useTwitterContext } from './twitter'
import Node from './html/node'
import components from './twitter-layout/components'

type TweetProps = {
  id: string
  ast?: any
  caption?: string
  className?: string
  // TODO: understand what br is used for
  // br?: string
}

const Tweet = forwardRef<HTMLElement, TweetProps>(
  ({ id, ast, caption, className }: TweetProps, ref) => {
    const twitter = useTwitterContext()
    const syncTweetAst = ast || twitter.tweetAstMap[id]
    const { data: tweetAst } = useSWR(
      syncTweetAst ? null : id,
      twitter.swrOptions.fetcher,
      {
        ...twitter.swrOptions,
        isPaused: () => !!syncTweetAst,
        fallbackData: syncTweetAst
      }
    )

    return (
      <article ref={ref} className={cs('static-tweet', className)}>
        {tweetAst && (
          <>
            <Node components={components} node={tweetAst[0]} />

            {caption && <p className='static-tweet-caption'>{caption}</p>}
          </>
        )}
      </article>
    )
  }
)

export { Tweet }
