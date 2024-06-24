/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      { source: '/product', destination: '/employers', permanent: true },
      {
        source: '/blog/:slug',
        destination: '/resources/:slug',
        permanent: true,
      },
      { source: '/our-approach', destination: '/', permanent: true },
      {
        source: '/blog/how-to-start-your-job-search',
        destination: '/resources/how-to-start-your-job-search',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    const marketingDomain = process.env.MARKETING_DOMAIN;
    const appDomain = process.env.NEXT_PUBLIC_RECRUITER_APP;
    return [
      {
        source: '/job-post/:path',
        destination: `${appDomain}/job-post/:path`,
      },
      {
        source: '/images/:path',
        destination: `${appDomain}/images/:path`,
      },
      {
        source: '/company-postings/:path',
        destination: `${appDomain}/company-postings/:path`,
      },
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap.xml', // keep it on the same path
      },
      {
        source: '/job-post/system/:slug',
        destination: '/job-post/system/:slug', // keep it on the same path
      },
      {
        source: '/job-post/system/companies/:slug',
        destination: '/job-post/system/companies/:slug', // keep it on the same path
      },

      {
        source: '/job-post/system/cities/:slug',
        destination: '/job-post/system/cities/:slug', // keep it on the same path
      },
      {
        source: '/job-search/:slug',
        destination: '/job-search/:slug', // keep it on the same path
      },
      {
        source: '/_vercel/:path*',
        destination: '/_vercel/:path*', // For vercel anaytics to work
      },
      {
        source: '/',
        destination: `${marketingDomain}/`,
      },
      {
        source: '/:path*',
        destination: `${marketingDomain}/:path*`,
      },
    ];
  },
  images: {
    domains: ['uploads-ssl.webflow.com', '*.aglinthq.com'],
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
