import React from 'react'

function getContainerClassName(dataType) {
  if (!dataType) return

  const [type, count] = dataType.split(' ')

  switch (type) {
    case 'image-container':
      return `image-container image-count-${count}`
    case 'gif-container':
    case 'video-container':
      return type
  }
}

export default {
  div(props, components, i) {
    const { data } = props
    const type = props.dataType || (data && data.type)

    if (type === 'tweet') {
      return (
        <components.Tweet key={i} data={data}>
          {props.children}
        </components.Tweet>
      )
    }

    if (type === 'poll-container') {
      return <components.Poll key={i} data={data} />
    }

    const className = getContainerClassName(type)

    return (
      <components.div key={i} className={className} data={data}>
        {props.children}
      </components.div>
    )
  },

  img({ dataType, ...props }, components, i) {
    if (dataType === 'emoji-for-text') {
      return <components.Emoji key={i} src={props.src} alt={props.alt} />
    }

    if (dataType === 'media-image') {
      return <components.img key={i} {...props} />
    }

    return null
  },

  a(props, components, i) {
    const type = props.dataType

    if (type === 'mention') {
      return (
        <components.Mention
          key={i}
          href={props.href}
          children={props.children}
        />
      )
    }

    if (type === 'hashtag') {
      return (
        <components.Hashtag
          key={i}
          href={props.href}
          children={props.children}
        />
      )
    }

    if (type === 'cashtag') {
      return (
        <components.Cashtag
          key={i}
          href={props.href}
          children={props.children}
        />
      )
    }

    if (type === 'quote-tweet') {
      return <components.EmbeddedTweet key={i} href={props.href} />
    }

    return (
      <components.a key={i} href={props.href} title={props.title}>
        {props.children}
      </components.a>
    )
  },

  blockquote(props, components, i) {
    const ast = props.data?.ast

    if (ast) {
      return <components.EmbeddedTweet key={i} ast={ast[0]} />
    }

    return <components.Blockquote key={i} children={props.children} />
  }
}
