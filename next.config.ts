import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Disable turbopack - use webpack instead
  turbopack: {
    rules: {},
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
