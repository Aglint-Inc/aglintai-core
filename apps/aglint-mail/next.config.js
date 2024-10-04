const webpack = require('webpack');

/** @type {import('next').NextConfig} */
module.exports = {
  // this is needed so that the code for building emails works properly
  webpack: (
    /** @type {import('webpack').Configuration & { externals: string[] }} */
    config,
    { isServer },
  ) => {
    if (isServer) {
      config.externals.push('esbuild');
    }
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, '');
      }),
    );

    return config;
  },

  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' }, // replace this your actual origin
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,DELETE,PATCH,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },

  // Noticed an issue with typescript transpilation when going from Next 14.1.1 to 14.1.2
  // and I narrowed that down into this PR https://github.com/vercel/next.js/pull/62005
  //
  // What is probably happening is that it's noticing the files for the app are somewhere inside of a `node_modules` and automatically opt-outs of SWC's transpilation.
  //
  // TODO: Open an issue on Nextjs about this.
  transpilePackages: ['react-email'],
};
