/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  assetPrefix: process.env.NEXT_PUBLIC_HOST_NAME,
  eslint: {
    dirs: ['src'],
  },

  async headers() {
    return [
      {
        source: '/api/jobpost/read',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
      {
        source: '/api/jobpost/write',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/signup',
        basePath: false,
        permanent: false,
      },
      // {
      //   source: '/login',
      //   destination: '/signup?step=signin',
      //   basePath: false,
      //   permanent: true,
      // },
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

module.exports = nextConfig;
