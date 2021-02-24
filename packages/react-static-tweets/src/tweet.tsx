import React from 'react'
import cs from 'classnames'
import useSWR from 'swr'

import { useTwitterContext } from './twitter'
import Node from './html/node'
import components from './twitter-layout/components'

export const Tweet: React.FC<{
  id: string
  ast?: any
  caption?: string
  className?: string
  // TODO: understand what br is used for
  // br?: string
}> = ({ id, ast, caption, className }) => {
  const twitter = useTwitterContext()
  const { data: tweetAst } = useSWR(
    id,
    (id) => ast || twitter.tweetAstMap[id] || twitter.swrOptions.fetcher(id),
    twitter.swrOptions
  )

  return (
    <main className={cs('static-tweet', className)}>
      {tweetAst && (
        <>
          <Node components={components} node={tweetAst[0]} />

          {caption != null ? (
            <p className='static-tweet-caption'>{caption}</p>
          ) : null}
        </>
      )}
    </main>
  )
}
