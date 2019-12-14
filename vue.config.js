const { GenerateSW } = require("workbox-webpack-plugin");

const runtimeCaching = {
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com/,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "google-fonts-stylesheets"
      }
    },
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com/,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts-webfonts",
        cacheableResponse: {
          statuses: [0, 200]
        },
        expiration: {
          maxEntries: 30,
          maxAgeSeconds: 60 * 60 * 24 * 365
        }
      }
    }
  ]
};

module.exports = {
  publicPath: process.env.NODE_ENV === "development" ? "/code-reader/" : "",

  configureWebpack: {
    plugins: [
      process.env.NODE_ENV === "development"
        ? new GenerateSW({
            skipWaiting: true,
            clientsClaim: true,
            ...runtimeCaching
          })
        : new GenerateSW(runtimeCaching)
    ]
  },

  // Turn off to make worker-loader work.
  parallel: false,
  chainWebpack: config => {
    config.module.rule("js").exclude.add(/\.worker\.js$/);

    config.module
      .rule("worker")
      .test(/\.worker\.js$/)
      .use("worker-loader")
      .loader("worker-loader")
      .end()
      .use("babel")
      .loader("babel-loader");
  }
};
