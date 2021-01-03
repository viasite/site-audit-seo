const fs = require('fs');
const path = require('path');
const systemLocale = getDefaultLocale(); // should be before scrap-site (before lighthouse require)
const {program} = require('commander');
const packageJson = require('../package.json');
const config = require('./config');
const color = require('./color');
const os = require('os');
const expandHomedir = require('expand-home-dir');

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

/* const collect = (value, previous) => {
  const res = value.match(/(.*?)=(.*)/);
  const name = res[1];
  const extractor = res[2];
  return previous.concat([{name, extractor}]);
}; */

const fieldsCustomCollect = (value, previous) => {
  const res = value.match(/(.*?)=(.*)/);
  const name = res[1];
  const extractor = res[2];

  fieldsCustom[name] = extractor;
  return fieldsCustom;
};

function getConfigVal(name, def) {
  let val = undefined;
  // objects like 'influxdb.maxSendCount'
  if (name.includes('.')) {
    const parts = name.split('.');
    let conf = config;
    for (let part of parts) {
      conf = conf[part];
      if (conf === undefined) {
        conf = def;
        break;
      }
    }

    if (typeof conf === 'object') val = def;
    else val = conf;
  }

  else if (config[name] === undefined) val = def;
  else val = config[name];
  console.log(`config: ${name}: `, val);
  return val;
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



program.postParse = async () => {
  if (program.openFile === undefined) {
    program.openFile = ['darwin', 'win32'].includes(os.platform()); // only for win and mac
  }

  // lang
  if (!['en', 'fr', 'ru'].includes(program.lang)) program.lang = systemLocale;

  // no open file when no xlsx generate
  if (!program.xlsx) program.openFile = false;

  // --json when --upload
  if (program.upload) program.json = true;

  // no remove json when --no-json
  if (!program.json) program.removeJson = false;

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
    program.concurrency = getConfigVal('concurrency', os.cpus().length);
  }
  if (program.lighthouse) {
    program.concurrency = 1;
  }

  if (program.concurrency > os.cpus().length) {
    program.concurrency = os.cpus().length;
  }

  if (program.urls) {
    if (program.urls.length > 1) program.urlList = true;
  }
  else program.urls = [];

  if (program.urlList) {
    program.maxDepth = 1;
    program.limitDomain = false;
    program.ignoreRobotsTxt = true;
    // program.defaultFilter = 'depth>1';
  }

  console.log("program.yake", program.yake);
  console.log("program.languageDetection", program.languageDetection);
  console.log("program.htmlGrabbr", program.htmlGrabbr);
  console.log("program.readingTime", program.readingTime);
  console.log("program.influxdb", program.influxdb);

  // influxdb config fron ~/.site-audit-seo.conf.js
  // program.influxdb = getConfigVal('influxdb', false);
  if (program.influxdb && program.influxdbMaxSend) {
    program.influxdb.maxSendCount = program.influxdbMaxSend;
  }
  if (program.influxdb && program.influxdbDatabase) {
    program.influxdb.database = program.influxdbDatabase;
  }
  if (program.influxdb && program.influxdbMeasurement) {
     program.influxdb.measurement = program.influxdbMeasurement;
  }

  // program.slack = getConfigVal('slack', false);
  if (program.slack && program.slack.token && program.slack.conversationId) {
    program.slack.token = program.slackToken;
    program.slack.conversationId = program.slackConversationId;
  }
  if (program.slack && program.slack.slackSigninSeccret) {
    program.slack.signinSeccret = program.slackSigninSeccret;
  }

  program.outDir = expandHomedir(program.outDir);
  createDirIfNotExists(program.outDir);
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
  option('--default-filter <defaultFilter>', 'Default filter when JSON viewed, example: depth>1').
  option('--no-skip-static', `Scan static files`).
  option('--no-limit-domain', `Scan not only current domain`).
  option('--docs-extensions',
    `Comma-separated extensions that will be add to table (default: ${defaultDocs.join(
      ',')})`, list).
  option('--follow-xml-sitemap', `Follow sitemap.xml`,
    getConfigVal('followXmlSitemap', false)).
  option('--ignore-robots-txt', `Ignore disallowed in robots.txt`,
    getConfigVal('ignoreRobotsTxt', false)).
  option('--url-list', `assume that --url contains url list, will set -d 1 --no-limit-domain --ignore-robots-txt`,
    getConfigVal('ignoreRobotsTxt', false)).
  option('-m, --max-requests <num>', `Limit max pages scan`,
    parseInt, getConfigVal('maxRequests', 0)).
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
  option('--out-name <name>', `Output file name, default: domain`).
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
  // language detection
  option('--language-detection', `Language detection`,
    getConfigVal('languageDetection', false)).
  option('--language-whitelist', `Language whitelist`).
  option('--language-blacklist', `Language blacklist`).
  // readingTime
  option('--reading-time', `Estimate reading time`,
    getConfigVal('readingTime', false)).
  // htmlGrabbr
  option('--html-grabbr', `Extract additional fields with htmlGrabbr`,
    getConfigVal('htmlGrabbr', false)).
  option('--html-grabbr-debug', `Activate debug mode for htmlGrabbr`,
    getConfigVal('htmlGrabbr.debug', false)).
  option('--html-grabbr-pretty', `Activate pretty mode for htmlGrabbr`,
    getConfigVal('htmlGrabbr.pretty', false)).
  option('--html-grabbr-exceprt', `Extract text exceprt with htmlGrabbr`,
    getConfigVal('htmlGrabbr.exceprt', false)).
  option('--html-grabbr-page-illustration', `Extract page illustration with htmlGrabbr`,
    getConfigVal('htmlGrabbr.pageIllustration', false)).
  option('--html-grabbr-read-length', `Extract read length with htmlGrabbr`,
    getConfigVal('htmlGrabbr.readLength', false)).
  option('--html-grabbr-embedded-image-urls', `Extract embedded image urls with htmlGrabbr`,
    getConfigVal('htmlGrabbr.embeddedImageURLs', false)).
  // Yake
  option('--yake', `Extract keywords with YAKE`,
    getConfigVal('yake', false)).
  option('--yake-server-url <endpoint>', `Yake - Endpoint URL`,
    getConfigVal('yake.serverUrl', '')).
  option('--yake-language <auto|iso-2>', `Yake - Language`,
    getConfigVal('yake.language', 'auto')).
  option('--yake-ngram-threshold <float>', `Yake - Ngram Score Threshold`,
    getConfigVal('yake.ngramThreshold', 0.02)).
  option('--yake-max-ngram-size <num>', `Yake - Max NGRAM Size`,
    getConfigVal('yake.maxNgramSize', 5)).
  option('--yake-number-keywords <num>', `Yake - Number of Keywords`,
    getConfigVal('yake.numberKeywords', 10)).
  // InfluxDB options
  option('--influxdb', `Export data to InfluxDB`,
    getConfigVal('influxdb', false)).
  option('--influxdb-database <database>', `InfluxDB database name`,
    getConfigVal('influxdb.database', 'telegraf')).
  option('--influxdb-max-send <num>', `Limit send to InfluxDB`,
    getConfigVal('influxdb.maxSendCount', 5)).
  option('--influxdb-measurement <num>', `InfluxDB Measurement ID`,
    getConfigVal('influxdb.measurement', 'seoz')).
  // Slack options
  option('--slack', `Slack notification when audit is ready`,
    getConfigVal('slack', false)).
  option('--slack-conversation-id <conversationId>', `Slack conversation ID`,
    getConfigVal('slack.conversationId', '')).
  option('--slack-token <num>', `Slack webhook token`,
    getConfigVal('slack.token', '')).  
  option('--slack-signin-secret <num>', `Slack signin-seccret`,
    getConfigVal('slack.signin.secret', '')).
  name('site-audit-seo').
  version(packageJson.version).
  usage('-u https://example.com --upload')

program.getOptions = () => {
  const opts = {
    fieldsPreset: program.preset,              // варианты: default, seo, headers, minimal
    fieldsExclude: program.exclude,             // исключить поля
    maxDepth: program.maxDepth,                 // chrome-crawler, глубина сканирования
    maxConcurrency: parseInt(program.concurrency), // chrome-crawler, параллельно открываемые вкладки
    lighthouse: program.lighthouse,             // сканировать через lighthouse
    delay: parseInt(program.delay),             // задержка между запросами
    skipStatic: program.skipStatic,             // не пропускать подгрузку браузером статики (картинки, css, js)
    followSitemapXml: program.followXmlSitemap, // chrome-crawler, чтобы найти больше страниц
    limitDomain: program.limitDomain,           // не пропускать подгрузку браузером статики (картинки, css, js)
    urlList: program.urlList,                   // метка, что передаётся страница со списком url
    maxRequest: program.maxRequests,            // chrome-crawler, для тестов
    headless: program.headless,                 // chrome-crawler, на десктопе открывает браузер визуально
    docsExtensions: program.docsExtensions,     // расширения, которые будут добавлены в таблицу
    outDir: program.outDir,                     // папка, куда сохраняются csv
    outName: program.outName,                   // имя файла
    color: program.color,                       // раскрашивать консоль
    lang: program.lang,                         // язык
    openFile: program.openFile,                 // открыть файл после сканирования
    fields: program.fields,                     // дополнительные поля, --fields 'title=$("title").text()'
    defaultFilter: program.defaultFilter,       //
    removeCsv: program.removeCsv,               // удалять csv после генерации xlsx
    removeJson: program.removeJson,             // удалять json после поднятия сервера
    xlsx: program.xlsx,                         // сохранять в XLSX
    gdrive: program.gdrive,                     // публиковать на google docs
    json: program.json,                         // сохранять json файл
    upload: program.upload,                     // выгружать json на сервер
    consoleValidate: program.consoleValidate,   // выводить данные валидации в консоль
    obeyRobotsTxt: !program.ignoreRobotsTxt,    // chrome-crawler, не учитывать блокировки в robots.txt
    readingTime: program.readingTime,           // конфиг readingTime
    languageDetection: program.languageDetection, // конфиг language detection
    languageWhitelist: program.languageWhitelist, // конфиг language detection (whitelist)
    languageBlakclist: program.languageBlakclist, // конфиг language detection (blacklist)
    htmlGrabbr: program.htmlGrabbr,             // конфиг htmlGrabbr
    htmlGrabbrDebug: program.htmlGrabbrDebug,             // конфиг htmlGrabbrDebug
    htmlGrabbrPretty: program.htmlGrabbrPretty,             // конфиг htmlGrabbrPretty
    htmlGrabbrExcerpt: program.htmlGrabbrExcerpt,             // конфиг htmlGrabbrExcerpt
    htmlGrabbrEmbeddedImageURLs: program.htmlGrabbrEmbeddedImageURLs,             // конфиг htmlGrabbrEmbeddedImageURLs
    htmlGrabbrReadLength: program.htmlGrabbrReadLength,             // конфиг htmlGrabbrReadLength
    yake: program.yake,                         // конфиг yake
    yakeLanguage: program.yakeLanguage,                         // конфиг yakeLanguage
    yakeMaxNgramSize: program.yakeMaxNgramSize,                         // конфиг yakeMaxNgramSize
    yakeNumberKeywords: program.yakeNumberKeywords,                         // конфиг yakeNumberKeywords
    yakeServerUrl: program.yakeServerUrl,                         // конфиг yakeNumberKeywords
    yakeNgramThreshold: program.yakeNgramThreshold, // конфиг yakeNgramThreshold
    influxdb: program.influxdb,                 // конфиг influxdb
    slack: program.slack,                       // конфиг slack
    urls: program.urls                          // адреса для одиночного сканирования
  };
  return opts;
}

program.outBrief = (options) => {
  let brief = [
    {
      name: 'Preset',
      value: program.preset,
      comment: '--preset [minimal, seo, headers, parse, lighthouse, lighthouse-all]',
    },
    {
      name: 'Threads',
      value: program.concurrency,
      comment: '-c threads' +
        (program.concurrency > 1 && program.lighthouse ?
          `, ${color.yellow}recommended to set -c 1 when using lighthouse${color.reset}`
          : ''),
    },
    {
      name: 'Lighthouse',
      value: (program.lighthouse ? 'yes' : 'no'),
      comment: (program.lighthouse ? '' : '--lighthouse')
    },
    {
      name: 'Delay',
      value: program.delay,
      comment: '--delay ms',
    },
    {
      name: 'Ignore robots.txt',
      value: (program.ignoreRobotsTxt ? 'yes' : 'no'),
      comment: (!program.ignoreRobotsTxt ? '--ignore-robots-txt' : ''),
    },
    {
      name: 'Follow sitemap.xml',
      value: (program.followXmlSitemap ? 'yes' : 'no'),
      comment: (!program.followXmlSitemap ? '--follow-xml-sitemap' : ''),
    },
    {
      name: 'Max depth',
      value: program.maxDepth,
      comment: '-d 8',
    },
    {
      name: 'Max requests',
      value: program.maxRequests ? program.maxRequests : 'unlimited',
      comment: '-m 123',
    },
    {
      name: 'Language',
      value: program.lang,
      comment: '--lang ' + (program.lang == 'ru' ? 'en' : 'ru'),
    },
    {
      name: 'Docs extensions',
      value: program.docsExtensions.join(','),
      comment: '--docs-extensions zip,rar',
    },
  ];

  if (options.htmlGrabbr) {
    brief = [...brief, ...[
      {
        name: 'htmlGrabbr debug',
        value: program.htmlGrabbrDebug,
        comment: '--html-grabbr-debug',
      },
      {
        name: 'htmlGrabbr pretty',
        value: program.htmlGrabbr.pretty,
        comment: '--html-grabbr-pretty',
      },
      {
        name: 'htmlGrabbr page illustration',
        value: program.htmlGrabbrPageIllustration,
        comment: '--html-grabbr-page-illustration',
      },
      {
        name: 'htmlGrabbr excerpt',
        value: program.htmlGrabbrExcerpt,
        comment: '--html-grabbr-excerpt',
      },
      {
        name: 'htmlGrabbr read length',
        value: program.htmlGrabbrReadLength,
        comment: '--html-grabbr-read-length',
      },
      {
        name: 'htmlGrabbr embedded image urls',
        value: program.htmlGrabbrEmbeddedImageURLs,
        comment: '--html-grabbr-embedded-image-urls',
      },
    ]];
  }

  if (options.yake) {
    brief = [...brief, ...[
      {
        name: 'Yake language',
        value: program.yakeLanguage,
        comment: '--yake-language auto',
      },
      {
        name: 'Yake Max Ngram Size',
        value: program.yakeMaxNgramSize,
        comment: '--yake-max-ngram-size 3',
      },
      {
        name: 'Yake Ngram Score Threshold',
        value: program.yakeNgramThreshold,
        comment: '--yake-ngram-threshold 0.02',
      },
      {
        name: 'Yake Number Keywords',
        value: program.yakeNumberKeywords,
        comment: '--yake-number-keywords 10',
      },
      {
        name: 'Yake Server url',
        value: program.yakeServerUrl,
        comment: '--yake-server-url http://localhost:5000/yake',
      },
    ]];
  }

  if (options.influxdb) {
    brief = [...brief, ...[
      {
        name: 'InfluxDB max send',
        value: program.influxdbMaxSend,
        comment: '--influxdb-max-send 10',
      },
      {
        name: 'InfluxDB database name',
        value: program.influxdbDatabase,
        comment: '--influxdb-database telegraph',
      },
      {
        name: 'InfluxDB database name',
        value: program.influxdbMeasurement,
        comment: '--influxdb-measurement seoz',
      },
    ]];
  }

  if (options.slack) {
    brief = [...brief, ...[
      {
        name: 'Slack Conversation ID',
        value: program.slackConversationId,
        comment: '--slack-conversation-id XXXXXXX',
      },
      {
        name: 'Slack Token',
        value: program.slackToken,
        comment: '--slack-token XXXXXXX-XXXXXXX',
      },
      {
        name: 'Slack sign-in secret',
        value: program.slackSigninSeccret,
        comment: '--slack-signin-secret XXXXXXX-XXXXXXX',
      },
    ]];
  }

  // only for command
  if (!options.webService) {
    brief = [...brief, ...[
      {
        name: 'Headless',
        value: (program.headless ? 'yes' : 'no'),
        comment: (program.headless ? '--no-headless' : ''),
      },
      {
        name: 'Save as XLSX',
        value: (program.xlsx ? 'yes' : 'no'),
        comment: (!program.xlsx ? '--xlsx' : ''),
      },
      {
        name: 'Save as JSON',
        value: (program.json ? 'yes' : 'no'),
        comment: (program.json ? '--no-json' : ''),
      },
      {
        name: 'Upload JSON',
        value: (program.upload ? 'yes' : 'no'),
        comment: (!program.upload ? '--upload' : ''),
      }
    ]];
  }

  console.log('');
  for (let line of brief) {
    const nameCol = line.name.padEnd(20, ' ');
    const valueCol = `${line.value}`.padEnd(10, ' ');
    const comment = line.comment ? ` ${line.comment}` : '';
    console.log(color.white + nameCol + valueCol + color.reset + comment);
    if (options.socket) options.socket.emit('status' + (options.socket.uid || ''), '<pre>' + nameCol + valueCol + comment + '</pre>');
  }
  console.log('');
  if (options.socket) options.socket.emit('status' + (options.socket.uid || ''), '&nbsp;');
}

module.exports = program;