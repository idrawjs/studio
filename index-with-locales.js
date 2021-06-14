const studio = require('./src');

const req = require.context('./src/', true, /^\.\/locale\/.+_.+\.tsx$/);

antd.locales = {};

req.keys().forEach(mod => {
  const matches = mod.match(/\/([^/]+).tsx$/);
  antd.locales[matches[1]] = req(mod).default;
});

module.exports = studio;