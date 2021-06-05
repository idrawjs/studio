const studio = require('./src/components');

const req = require.context('./src/components', true, /^\.\/locale\/.+_.+\.tsx$/);

antd.locales = {};

req.keys().forEach(mod => {
  const matches = mod.match(/\/([^/]+).tsx$/);
  antd.locales[matches[1]] = req(mod).default;
});

module.exports = studio;