import './env.mjs'
import { env } from './env.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [env.SPOTIFY_CDN_HOST],
  },
}

export default nextConfig
