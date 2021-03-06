const base = require('./webpack.base.js');
const { merge } = require('webpack-merge');
let config;
if (process.env.NODE_ENV === 'production') {
	config = require('./webpack.prod.js');
} else {
	config = require('./webpack.dev.js');
}

module.exports = merge(base, config);