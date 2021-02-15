import React from 'react'
import cs from 'classnames'
import useSWR from 'swr'

import { useTwitter } from './twitter'
import Node from './html/node'
import components from './twitter-layout/components'
import twitterTheme from './twitter-layout/twitter.module.css'

export const Tweet: React.FC<{
  id: string
  ast?: any
  caption?: string
  className?: string
  // TODO: understand what br is used for
  // br?: string
}> = ({ id, ast, caption, className }) => {
  const twitter = useTwitter()
  const { data: tweetAst } = useSWR(
    id,
    (id) => ast || twitter.tweetAstMap[id] || twitter.swrOptions.fetcher(id),
    twitter.swrOptions
  )

  return (
    <main className={cs(twitterTheme.theme, className)}>
      {tweetAst && (
        <>
          <Node components={components} node={tweetAst[0]} />

          {caption != null ? <p>{caption}</p> : null}
        </>
      )}

      <style jsx>{`
        main {
          width: 100%;
          max-width: 550px;
          min-width: 220px;
        }

        p {
          font-size: 14px;
          color: #999;
          text-align: center;
          margin: 0;
          margin-top: 10px;
          padding: 0;
        }
      `}</style>
    </main>
  )
}
