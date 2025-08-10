import type { NextConfig } from 'next';

const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        '*.app.github.dev',
        '*.vercel.app'
      ]
    }
  }
}

export default nextConfig;
