#!/usr/bin/env node
const fs = require('fs');
const process = require('process');
const { program } = require('commander');
const packageJson = require('../package.json');
const scrapSite = require('./scrap-site');
const saveAsXlsx = require('./save-as-xlsx');
const publishGoogleSheets = require('./publish-google-sheets');
const { exec } = require('child_process');
const os = require('os');
const color = require('./color');

const fieldsCustom = {};

const list = val => {
  return val ? val.split(',') : [];
}


const collect = (value, previous) => {
  const res = value.match(/(.*?)=(.*)/);
  const name = res[1];
  const extractor = res[2];
  return previous.concat([{name, extractor}]);
}

const fieldsCustomCollect = (value, previous) => {
  const res = value.match(/(.*?)=(.*)/);
  const name = res[1];
  const extractor = res[2];

  fieldsCustom[name] = extractor;
  return fieldsCustom;
}

program
  .option('-u --urls <urls>', 'Comma separated url list for scan', list)
  .option('-p, --preset <preset>', 'Table preset (minimal, seo, headers, parse, lighthouse)', 'seo')
  .option('-e, --exclude <fields>', 'Comma separated fields to exclude from results', list)
  .option('-d, --max-depth <depth>', 'Max scan depth', 10)
  .option('-c, --concurrency <threads>', 'Threads number', 2)
  .option('--lighthouse', 'Do lighthouse')
  .option('--delay <ms>', 'Delay between requests', parseInt, 0)
  .option('-f, --fields <json>', 'Field in format --field \'title=$("title").text()\'', fieldsCustomCollect, [])
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
  .option('--web', `Publish sheet to google docs`)
  .option('--no-color', `No console colors`)
  .option('--open-file', `Open file after scan (default: yes on Windows and MacOS)`)
  .option('--no-open-file', `Don't open file after scan`)
  .option('--no-console-validate', `Don't output validate messages in console`)
  .name("site-audit-seo")
  .version(packageJson.version)
  .usage("-u https://example.com")
  .parse(process.argv);

async function start() {
  if(program.openFile === undefined) {
    program.openFile = ['darwin', 'win32'].includes(os.platform()); // only for win and mac
  }

  if(program.csv) {
    const csvPath = program.csv
    const xlsxPath = csvPath.replace(/\.csv$/, '.xlsx');
    try {
      saveAsXlsx(csvPath, xlsxPath);
      if (program.web) await publishGoogleSheets(xlsxPath);
      console.log(`${xlsxPath} saved`);
      if(program.openFile) exec(`"${xlsxPath}"`);
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

  if(program.delay > 0 && program.concurrency !== 1) {
    console.log('Force set concurrency to 1, must be 1 when delay is set');
    program.concurrency = 1;
  }

  if(program.docsExtensions === undefined) {
    program.docsExtensions = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf', 'rar', 'zip'];
  }

  if(program.preset === 'lighthouse') {
    program.lighthouse = true;
  }

  const brief = [
    {
      name: 'Preset',
      value: program.preset,
      comment: '--preset [minimal, seo, headers, parse, lighthouse]'
    },
    {
      name: 'Threads',
      value: program.concurrency,
      comment: '-c' +
          (program.concurrency > 1 && program.lighthouse ?
          `, ${color.yellow}recommended to set -c 1 when using lighthouse${color.reset}`
          : '')
    },
    {
      name: 'Delay',
      value: program.delay,
      comment: '--delay ms'
    },
    {
      name: 'Ignore robots.txt',
      value: (program.ignoreRobotsTxt ? 'yes' : 'no'),
      comment: (!program.ignoreRobotsTxt ? '--ignore-robots-txt' : '')
    },
    {
      name: 'Follow sitemap.xml',
      value: (program.followSitemapXml ? 'yes' : 'no'),
      comment: (!program.followSitemapXml ? '--follow-xml-sitemap' : '')
    },
    {
      name: 'Max depth',
      value: program.maxDepth,
      comment: '-d 8'
    },
    {
      name: 'Max requests',
      value: program.maxRequests ? program.maxRequests : 'unlimited',
      comment: '-m 123'
    },
    /*{
      name: 'Lighthouse',
      value: (program.lighthouse ? 'yes' : 'no'),
    },*/
    {
      name: 'Headless',
      value: (program.headless ? 'yes' : 'no'),
      comment: (program.headless ? '--no-headless' : '')
    },
    {
      name: 'Docs extensions',
      value: program.docsExtensions.join(','),
      comment: '--docs-extensions zip,rar'
    },
  ];

  console.log('');
  for (let line of brief) {
    const nameCol = line.name.padEnd(20, ' ');
    const valueCol = `${line.value}`.padEnd(10, ' ')
    console.log(color.white + nameCol + valueCol + color.reset
        + (line.comment ? ` ${line.comment}` : ''))
  }
  console.log('');

  for (let site of sites) {
    // console.log('program: ', program);
    await scrapSite(site, {
      fields_preset: program.preset,              // варианты: default, seo, headers, minimal
      fieldsExclude: program.exclude,             // исключить поля
      maxDepth: program.maxDepth,                 // глубина сканирования
      maxConcurrency: parseInt(program.concurrency), // параллельно открываемые вкладки
      lighthouse: program.lighthouse,             // сканировать через lighthouse
      delay: parseInt(program.delay),             // задержка между запросами
      skipStatic: program.skipStatic,             // не пропускать подгрузку браузером статики (картинки, css, js)
      followSitemapXml: program.followXmlSitemap, // чтобы найти больше страниц
      limitDomain: program.limitDomain,           // не пропускать подгрузку браузером статики (картинки, css, js)
      maxRequest: program.maxRequests,            // для тестов
      headless: program.headless,                 // на десктопе открывает браузер визуально
      docsExtensions: program.docsExtensions,     // расширения, которые будут добавлены в таблицу
      outDir: program.outDir,                     // папка, куда сохраняются csv
      color: program.color,                       // раскрашивать консоль
      openFile: program.openFile,                 // открыть файл после сканирования
      fields: program.fields,                     // дополнительные поля, --fields 'title=$("title").text()'
      removeCsv: program.removeCsv,               // удалять csv после генерации xlsx
      web: program.web,                           // публиковать на google docs
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
