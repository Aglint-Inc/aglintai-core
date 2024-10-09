// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: false,
  eslint: {
    dirs: ['src'],
    ignoreDuringBuilds: true,
  },
  // logging: {
  //   fetches: {
  //     fullUrl: true,
  //   },
  // },
  // typescript: {
  //   // !! WARN !!
  //   // Dangerously allow production builds to successfully complete even if
  //   // your project has type errors.
  //   // !! WARN !!
  //   ignoreBuildErrors: true,
  // },

  async rewrites() {
    return [
      {
        source: '/api/emails/:path',
        destination: `${process.env.NEXT_PUBLIC_MAIL_HOST}/api/:path`, // proxy to mail api
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        basePath: undefined,
        permanent: false,
      },
      ...(process.env.NODE_ENV === 'production'
        ? [
            {
              source: '/signup',
              destination: '/login',
              basePath: undefined,
              permanent: false,
            },
          ]
        : []),
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'uploads-ssl.webflow.com',
      },
      {
        protocol: 'https',
        hostname: 'resend.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
      {
        protocol: 'https',
        hostname: 'aglintai-seed-data.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'ecfwsyxpcuzxlxrkhxjz.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'gwlinbuxtrnvwvyyhaht.supabase.co',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '64321',
      },
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
      },
    ],
  },
  experimental: {
    instrumentationHook: false,
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
      loaders: {
        // ... any custom loaders you want to use with Turbopack
      },
    },
  },
  transpilePackages: ['@aglint-recruiter/shared-utils'],
};

module.exports = withBundleAnalyzer(nextConfig);
