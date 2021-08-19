const path = require('path');
const fs = require('fs');
const { merge } = require('webpack-merge');
const config = require('./webpack.config');
const { makeFullDir, removeFullDir } = require('./util/file');

const projectPath = path.join(__dirname, '..');
const distDir = path.join(projectPath, 'dist');


function createIndexPage() {
  const hash = Math.random().toString(16).substr(2) + Math.random().toString(16).substr(2);
  const htmlPath = path.join(projectPath, 'static', 'index.html');
  let html = fs.readFileSync(htmlPath, { encoding: 'utf8' });
  html = html.replace(/v\=\$\{hash\}/ig, `v=${hash}`);
  fs.writeFileSync(path.join(distDir, 'index.html'), html);
}

module.exports = {
  createIndexPage,
}