import React, { forwardRef } from 'react'
import cs from 'clsx'

import Node from './html/node'
import components from './twitter-layout/components'

interface TweetProps {
  ast: any
  caption?: string
  className?: string
  // TODO: understand what br is used for
  // br?: string
}

const Tweet = forwardRef<HTMLElement, TweetProps>(
  ({ ast, caption, className }: TweetProps, ref) => {
    if (!ast?.length) {
      return null
    }

    return (
      <article ref={ref} className={cs('static-tweet', className)}>
        <Node components={components} node={ast[0]} />

        {caption && <p className='static-tweet-caption'>{caption}</p>}
      </article>
    )
  }
)

export { Tweet }
