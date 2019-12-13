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
  }
};
