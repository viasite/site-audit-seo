#!/usr/bin/env node
const fs = require('fs');
const process = require('process');
const { program } = require('commander');
const packageJson = require('../package.json');
const scrap_site = require('./scrap-site');

const list = val => {
  return val ? val.split(',') : [];
}

program
  .option('-u --urls <urls>', 'Comma separated url list for scan', list)
  .option('-p, --preset <preset>', 'Table preset (minimal, seo, headers, parse)', 'seo')
  .option('-d, --max-depth <depth>', 'Max scan depth', 10)
  .option('-c, --concurrency <threads>', 'Threads number', 2)
  .option('-f, --fields <json>', 'JSON with custom fields', JSON.parse)
  .option('--no-skip-static', `Scan static files`)
  .option('--no-limit-domain', `Scan not only current domain`)
  .option('--docs-extensions', `Docs extensions (comma-separated) that will be add to table, default:doc,docx,xls,xlsx,pdf,rar,zip`, list)
  .option('--follow-xml-sitemap', `Follow sitemap.xml`)
  .option('--max-requests <num>', `Limit max pages scan`, 0)
  .option('--no-headless', `Show browser GUI while scan`)
  .option('--no-remove-csv', `No delete csv after xlsx generate`)
  .option('--out-dir <dir>', `Output directory`, '.')
  .option('--no-color', `No console colors`)
  .name("sites-scraper")
  .version(packageJson.version)
  .usage("-u https://example.com")
  .parse(process.argv);

async function start() {
  if(!program.urls) {
    console.log(`${program.name()} ${program.version()}`);
    console.log(`Usage: ${program.name()} ${program.usage()}`);
    process.exit(1);
  }

  const sites = program.urls;

  if(program.docsExtensions === undefined) {
    program.docsExtensions = ['doc', 'docx', 'xls', 'xlsx', 'pdf', 'rar', 'zip'];
  }

  for (site of sites) {
    // console.log('program: ', program);
    await scrap_site(site, {
      fields_preset: program.preset,              // варианты: default, seo, headers, minimal
      maxDepth: program.maxDepth,                 // глубина сканирования
      maxConcurrency: program.concurrency,        // параллельно открываемые вкладки
      skipStatic: program.skipStatic,             // не пропускать подгрузку браузером статики (картинки, css, js)
      followSitemapXml: program.followXmlSitemap, // чтобы найти больше страниц
      limitDomain: program.limitDomain,           // не пропускать подгрузку браузером статики (картинки, css, js)
      maxRequest: program.maxRequests,            // для тестов
      headless: program.headless,                 // на десктопе открывает браузер визуально
      docsExtensions: program.docsExtensions,     // расширения, которые будут добавлены в таблицу
      outDir: program.outDir,                     // папка, куда сохраняются csv
      color: program.color,                       // раскрашивать консоль
      fields: program.fields,                     // дополнительные поля
      removeCsv: program.removeCsv                // удалять csv после генерации xlsx
    });
  }
}

// not using, now only cli
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
