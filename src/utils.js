import fs from 'fs';
import path from 'path';
import sanitize from 'sanitize-filename';

const defaultLocalDir = 'data/reports/';

export const getJsonName = (jsonPath, short = false, timestamp) => {
  const offset = new Date().getTimezoneOffset() * 60000;
  const ts = timestamp || Date.now();
  const dateLocal = new Date(ts - offset);
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

export const initDataDir = (dataDir) => {
  const packageJson = path.join(dataDir, 'package.json');
  if (!fs.existsSync(packageJson)) {
    console.log(`Create empty package.json in ${dataDir}`);
    fs.copyFileSync('./package-data.json', packageJson);
  }
}

export const getUserDir = (uid = '', localDir = defaultLocalDir) => {
  // user subdir if uid
  if (uid) {
    const userDir = sanitize(uid.slice(0, 5));
    localDir += userDir;
    if (!fs.existsSync(localDir)) fs.mkdirSync(localDir);
  }

  return localDir;
}

export default {
  getJsonName,
  initDataDir,
  getUserDir,
}
