const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = {
  publicPath: process.env.NODE_ENV === "development" ? "/code-reader/" : "",

  configureWebpack: {
    plugins: [
      process.env.NODE_ENV === "development"
        ? new GenerateSW({
            skipWaiting: true,
            clientsClaim: true
          })
        : new GenerateSW()
    ]
  },

  chainWebpack: config => {
    config.module
      .rule("worker")
      .test(/\.worker\.js$/)
      .use("worker-loader")
      .loader("worker-loader")
      .end()
      .use("babel")
      .loader("babel-loader")
      .end();
  }
};
