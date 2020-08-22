#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const process = require('process');
const {program} = require('commander');
const packageJson = require('../package.json');
const systemLocale = getDefaultLocale(); // should be before scrap-site (before lighthouse require)
const scrapSite = require('./scrap-site');
const {saveAsXlsx, saveAsJson, uploadJson, publishGoogleDrive, startViewer} = require(
  './actions');
const {exec} = require('child_process');
const os = require('os');
const expandHomedir = require('expand-home-dir');
const color = require('./color');

const defaultDocs = [
  'doc',
  'docx',
  'xls',
  'xlsx',
  'ppt',
  'pptx',
  'pdf',
  'rar',
  'zip'];

const fieldsCustom = {};

const list = val => {
  return val ? val.split(',') : [];
};

const collect = (value, previous) => {
  const res = value.match(/(.*?)=(.*)/);
  const name = res[1];
  const extractor = res[2];
  return previous.concat([{name, extractor}]);
};

const fieldsCustomCollect = (value, previous) => {
  const res = value.match(/(.*?)=(.*)/);
  const name = res[1];
  const extractor = res[2];

  fieldsCustom[name] = extractor;
  return fieldsCustom;
};

let config = {};
const homedir = require('os').homedir();
const configPath = `${homedir}/.site-audit-seo.conf.js`;
if (fs.existsSync(configPath)) {
  config = require(configPath);
}

function getConfigVal(name, def) {
  let val = undefined;
  if (config[name] === undefined) val = def;
  else val = config[name];
  // console.log(`config: ${name}: `, val);
  return val;
}

program.option('-u --urls <urls>', 'Comma separated url list for scan', list).
  option('-p, --preset <preset>',
    'Table preset (minimal, seo, headers, parse, lighthouse, lighthouse-all)',
    getConfigVal('preset', 'seo')).
  option('-e, --exclude <fields>',
    'Comma separated fields to exclude from results', list).
  option('-d, --max-depth <depth>', 'Max scan depth',
    getConfigVal('maxDepth', 10)).
  option('-c, --concurrency <threads>',
    'Threads number (default: by cpu cores)').
  option('--lighthouse', 'Appends base Lighthouse fields to preset').
  option('--delay <ms>', 'Delay between requests', parseInt, 0).
  option('-f, --fields <json>',
    'Field in format --field \'title=$("title").text()\'', fieldsCustomCollect,
    []).
  option('--no-skip-static', `Scan static files`).
  option('--no-limit-domain', `Scan not only current domain`).
  option('--docs-extensions',
    `Comma-separated extensions that will be add to table (default: ${defaultDocs.join(
      ',')})`, list).
  option('--follow-xml-sitemap', `Follow sitemap.xml`,
    getConfigVal('followXmlSitemap', false)).
  option('--ignore-robots-txt', `Ignore disallowed in robots.txt`,
    getConfigVal('ignoreRobotsTxt', false)).
  option('-m, --max-requests <num>', `Limit max pages scan`,
    getConfigVal('maxRequests', 0)).
  option('--no-headless', `Show browser GUI while scan`,
    !getConfigVal('headless', true)).
  option('--remove-csv', `No delete csv after xlsx generate`,
    getConfigVal('removeCsv', true)).
  option('--remove-json', `No delete json after serve`,
    getConfigVal('removeJson', true)).
  option('--no-remove-csv', `No delete csv after xlsx generate`).
  option('--no-remove-json', `No delete json after serve`).
  option('--out-dir <dir>', `Output directory`,
    getConfigVal('outDir', '~/site-audit-seo/')).
  option('--csv <path>', `Skip scan, only convert csv to xlsx`).
  option('--xlsx', `Save as XLSX`, getConfigVal('xlsx', false)).
  option('--gdrive', `Publish sheet to google docs`,
    getConfigVal('gdrive', false)).
  option('--json', `Save as JSON`, getConfigVal('json', true)).
  option('--no-json', `No save as JSON`, !getConfigVal('json', true)).
  option('--upload', `Upload JSON to public web`,
    getConfigVal('upload', false)).
  option('--no-color', `No console colors`).
  option('--lang <lang>', `Language (en, ru, default: system language)`,
    getConfigVal('lang', undefined)).
  option('--open-file',
    `Open file after scan (default: yes on Windows and MacOS)`,
    getConfigVal('openFile', undefined)).
  option('--no-open-file', `Don't open file after scan`).
  option('--no-console-validate', `Don't output validate messages in console`).
  name('site-audit-seo').
  version(packageJson.version).
  usage('-u https://example.com').
  parse(process.argv);

async function start() {
  if (program.openFile === undefined) {
    program.openFile = ['darwin', 'win32'].includes(os.platform()); // only for win and mac
  }

  // lang
  if (!['en', 'ru'].includes(program.lang)) program.lang = systemLocale;

  // no open file when no xlsx generate
  if (!program.xlsx) program.openFile = false;

  // --json when --upload
  if (program.upload) program.json = true;

  // no remove json when --no-json
  if (!program.json) program.removeJson = false;

  /*console.log('json: ', program.json)
  console.log('removeJson: ', program.removeJson)
  console.log('concurrency: ', program.concurrency)
  console.log('lang: ', program.lang)
  console.log('outDir: ', program.outDir)
  console.log('openFile: ', program.openFile)
  console.log('xlsx: ', program.xlsx)*/

  if (program.csv) {
    program.removeCsv = false;
    const csvPath = expandHomedir(program.csv);
    const xlsxPath = path.normalize(csvPath.replace(/\.csv$/, '.xlsx'));
    let jsonPath = path.normalize(csvPath.replace(/\.csv$/, '.json'));
    let webPath;
    try {
      if (program.xlsx) {
        saveAsXlsx(csvPath, xlsxPath);
        if (program.gdrive) await publishGoogleDrive(xlsxPath);
        if (program.openFile) exec(`"${xlsxPath}"`);
      }

      if (program.json) {
        await saveAsJson(csvPath, jsonPath, program.lang);
        if (!program.removeJson) console.log('Saved to ' + jsonPath);
        if (program.upload) webPath = await uploadJson(jsonPath, program);
        // if (program.gdrive) webPath = await publishGoogleDrive(jsonPath);

        await startViewer(jsonPath, webPath);
        if (program.removeJson) fs.unlinkSync(jsonPath);
      }

      if (program.removeCsv) fs.unlinkSync(csvPath);
    } catch (e) {
      console.error(e);
    }
    return;
  }

  if (!program.urls) {
    console.log(`${program.name()} ${program.version()}`);
    console.log(`Usage: ${program.name()} ${program.usage()}`);
    process.exit(1);
  }

  const sites = program.urls;

  if (program.delay > 0 && program.concurrency !== 1) {
    console.log('Force set concurrency to 1, must be 1 when delay is set');
    program.concurrency = 1;
  }

  if (program.docsExtensions === undefined) {
    program.docsExtensions = getConfigVal('docsExtensions', defaultDocs);
  }

  if (program.preset === 'lighthouse' || program.preset === 'lighthouse-all') {
    program.lighthouse = true;
  }

  // c = 2, when lighthouse c = 1
  if (program.concurrency === undefined) {
    program.concurrency = program.lighthouse ? 1 : getConfigVal('concurrency',
      os.cpus().length);
  }

  program.outDir = expandHomedir(program.outDir);
  createDirIfNotExists(program.outDir);

  outBrief(program);

  for (let site of sites) {
    // console.log('program: ', program);
    await scrapSite(site, {
      fieldsPreset: program.preset,              // варианты: default, seo, headers, minimal
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
      lang: program.lang,                         // язык
      openFile: program.openFile,                 // открыть файл после сканирования
      fields: program.fields,                     // дополнительные поля, --fields 'title=$("title").text()'
      removeCsv: program.removeCsv,               // удалять csv после генерации xlsx
      removeJson: program.removeJson,             // удалять json после поднятия сервера
      xlsx: program.xlsx,                         // сохранять в XLSX
      gdrive: program.gdrive,                     // публиковать на google docs
      json: program.json,                         // сохранять json файл
      upload: program.upload,                     // выгружать json на сервер
      consoleValidate: program.consoleValidate,   // выводить данные валидации в консоль
      obeyRobotsTxt: !program.ignoreRobotsTxt,    // не учитывать блокировки в robots.txt
    });
  }
}

function outBrief(options) {
  const brief = [
    {
      name: 'Preset',
      value: options.preset,
      comment: '--preset [minimal, seo, headers, parse, lighthouse, lighthouse-all]',
    },
    {
      name: 'Threads',
      value: options.concurrency,
      comment: '-c threads' +
        (options.concurrency > 1 && options.lighthouse ?
          `, ${color.yellow}recommended to set -c 1 when using lighthouse${color.reset}`
          : ''),
    },
    {
      name: 'Delay',
      value: options.delay,
      comment: '--delay ms',
    },
    {
      name: 'Ignore robots.txt',
      value: (options.ignoreRobotsTxt ? 'yes' : 'no'),
      comment: (!options.ignoreRobotsTxt ? '--ignore-robots-txt' : ''),
    },
    {
      name: 'Follow sitemap.xml',
      value: (options.followSitemapXml ? 'yes' : 'no'),
      comment: (!options.followSitemapXml ? '--follow-xml-sitemap' : ''),
    },
    {
      name: 'Max depth',
      value: options.maxDepth,
      comment: '-d 8',
    },
    {
      name: 'Max requests',
      value: options.maxRequests ? options.maxRequests : 'unlimited',
      comment: '-m 123',
    },
    /*{
      name: 'Lighthouse',
      value: (options.lighthouse ? 'yes' : 'no'),
    },*/
    {
      name: 'Headless',
      value: (options.headless ? 'yes' : 'no'),
      comment: (options.headless ? '--no-headless' : ''),
    },
    {
      name: 'Save as XLSX',
      value: (options.xlsx ? 'yes' : 'no'),
      comment: (!options.xlsx ? '--xlsx' : ''),
    },
    {
      name: 'Save as JSON',
      value: (options.json ? 'yes' : 'no'),
      comment: (options.json ? '--no-json' : ''),
    },
    {
      name: 'Upload JSON',
      value: (options.upload ? 'yes' : 'no'),
      comment: (!options.upload ? '--upload' : ''),
    },
    {
      name: 'Language',
      value: options.lang,
      comment: '--lang ' + (options.lang == 'ru' ? 'en' : 'ru'),
    },
    {
      name: 'Docs extensions',
      value: options.docsExtensions.join(','),
      comment: '--docs-extensions zip,rar',
    },
  ];

  console.log('');
  for (let line of brief) {
    const nameCol = line.name.padEnd(20, ' ');
    const valueCol = `${line.value}`.padEnd(10, ' ');
    console.log(color.white + nameCol + valueCol + color.reset
      + (line.comment ? ` ${line.comment}` : ''));
  }
  console.log('');
}

// only ru and en, default en
function getDefaultLocale() {
  const locale = new Intl.DateTimeFormat().resolvedOptions().locale;
  // console.log('locale:', new Intl.DateTimeFormat().resolvedOptions())
  const map = {
    'en-US': 'en',
    'ru-RU': 'ru',
    'en': 'en',
    'ru': 'ru',
  };

  return map[locale] || 'en';
}

function createDirIfNotExists(path) {
  const exists = fs.existsSync(path);
  if (exists && fs.statSync(path).isFile()) {
    throw new Error(`File exists, cannot save here: ${path}`);
    return false;
  }

  if (!exists) fs.mkdirSync(path, {recursive: true});

  return path;
}

start();
