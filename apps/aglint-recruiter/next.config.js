const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  assetPrefix:
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_HOST_NAME
      : '', //need for reverse proxy for job preview link
  eslint: {
    dirs: ['src'],
    ignoreDuringBuilds: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  async rewrites() {
    return [
      {
        source: '/api/emails/:path',
        destination: `${process.env.NEXT_PUBLIC_MAIL_HOST}/api/:path`, // proxy to mail api
      },
    ];
  },
  async redirects() {
    const redirects = [
      {
        source: '/',
        destination: '/login',
        basePath: false,
        permanent: false,
      },
    ];
    if (process.env.NODE_ENV === 'production') {
      redirects.push({
        source: '/signup',
        destination: '/login',
        basePath: false,
        permanent: false,
      });
    }
    return redirects;
  },
  images: {
    domains: ['uploads-ssl.webflow.com'],
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
