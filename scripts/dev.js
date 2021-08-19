const path = require('path');
const fs = require('fs');
const { merge } = require('webpack-merge');
const config = require('./webpack.config');
const { makeFullDir, removeFullDir } = require('./util/file');
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

    let devServer = {};
    if (i === 0) {
      devServer = {
        contentBase: projectPath,
        compress: true,
        port: 9000,
      }
    }
    return merge(conf, {
      mode: 'development',
      devtool: 'inline-cheap-source-map',
      devServer,
    })
  })
]