import fs from 'fs';
import { homedir } from 'os';
let config = {};

const envVars = {
  maxConcurrency: process.env.MAX_CONCURRENCY ? parseInt(process.env.MAX_CONCURRENCY) : 0,
  featureScreenshot: !!process.env.FEATURE_SCREENSHOT,
  onlyDomains: process.env.ONLY_DOMAINS? `${process.env.ONLY_DOMAINS}`.split(',').map(d => d.trim()) : false,
}
config = {...envVars, ...config};

const configsPath = [
  `${homedir()}/.site-audit-seo.conf.js`, // ~/.site-audit-seo.conf.js
  `${process.cwd()}/config.js`,           // ./config.js
];

for (const configPath of configsPath) {
  if (fs.existsSync(configPath)) {
    try {
      console.log("load config:", configPath);
      const fileData = await import(configPath);
      // console.log("fileData:", fileData);
      if (fileData) config = {...config, ...fileData.default};
      // console.log("config:", config);
    } catch (e) {
      console.log(`failed to load ${configPath}`);
      console.error(e);
    }
  }
}

export default config;
