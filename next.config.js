const { URL } = require('url')

if (!process.env.NEXT_PUBLIC_PAYLOAD_URL) {
  throw new Error('NEXT_PUBLIC_PAYLOAD_URL is not set')
}

const PAYLOAD_URL = new URL(process.env.NEXT_PUBLIC_PAYLOAD_URL)

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: PAYLOAD_URL.hostname }],
  },
}

module.exports = nextConfig
