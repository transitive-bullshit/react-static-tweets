import React, { forwardRef } from 'react'
import cs from 'classnames'
import useSWR from 'swr'

import { useTwitterContext } from './twitter'
import Node from './html/node.next'
import components from './twitter-layout/components/next'

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
    const { data: tweetAst } = useSWR(
      id,
      (id) => ast || twitter.tweetAstMap[id] || twitter.swrOptions.fetcher(id),
      twitter.swrOptions
    )

    return (
      <article ref={ref} className={cs('static-tweet', className)}>
        {tweetAst && (
          <>
            <Node components={components} node={tweetAst[0]} />

            {caption != null ? (
              <p className='static-tweet-caption'>{caption}</p>
            ) : null}
          </>
        )}
      </article>
    )
  }
)

export { Tweet }
