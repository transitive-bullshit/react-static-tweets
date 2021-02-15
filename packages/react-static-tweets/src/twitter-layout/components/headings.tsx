import React from 'react'

const Permalink = ({ children, id }) => (
  <span className='static-tweet-permalink'>
    <span id={id}></span>
    <a href={`#${id}`}>{children}</a>
    <span className='permalink'>#</span>
  </span>
)

export const H1 = (p) => (
  <h1 className='static-tweet-h1'>
    <Permalink id={p.data.id}>{p.children}</Permalink>
  </h1>
)

export const H2 = (p) => (
  <h2 className='static-tweet-h2'>
    <Permalink id={p.data.id}>{p.children}</Permalink>
  </h2>
)

export const H3 = (p) => (
  <h3 className='static-tweet-h3'>
    <Permalink id={p.data.id}>{p.children}</Permalink>
  </h3>
)

export const H4 = (p) => (
  <h4 className='static-tweet-h4'>
    <Permalink id={p.data.id}>{p.children}</Permalink>
  </h4>
)

export const H5 = (p) => (
  <h5 className='static-tweet-h5'>
    <Permalink id={p.data.id}>{p.children}</Permalink>
  </h5>
)

export const H6 = (p) => (
  <h6 className='static-tweet-h6'>
    <Permalink id={p.data.id}>{p.children}</Permalink>
  </h6>
)
