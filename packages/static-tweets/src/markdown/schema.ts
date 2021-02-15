// Default schema: https://github.com/syntax-tree/hast-util-sanitize/blob/master/lib/github.json
import schema from 'hast-util-sanitize/lib/github.json'

const githubSchema: any = schema

githubSchema.tagNames.push('video', 'source')

// Allow className for all elements
githubSchema.attributes['*'].push('className')

// Allow specific attributes that are required for the page to render properly
githubSchema.attributes.div = ['dataType', 'dataId']
githubSchema.attributes.blockquote = ['dataId']
githubSchema.attributes.img = ['dataType', 'src', 'height', 'width']
githubSchema.attributes.video = [
  'poster',
  'controls',
  'preload',
  'playsInline',
  'autoPlay',
  'muted',
  'loop'
]
githubSchema.attributes.source = ['src']

export default githubSchema
