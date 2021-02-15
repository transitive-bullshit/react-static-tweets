import React from 'react'
import cs from 'classnames'

export const Skeleton: React.FC<{
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}> = ({ children, className, style }) => {
  return (
    <span className={cs('static-tweet-skeleton', className)} style={style}>
      {children}
    </span>
  )
}
