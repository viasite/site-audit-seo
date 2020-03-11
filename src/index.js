const fs = require('fs');
const scrap_site = require('./scrap-site');

async function start() {
  const sites = parseSitesFile('./data/sites.conf');

  for (site of sites) {
    await scrap_site(site, {
      fields_preset: 'seo',      // варианты: default, seo, headers, minimal
      maxConcurrency: 2,         // параллельно открываемые вкладки
      maxDepth: 10               // глубина сканирования
      // ,skip_static: false     // не пропускать подгрузку браузером статики (картинки, css, js)
      // ,followSitemapXml: true // чтобы найти больше страниц
      // ,maxRequest: 10         // для тестов
      // ,headless: false        // на десктопе открывает браузер визуально
    });
  }
}

function parseSitesFile(file){
  const urlRegex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&#\/%=~_|$?!:,.]*\)|[A-Z0-9+&#\/%=~_|$])/ig

  if(!fs.existsSync(file)){
    console.error(`${file} not found, please create sites list file!`);
    return [];
  }

  let urls = [];
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  lines.forEach ((line, ind) => {
    if (line.match(/^\s*[#\/;]+/)) return; // commented line
    let url = line.match(urlRegex);
    if (!url || url[0].endsWith('.png') || url[0].endsWith('.jpg') || url[0].endsWith('.js') || url[0].endsWith('.css')) return;
    urls.push(url[0]);
  });
  return urls;
}

start();
