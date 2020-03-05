const scrap_site = require('./scrap-site');

const sites = [
  'http://example.com/'
];

(async () => {
  for(site of sites){
    await scrap_site(site, {
      fields_preset: 'seo',   // варианты: default, seo, headers, minimal
      maxConcurrency: 2,      // параллельно открываемые вкладки
      maxDepth: 10,           // глубина сканирования
      followSitemapXml: false // берёт адреса из /sitemap.xml
    });
  }
})();