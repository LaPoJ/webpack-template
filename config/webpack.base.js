const path = require("path");
const { CleanWebpackPlugin, } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const HtmlWebpackPlugin = require('html-webpack-plugin');

const { buildEntry, buildEntryHtmlTemplate } = require('../plugins/webpackEntryPlugin.js');

module.exports = {
  // mode: "none",
  // entry: {
  //   index: path.resolve(__dirname, "../src/views/index.js"),
  // },

  entry: buildEntry(),

  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "./static/js/[name].js",
  },

  stats: {
    all: false,
    assets: true,
    builtAt: true,
    cached: true,
    cachedAssets: true,
    chunkOrigins: true,
    entrypoints: true,
    env: true,
    errorDetails: true,
    moduleTrace: true,
    performance: true,
    timings: true,
    providedExports: true,
    usedExports: true,
    warnings: true
  },

  module: {
    rules: [
      { // 打包js
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "eslint-loader",
            options: {
              fix: true,
              formatter: require("eslint-friendly-formatter"),
              emitError: true,
              emitWarning: true,
              failOnError: true,
              failOnWarning: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jepg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "./static/images",
              publicPath: "../images",
              limit: 8 * 1024,
            },
          },
        ],
      },

    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: "commons",
      minChunks: 2,
      minSize: 0,
    },
  },
  performance: {
    hints: "warning", // 枚举 false关闭
    maxEntrypointSize: 100000000, // 最大入口文件大小
    maxAssetSize: 100000000, // 最大资源文件大小
    assetFilter: function (assetFilename) { //只给出js文件的性能提示
      return assetFilename.endsWith(".js");
    },
  },

  resolve: {
    extensions: [".js", ".ejs", '.scss'],
    alias: {
      "@": path.resolve(__dirname, "../src"),
      "@utils": path.resolve(__dirname, "../src/utils"),
      "@assets": path.resolve(__dirname, "../src/assets"),
      "@api": path.resolve(__dirname, "../src/api"),
      "@views": path.resolve(__dirname, "../src/views"),
    },

  },
  plugins: [
    new CleanWebpackPlugin(),
    // new HtmlWebpackPlugin({
    //   title: 'ejs打包模板',
    //   template: path.resolve(__dirname, "../src/views/index.ejs"),
    //   filename: 'index.html',
    //   inject: true,
    //   minify: true,
    // }),
    ...buildEntryHtmlTemplate(),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].css',
      chunkFilename: 'static/css/common.css'
    })
  ],
};
