import path from 'path';
import fs from 'fs';

export {default as copyJsonToReports} from './copyJsonToReports.js';
export {default as saveAsJson} from './saveAsJson.js';
export {default as startViewer} from './startViewer.js';
export {default as uploadJson} from './uploadJson.js';

/*const normalizedPath = path.join(import.meta.url, '.');
console.log("normalizedPath:", normalizedPath);
const modules = {};
fs.readdirSync(normalizedPath).forEach(function(file) {
  const moduleName = file.split('.')[0];
  console.log("moduleName:", moduleName);
  if (file !== 'index.js') import(`./${file}`).then(module => {
    modules[moduleName] = module.default;
  });
});

console.log("modules:", modules);
export default modules;*/
