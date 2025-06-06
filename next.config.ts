import type { NextConfig } from 'next'
const path = require('path')

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
    clientSegmentCache: true,
    nodeMiddleware: true
  },
  async rewrites() {
    return [
      {
        source: '/files/videos/:path*',
        destination: `http://python-api:8000/files/videos/:path*`
        // ou si Next.js doit servir lui-même, tu montes ./typeflick-core/files/videos
        // en tant que dossier public de Next, mais ici on reverse-proxy vers Python API
      }
    ]
  }
}

export default nextConfig
