const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  experimental: {
    appDir: true
  },
  images: {
    domains: ['pbs.twimg.com'],
    formats: ['image/avif', 'image/webp']
  }
})

module.exports = nextConfig
