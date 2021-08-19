const path = require('path');
const fs = require('fs');
const { merge } = require('webpack-merge');
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { makeFullDir, removeFullDir } = require('./util/file');
const config = require('./webpack.config');
const depsConfig = require('./deps');
const { createIndexPage } = require('./html');

const projectPath = path.join(__dirname, '..');
const distDir = path.join(projectPath, 'dist');
// if (fs.existsSync(distDir)) {
//   removeFullDir(distDir);
// }
// makeFullDir(distDir);

createIndexPage();

module.exports = [
  ...config.map((conf, i) => {
    return merge(conf, {
      mode: 'production',
      plugins: [],
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin(),
          new CssMinimizerPlugin(),
        ],
      },
    })
  })
]