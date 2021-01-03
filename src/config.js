const fs = require('fs');

let config = {};
const homedir = require('os').homedir();
const configPath = `${homedir}/.site-audit-seo.conf.js`;
console.log('homedir:', homedir);
console.log('configPath:', configPath);
if (fs.existsSync(configPath)) {
  config = require(configPath);
}

module.exports = config;