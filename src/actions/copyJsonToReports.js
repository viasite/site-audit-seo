import fs from 'fs';
import { getJsonName, getUserDir } from '../utils.js';

const defaultLocalDir = 'data/reports/';

export default (jsonPath, uid = '', localDir = defaultLocalDir, timestamp, overwrite = true) => {
  const userDir = getUserDir(uid, localDir);

  // remove microseconds if available
  const jsonNameLong = getJsonName(jsonPath, false, timestamp);
  const jsonNameShort = getJsonName(jsonPath, true, timestamp);
  // TODO2: overwrite always true, may overwrite needed report, forgot why it was added
  const jsonName = fs.existsSync(userDir + '/' + jsonNameShort) && !overwrite ? jsonNameLong : jsonNameShort;

  // copy json file
  const localPath = userDir + '/' + jsonName;
  fs.copyFileSync(jsonPath, localPath);

  return { jsonName, localPath };
};
