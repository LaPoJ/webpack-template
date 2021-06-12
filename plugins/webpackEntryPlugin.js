const path = require('path');
const fs = require('fs');
const Looger = require('./terminalLog');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { throws } = require('assert');

const isMultiPage = function () {
  return !fs.existsSync(path.resolve(__dirname, '../src/index.js'));
};

const getEntryArray = function () {
  const entryPath = path.resolve(__dirname, '../src/views');
  const entryDirs = fs.readdirSync(entryPath, { withFileTypes: true });
  if (entryDirs.length === 0) {
    Looger.error('多页面打包失败');
    throw console.error('Unable to find the package entry file');
  } else {
    const filterDir = entryDirs.filter(item =>  item.isDirectory());
    if (filterDir.length > 0) {
      const dirName = filterDir.map(item => item.name);
      return dirName;
    } else {
      Looger.error('页面不存在，请确认文件是否存在');
      return false;
    }
  }
};

const buildMultiPage = function () {
  const getEntryArrayLists = getEntryArray();
  let entryExample;
  let entryHtmlLists = [];

  if (getEntryArrayLists) {
    getEntryArrayLists.forEach(item => {
      const hasTemplate = fs.existsSync( path.resolve(__dirname , '../src/views' + '\\' + item + '\\index.ejs'));
      if (hasTemplate) {
        entryExample = new HtmlWebpackPlugin({
          title: item,
          filename: item.toLowerCase() + '.html',
          template: path.resolve(__dirname , '../src/views' + '\\' + item + '\\index.ejs'),
        });
      } else {
        const str = `Can not found module: src/views/${item}/index.ejs`;
        Looger.error(str);
        throw Error('Can not found module:');
      }
      entryHtmlLists.push(entryExample);
      entryExample = {};
      return entryHtmlLists;
    });
  } else {
    Looger.error('多页面打包失败，确保多页面存在================');
  }
  return entryHtmlLists;
};

const buildSinglePage = function () {

};

// 判断是单页面还是多页面
const getEntryHtmlTempList = function () {
  if (isMultiPage()) {
    return buildMultiPage();
  } else {
    return buildSinglePage();
  }
};

module.exports.buildEntry = function() {
  const entryLists = getEntryArray();
  let buildEntryLists = {};
  entryLists.forEach(item => {
    buildEntryLists[item] = path.resolve(__dirname, '../src/views/' + item + '/index.js');
  });

  for (const entryItem in buildEntryLists) {
    if (!fs.existsSync(path.resolve(__dirname, buildEntryLists[entryItem]))) {

      Looger.error('Can not found module: ' + buildEntryLists[entryItem]);
      // delete buildEntryLists[entryItem];
      throw Error('Can not find module: ' + buildEntryLists[entryItem]);
    }
  }
  return buildEntryLists;
};

module.exports.buildEntryHtmlTemplate = function () {
  return getEntryHtmlTempList();
};