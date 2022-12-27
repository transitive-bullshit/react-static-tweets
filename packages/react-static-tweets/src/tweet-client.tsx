import React, { forwardRef } from 'react'
import cs from 'clsx'

import { useTwitterContext } from './twitter'
import Node from './html/node'
import components from './twitter-layout/components'

interface TweetProps {
  id: string
  ast?: any
  caption?: string
  className?: string
  // TODO: understand what br is used for
  // br?: string
}

const TweetClient = forwardRef<HTMLElement, TweetProps>(
  ({ id, ast, caption, className }: TweetProps, ref) => {
    const twitter = useTwitterContext()
    const tweetAst = ast || twitter.tweetAstMap[id]
    if (!tweetAst) {
      return null
    }

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

export { TweetClient }
