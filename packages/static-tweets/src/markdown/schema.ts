import { defaultSchema, Schema } from 'hast-util-sanitize'

const githubSchema: Schema = defaultSchema

githubSchema.tagNames.push('video', 'source')

// Allow className for all elements
githubSchema.attributes['*'].push('className')

// Allow specific attributes that are required for the page to render properly
githubSchema.attributes.div = ['dataType', 'dataId']
githubSchema.attributes.blockquote = ['dataId']
githubSchema.attributes.img = ['dataType', 'src', 'height', 'width', 'dataUrl']
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
