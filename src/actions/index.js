// actions runs after scan

var normalizedPath = require('path').join(__dirname, '.');

require('fs').readdirSync(normalizedPath).forEach(function(file) {
  const moduleName = file.split('.')[0];
  if (file !== 'index.js') exports[moduleName] = require('./' + file);
});
