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
        source: '/files/:folder/:path*',
        destination: 'http://python-api:8000/files/:folder/:path*'
      }
    ]
  },

  // ②  autoriser les images “distantes” du conteneur python-api
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'python-api',
        port: '8000',
        pathname: '/files/images/**'
      }
    ]
  }
}

export default nextConfig
