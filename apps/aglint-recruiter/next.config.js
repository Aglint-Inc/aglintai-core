const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    dirs: ['src'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        basePath: false,
        permanent: false,
      },
    ];
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
