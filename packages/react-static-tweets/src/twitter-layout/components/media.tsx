import React from 'react'
import Image from 'next/image'

export const Img = ({ width, height, src, dataUrl, ...p }) => {
  const image = (
    <Image
      {...p}
      src={`${src}&name=small`}
      quality={80}
      alt={`Tweet image ${src}`}
      fill
      sizes='100vw'
      style={{
        objectFit: 'cover'
      }}
    />
  )

  return (
    <details className='static-tweet-details'>
      <summary
        className='static-tweet-summary'
        style={{
          paddingBottom: `${(height / width) * 100 || 0}%`
        }}
      >
        {dataUrl ? (
          <a
            href={dataUrl}
            className='avatar'
            target='_blank'
            rel='noopener noreferrer'
          >
            {image}
          </a>
        ) : (
          <div className='avatar'>{image}</div>
        )}
      </summary>
    </details>
  )
}
