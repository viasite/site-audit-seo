const fs = require('fs');
const path = require('path');

exports.getJsonName = (jsonPath, short = false) => {
  const offset = new Date().getTimezoneOffset() * 60000;
  const dateLocal = new Date(Date.now() - offset)
  let date = dateLocal.toISOString().
    replace(/:/g, '-').
    replace('T', '__').
    replace('Z', '');
  if (short) date = date.replace(/\.\d+/, '');
  // const dateStr = date.slice(0,10);
  const name = path.basename(jsonPath).replace(/[^0-9a-zа-я_.-]/ig, '');
  const uploadName = date + '__' + name;
  return uploadName;
}

exports.initDataDir = (dataDir) => {
  const packageJson = path.join(dataDir, 'package.json');
  if (!fs.existsSync(packageJson)) {
    console.log(`Create empty package.json in ${dataDir}`);
    fs.copyFileSync('./package-data.json', packageJson);
  }
}