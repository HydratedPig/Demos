const path = require('path');
const loaderPath = require.resolve('./loader.js');
console.log(loaderPath)

module.exports = {
  entry: './index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      { test: /\.svg$/, use: loaderPath }
    ]
  }
};