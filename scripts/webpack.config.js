const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { createWebpackConfig, createWebpackNodeConfig } = require('./common');

const fileResolve = function (file) {
  return path.join(__dirname, '..', file);
};

module.exports = [
  createWebpackConfig({
    entry: {
      'index' : fileResolve('src/index.tsx'),
    },
    output: {
      path: fileResolve(''),
      filename: 'dist/[name].js',
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'dist/[name].css'
      }),
    ],
  }),
]

