import React from 'react'
import cs from 'classnames'

export const P = ({ className = undefined, ...p }) => (
  <p className='static-tweet-p' {...p} />
)

export const Blockquote = ({ className = undefined, ...p }) => (
  <blockquote className={cs('static-tweet-blockquote', className)} {...p} />
)

export const Hr = ({ className = undefined, ...p }) => (
  <hr className={cs('static-tweet-hr', className)} {...p} />
)
