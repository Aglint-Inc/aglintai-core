/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // assetPrefix: process.env.NEXT_PUBLIC_HOST_NAME,
  eslint: {
    dirs: ['src']
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/signup',
        basePath: false,
        permanent: false
      }
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
        hostname: '**'
      }
    ]
  }
};

module.exports = nextConfig;
