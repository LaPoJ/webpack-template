const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
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
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        test: /\.(js)$/,
        uglifyOptions: {
          output: { comments: false },
          compress: {
            drop_console: true,
            drop_debugger: false,
            pure_funcs: ['console.log'] //移除console
          }
        }
      }),
    ],
  }
};