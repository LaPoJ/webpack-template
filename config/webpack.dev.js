const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(s[a|c]ss)/,
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "sass-loader",],
      },
    ]
  },
  devtool: 'none',
  devServer: {
    host: '127.0.0.1',
    port: '8081',
    public: 'http://login.g12e.com',
    disableHostCheck: true,
    open: true
  }
};