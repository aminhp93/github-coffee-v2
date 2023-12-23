/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const NextFederationPlugin = require("@module-federation/nextjs-mf");
// const {
//   createSharedDependencies,
// } = require("./@core/configs/next-config-util.js");

// this enables you to use import() and the webpack parser
// loading remotes on demand, not ideal for SSR
const remotes = (isServer) => {
  const location = isServer ? "ssr" : "chunks";
  const endPath = `/_next/static/${location}/remoteEntry.js`;
  return {
    items: `items@${process.env.NEXT_PUBLIC_WEBPMP_V5_ITEMS_BASIC_URL}${endPath}`,
    property: `property@${process.env.NEXT_PUBLIC_WEBPMP_V5_PROPERTIES_URL}${endPath}`,
    widgets: `widgets@${process.env.NEXT_PUBLIC_WEBPMP_V5_WIDGETS_BASIC_URL}${endPath}`,
  };
};

const nextConfig = {
  // reactStrictMode: true,
  webpack: (config, options) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: "home",
        filename: "static/chunks/remoteEntry.js",
        remotes: remotes(options.isServer),
        exposes: {
          "./index": "./pages/index.tsx",
        },
        // shared: createSharedDependencies(),
        shared: {},
      })
    );

    return config;
  },
  eslint: {
    dirs: ["."], //or ['pages', 'hooks']
  },
};

module.exports = nextConfig;
