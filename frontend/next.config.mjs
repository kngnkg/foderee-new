import './env.mjs'
import { env } from './env.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: env.SPOTIFY_CDN_HOST,
      },
    ],
  },
}

export default nextConfig
