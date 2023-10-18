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
        destination: '/signup',
        basePath: false,
        permanent: false,
      },
      {
        source: '/login',
        destination: '/signup?step=signin',
        basePath: false,
        permanent: true,
      },
    ];
  },
  images: {
    images: {
      domains: ['uploads-ssl.webflow.com'],
    },
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
