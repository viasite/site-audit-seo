const scrap_site = require('./scrap-site');

const sites = [
  'http://example.com/'
];

async function start() {
  for (site of sites) {
    await scrap_site(site, {
      fields_preset: 'seo',      // варианты: default, seo, headers, minimal
      maxConcurrency: 2,         // параллельно открываемые вкладки
      maxDepth: 10               // глубина сканирования
      // ,followSitemapXml: true // чтобы найти больше страниц
      // ,maxRequest: 10         // для тестов
      // ,headless: false        // на десктопе открывает браузер визуально
    });
  }
}

start();
