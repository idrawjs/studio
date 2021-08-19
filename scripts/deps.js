const fs = require('fs');
const path = require('path');
const { makeFullDir, removeFullDir } = require('./util/file');

const fileResolve = function (file) {
  return path.join(__dirname, '..', file);
};

const nodeDir = fileResolve('node_modules');
const distPath = fileResolve('dist');
removeFullDir(distPath)
makeFullDir(distPath)

const deps = [
  {
    file: {
      dev: 'react/umd/react.development.js',
      prod: 'react/umd/react.production.min.js'
    },
    target: 'lib/react.js',
  },
  {
    file: {
      dev: 'react-dom/umd/react-dom.development.js',
      prod: 'react-dom/umd/react-dom.production.min.js'
    },
    target: 'lib/react-dom.js',
  },
  {
    file: {
      dev: 'react-dom/umd/react-dom-server.browser.development.js',
      prod: 'react-dom/umd/react-dom-server.browser.production.min.js'
    },
    target: 'lib/react-dom-server.js',
  },
  {
    file: {
      dev: 'antd/dist/antd.js',
      prod: 'antd/dist/antd.min.js',
    },
    target: 'lib/antd.js',
  },
  {
    file: {
      dev: 'antd/dist/antd.css',
      prod: 'antd/dist/antd.min.css',
    },
    target: 'lib/antd.css',
  },
  // {
  //   file: {
  //     dev: 'idraw/dist/index.global.js',
  //     prod: 'idraw/dist/index.global.js',
  //   },
  //   target: 'lib/idraw.js',
  // },
]

function main() {
  // const mode = 'dev';
  const mode = 'prod';
  deps.forEach((mod) => {
    const textPath = path.join(nodeDir, mod.file[mode]);
    const targetPath = path.join(distPath, mod.target);
    let text = fs.readFileSync(textPath, { encoding: 'utf8' });
    text = [
      'var ENV = "production";',
      text.replace(/\# sourceMappingURL\=/, '')
    ].join('\r\n');
    makeFullDir(path.dirname(targetPath))
    fs.writeFileSync(path.join(targetPath), text);
  });
}

main();