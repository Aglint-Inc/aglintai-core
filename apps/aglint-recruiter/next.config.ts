const nextConfig = {
  reactStrictMode: false,
  eslint: {
    dirs: ['src'],
    ignoreDuringBuilds: true,
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
        hostname: 'yxsppaxhvgxwfrpnpuik.supabase.co',
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
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
};

export default nextConfig;
