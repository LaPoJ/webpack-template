const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isMultiPage = function () {
  // fs.readFile()
  fs.stat(path.resolve(__dirname, '../src/index.js'), (err, stat) => {
    if (err) throw err;
    if (stat && stat.isFile()) {
      // 单页面打包
      return false;

    } else {
      // 多页面打包
      return true;
    }
  });
};

const getEntryList = function(){
  buildMultiPage();
};

const getEntryUrl = function () {
  const isMultiPageResult = isMultiPage();
  if (isMultiPageResult) {
    getEntryList();
  } else {
    buildSinglePage();
  }
};

/**
 * 多页面打包实例
 * @param {Object Array} entryList 
 */
const buildMultiPage = function (entryList) {
  console.log(entryList);
};

const buildSinglePage = function () {

};

exports.buildEntry = function(){
  getEntryUrl();
};