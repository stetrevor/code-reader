const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = {
  publicPath: process.env.NODE_ENV === "development" ? "/code-reader/" : "",

  configureWebpack: {
    plugins: [new GenerateSW()]
  }
};
