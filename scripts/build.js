const path = require('path');
const fs = require('fs');
const { merge } = require('webpack-merge');
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { makeFullDir, removeFullDir } = require('./util/file');
const config = require('./webpack.config');
const depsConfig = require('./deps');

const projectPath = path.join(__dirname, '..');
const distDir = path.join(projectPath, 'dist');
// if (fs.existsSync(distDir)) {
//   removeFullDir(distDir);
// }
// makeFullDir(distDir);

const htmlPath = path.join(projectPath, 'static', 'index.html');
const html = fs.readFileSync(htmlPath, { encoding: 'utf8' });
fs.writeFileSync(path.join(distDir, 'index.html'), html);

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