const fs = require('fs');

let config = {};
const homedir = require('os').homedir();
const configPath = `${homedir}/.site-audit-seo.conf.js`;
if (fs.existsSync(configPath)) {
  config = require(configPath);
}

module.exports = config;