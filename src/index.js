const scrap_site = require('./scrap-site');

const sites = [
  'http://example.com/'
];

(async () => {
  for(site of sites){
    await scrap_site(site);
  }
})();