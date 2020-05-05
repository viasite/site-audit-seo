#!/usr/bin/env node
const fs = require('fs');
const process = require('process');
const { program } = require('commander');
const packageJson = require('../package.json');
const scrapSite = require('./scrap-site');
const saveAsXlsx = require('./save-as-xlsx');

const list = val => {
  return val ? val.split(',') : [];
}

program
  .option('-u --urls <urls>', 'Comma separated url list for scan', list)
  .option('-p, --preset <preset>', 'Table preset (minimal, seo, headers, parse)', 'seo')
  .option('-d, --max-depth <depth>', 'Max scan depth', 10)
  .option('-c, --concurrency <threads>', 'Threads number', 2)
  .option('--delay <ms>', 'Delay between requests', 0)
  .option('-f, --fields <json>', 'JSON with custom fields', JSON.parse)
  .option('--no-skip-static', `Scan static files`)
  .option('--no-limit-domain', `Scan not only current domain`)
  .option('--docs-extensions', `Comma-separated extensions that will be add to table, default:doc,docx,xls,xlsx,ppt,pptx,pdf,rar,zip`, list)
  .option('--follow-xml-sitemap', `Follow sitemap.xml`)
  .option('--ignore-robots-txt', `Ignore disallowed in robots.txt`)
  .option('-m, --max-requests <num>', `Limit max pages scan`, 0)
  .option('--no-headless', `Show browser GUI while scan`)
  .option('--no-remove-csv', `No delete csv after xlsx generate`)
  .option('--out-dir <dir>', `Output directory`, '.')
  .option('--csv <path>', `Skip scan, only convert csv to xlsx`)
  .option('--no-color', `No console colors`)
  .option('--no-console-validate', `Don't output validate messages in console`)
  .name("site-audit")
  .version(packageJson.version)
  .usage("-u https://example.com")
  .parse(process.argv);

async function start() {
  if(program.csv) {
    const csvPath = program.csv
    const xlsxPath = csvPath.replace(/\.csv$/, '.xlsx');
    try {
      saveAsXlsx(csvPath, xlsxPath);
      console.log(`${xlsxPath} saved`)
    } catch(e) {
      console.error(e)
    }
    return;
  }

  if(!program.urls) {
    console.log(`${program.name()} ${program.version()}`);
    console.log(`Usage: ${program.name()} ${program.usage()}`);
    process.exit(1);
  }

  const sites = program.urls;

  if(program.delay > 0 && program.concurrency != 1) {
    console.log('Force set concurrency to 1, must be 1 when delay is set');
    program.concurrency = 1;
  }

  if(program.docsExtensions === undefined) {
    program.docsExtensions = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'rar', 'zip'];
  }

  for (site of sites) {
    // console.log('program: ', program);
    await scrapSite(site, {
      fields_preset: program.preset,              // варианты: default, seo, headers, minimal
      maxDepth: program.maxDepth,                 // глубина сканирования
      maxConcurrency: parseInt(program.concurrency), // параллельно открываемые вкладки
      delay: parseInt(program.delay),             // задержка между запросами
      skipStatic: program.skipStatic,             // не пропускать подгрузку браузером статики (картинки, css, js)
      followSitemapXml: program.followXmlSitemap, // чтобы найти больше страниц
      limitDomain: program.limitDomain,           // не пропускать подгрузку браузером статики (картинки, css, js)
      maxRequest: program.maxRequests,            // для тестов
      headless: program.headless,                 // на десктопе открывает браузер визуально
      docsExtensions: program.docsExtensions,     // расширения, которые будут добавлены в таблицу
      outDir: program.outDir,                     // папка, куда сохраняются csv
      color: program.color,                       // раскрашивать консоль
      fields: program.fields,                     // дополнительные поля
      removeCsv: program.removeCsv,               // удалять csv после генерации xlsx
      consoleValidate: program.consoleValidate,   // выводить данные валидации в консоль
      obeyRobotsTxt: !program.ignoreRobotsTxt,    // не учитывать блокировки в robots.txt
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
