import fs from 'fs';
import { homedir } from 'os';
let config = {};
const configPath = `${homedir()}/.site-audit-seo.conf.js`;
if (fs.existsSync(configPath)) {
  const fileData = await import(configPath);
  if (fileData) config = fileData.default;
  // console.log("config:", config);
}
config = {...config, ...{
  maxConcurrency: process.env.MAX_CONCURRENCY || 0,
}}
export default config;
