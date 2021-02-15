import React, { Fragment } from 'react'
import cs from 'classnames'

import formatDistanceStrict from 'date-fns/formatDistanceStrict'

export const TwitterLink = (p) => (
  <a
    href={p.href}
    target='_blank'
    rel='noopener noreferrer'
    title={p.title || p.href}
    className='static-tweet-twitter-link'
  >
    <s>{p.type}</s>

    {p.children}
  </a>
)

export const Mention = (p) => (
  <TwitterLink href={p.href} type='@'>
    {p.children[0].replace(/^@/, '')}
  </TwitterLink>
)

export const Hashtag = (p) => (
  <TwitterLink href={p.href} type='#'>
    {p.children[0].replace(/^\#/, '')}
  </TwitterLink>
)

export const Cashtag = (p) => (
  <TwitterLink href={p.href} type='$'>
    {p.children[0].replace(/^\$/, '')}
  </TwitterLink>
)

export const Emoji = ({ className, ...p }) => (
  <img className={cs('static-tweet-emoji', className)} {...p} />
)

// Note: Poll data is most likely cached, so ongoing polls will not be updated
// until a revalidation happens
export const Poll = ({ data }) => {
  const votesCount = data.options.reduce(
    (count, option) => count + option.votes,
    0
  )
  const endsAt = new Date(data.endsAt)
  const now = new Date()

  return (
    <div className='static-tweet-poll'>
      <div className='static-tweet-options'>
        {data.options.map((option) => {
          const per = Math.round((option.votes / votesCount) * 100) || 0
          const width = per || 1 + '%'
          const widthLabel = per + '%'

          return (
            <Fragment key={option.position}>
              <span className='static-tweet-label'>{option.label}</span>
              <span className='static-tweet-chart' style={{ width }}></span>
              <span>{widthLabel}</span>
            </Fragment>
          )
        })}
      </div>
      <hr />
      <div className='static-tweet-footer'>
        <span className='static-tweet-votes-count'>{votesCount} votes</span>
        <span>
          {now > endsAt
            ? 'Final results'
            : `${formatDistanceStrict(endsAt, now)} left`}
        </span>
      </div>
    </div>
  )
}
