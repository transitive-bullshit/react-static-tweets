import React from 'react'
import cs from 'classnames'
import { Skeleton } from './skeleton'

export default function TweetSkeleton({
  simple = false,
  className = undefined
}) {
  return (
    <div className={cs('static-tweet-skeleton-container', className)}>
      <div className='static-tweet-skeleton-content'>
        <Skeleton style={{ height: '2.25rem' }} />
        <Skeleton style={{ height: '7rem', margin: '1.25rem 0' }} />
        <Skeleton style={{ height: '1.25rem' }} />
      </div>

      {simple ? null : (
        <div className='static-tweet-skeleton-footer'>
          <Skeleton style={{ height: '1.25rem' }} />
        </div>
      )}
    </div>
  )
}
