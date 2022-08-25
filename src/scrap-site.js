// see API - https://github.com/yujiosaka/headless-chrome-crawler/blob/master/docs/API.md#event-requeststarted
const fs = require('fs');
const path = require('path');
const {saveAsXlsx, saveAsJson, copyJsonToReports, uploadJson, publishGoogleDrive, startViewer} = require(
  './actions');
const axios = require('axios');
const HCCrawler = require('@popstas/headless-chrome-crawler');
const CSVExporter = require('@popstas/headless-chrome-crawler/exporter/csv');
const url = require('url');
const {validateResults, getValidationSum} = require('./validate');
const {exec} = require('child_process');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const sanitize = require("sanitize-filename");
// поля описаны в API по ссылке выше
const fieldsPresets = require('./presets/scraperFields');
const color = require('./color');
const registry = require('./registry');

const DEBUG = true; // выключить, если не нужны console.log на каждый запрос (не будет видно прогресс)


// запреты браузеру на подгрузку статики, ускоряет
let SKIP_IMAGES = true;
let SKIP_CSS = true;
let SKIP_JS = true;

// кол-во попыток выполнить actions
const finishTries = 5;

let disconnectedLog = [];

// resend messages while disconnected
function sendDisconnected(socket) {
  if (disconnectedLog.length == 0) return;
  const log = [...disconnectedLog];
  disconnectedLog = [];
  for (let item of log) {
    socketSend(socket, item.event, item.msg);
  }
}

function socketSend(socket, event, msg) {
  if (socket) {
    const channel = event + (socket.uid || '')
    // console.log(channel + ': ', msg);

    if (socket.connected) {
      sendDisconnected(socket);
      socket.emit(channel, msg);
    } else {
      disconnectedLog.push({ event, msg });
    }
  }
}

module.exports = async (baseUrl, options = {}) => {
  const domain = url.parse(baseUrl).hostname || baseUrl;
  const protocol = url.parse(baseUrl).protocol;

  const log = (msg) => {
    const socketId = options.socket ? `${options.socket.id} ` : '';
    const disconnected = options.socket && !options.socket.connected ? '(disconnected) ' : '';
    if (DEBUG) console.log(`${socketId}${disconnected}${msg}`);
    socketSend(options.socket, 'status', msg);
  };
  options.log = log;

  // const plugins = registry.getPlugins();
  // if (plugins) console.log('loaded plugins: ', plugins.map(p => p.name).join(', '));
  
  const parseUrls = async (url) => {
    const urls = [];
    const regex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&#\/%=~_|$?!:,.]*\)|[A-Z0-9+&#\/%=~_|$])/ig

    let content;
    /* if (fs.existsSync(url)) { // TODO: url list from file
      content = fs.readFileSync(options.file, 'utf8');
    } */
    res = await axios.get(url);
    content = res.data;

    while (pageUrl = regex.exec(content)){
      if (pageUrl[0].match(/\.(png|jpg|js|css)$/)) continue;
      urls.push(pageUrl[0]);
    }

    const onlyUnique = (value, index, self) => self.indexOf(value) === index;
    return urls.filter(onlyUnique);
  }

  let urls = [];
  if (options.urlList) {
    if (options.urls && options.urls.length > 1) urls = options.urls;
    else urls = await parseUrls(baseUrl);
  }

  // console.log('urls: ', urls);
  const baseName = sanitize(options.outName || domain);
  const csvPath = path.normalize(`${options.outDir}/${baseName}.csv`);
  const xlsxPath = path.normalize(`${options.outDir}/${baseName}.xlsx`);
  const jsonPath = path.normalize(`${options.outDir}/${baseName}.json`);
  let webPath;

  if (!options.color) color.white = color.red = color.reset = color.yellow = '';

  if (!options.fieldsPreset || !fieldsPresets[options.fieldsPreset]) {
    options.fieldsPreset = 'default';
  }

  let fields = fieldsPresets[options.fieldsPreset];

  // exclude fields
  if (options.fieldsExclude && options.fieldsExclude.length > 0) {
    fields = fields.filter(f => {
      const fName = f.replace(/.*\./g, '');
      return !options.fieldsExclude.includes(fName);
    });
  }

  // custom fields
  if (Object.keys(options.fields).length > 0) {
    // console.log('options.fields: ', options.fields);
    const newFields = Object.keys(options.fields).map(f => 'result.' + f);
    fields = [...fields, ...newFields];
  }

  // lighthouse fields
  if (options.lighthouse) {
    for (let fName of fieldsPresets['lighthouse-all']) {
      if (fields.indexOf(fName) === -1) {
        fields.push(fName);
      }
    }
  }

  // plugins fields
  const plugins = registry.getPlugins();
  for (let plugin of plugins) {
    if (options.disablePlugins.includes(plugin.name)){
      continue;
    }
    if (plugin.fields) for(let field of plugin.fields) {
      if (typeof field === 'string') {
        fields.push(field);
      } else {
        fields.push(field.name);
      }
      // console.log(`push ${field}`);
    }
  }

  // skip static
  if (options.skipStatic !== undefined) {
    SKIP_IMAGES = SKIP_CSS = SKIP_JS = options.skipStatic;
  }

  // open second chrome for lighthouse
  let lighthouseChrome;
  if (options.lighthouse) {
    const chromeFlags = ['--no-sandbox'];
    if (options.headless) chromeFlags.push('--headless');
    lighthouseChrome = await chromeLauncher.launch({chromeFlags});
  }

  const exporter = new CSVExporter({
    file: csvPath,
    fields: fields,
    separator: ';',
  });

  const failedUrls = [];

  let crawler;
  const defaultOptions = {
    allowedDomains: options.limitDomain ? [domain] : undefined,
    skipRequestedRedirect: true, // all redirects marks as visited
    depthPriority: false, // without it find not all pages
    retryCount: 1,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'], // puppeteer freezes without it
    exporter,

    // url ignore rules
    preRequest: options => {
      // console.log(options.url);
      if (options.url.match(/\.(jpg|jpeg|png|gif)/i)) return false; // картинки
      if (options.url.match(/\?width=\d+&height=\d+/)) return false; // визитки, сотрудники
      if (options.url.includes('?vi=y')) return false; // версия для слабовидящих
      if (options.url.includes('gallery/?page=detail')) return false; // Битрикс Галерея 2.0
      if (options.url.includes('/?lightbox=')) return false; // lightbox
      if (options.url.includes('rk.php')) return false; // bitrix rk
      if (options.url.includes('/?catalog_view=')) return false; // bitrix display
      if (options.url.includes('/?SORT=')) return false; // bitrix sort
      if (options.url.includes('/filter/clear/apply/')) return false; // bitrix filter
      // if (options.url.match(/\?(category|age|usage|madein|season|brand)=/)) return false; // bitrix filter

      // http scan while first page was https
      if (!options.urlList && url.parse(options.url).protocol != protocol) return false;

      return true;
    },

    // сюда можно дописывать сборщики данных со страницы
    // поля надо добавить в fields выше
    evaluatePage: async () => {
      try {
        const customFields = await window.__customFields();
        // console.log('window.__customFields(): ', JSON.stringify(customFields));

        let domainParts = location.host.split('.');
        const domain2level = domainParts.slice(domainParts.length - 2).
          join('.');
        const canonical = $('link[rel="canonical"]').attr('href');
        const relUrl = window.location.href.replace(`${window.location.protocol}//${window.location.host}`, '');
        const isCanonical = canonical ?
          (canonical == decodeURI(window.location.href) ||
          canonical == decodeURI(relUrl) ? 1 : 0) : '';

        const result = {
          request_time:
            window.performance.timing.responseEnd -
            window.performance.timing.requestStart,
          title: $('title').text(),
          page_date: '',
          h1: $('h1').text().trim(),
          h1_count: $('h1').length,
          h2_count: $('h2').length,
          h3_count: $('h3').length,
          h4_count: $('h4').length,
          canonical_count: $('link[rel="canonical"]').length,
          google_amp: $('link[rel="amphtml"]').length,
          dom_size: document.getElementsByTagName('*').length,
          head_size: document.head.innerHTML.length,
          body_size: document.body.innerHTML.length,
          html_size: document.head.innerHTML.length +
            document.body.innerHTML.length,
          text_ratio_percent: Math.round(
            document.body.innerText.length / document.body.innerHTML.length *
            100),
          images: $('img').length,
          images_without_alt: $('img:not([alt]').length,
          images_alt_empty: $('img[alt=""]').length,
          images_outer: $(
            'img[src^="http"]:not([src^="/"]):not([src*="' + domain2level +
            '"])').length,
          links: $('a[href]:not([href^="javascript"]):not([href^="#"])').length,
          links_inner: $(
            'a[href^="/"], a[href*="' + domain2level + '"]').length,
          links_outer: $(
            'a[href^="http"]:not([href^="javascript"]):not([href^="#"]):not([href^="/"]):not([href*="' +
            domain2level + '"])').length,
          // links_absolute: $('').length,
          description:
            ($('meta[name="description"]').attr('content') &&
              $('meta[name="description"]').
                attr('content').
                split('\n').
                join(' ')) ||
            '',
          keywords: $('meta[name="keywords"]').attr('content'),
          canonical: canonical,
          is_canonical: isCanonical,
          og_title: $('meta[property="og:title"]').attr('content'),
          og_image: $('meta[property="og:image"]').attr('content'),
          schema_types: $.unique($('[itemtype]').
            map((i, item) => $(item).
              attr('itemType').
              replace(/https?:\/\/schema\.org\//, ''))).toArray().join(', '),
        };

        // page date from microformat
        const pageDate = $('[itemprop="datePublished"]').first();
        if (pageDate.length === 1) {
          const dateStr = pageDate.attr('datetime') || pageDate.attr('content');
          const d = new Date(dateStr);
          if (!isNaN(d.getTime())) {
            result.page_date = dateStr.substring(0, 10);
          }
        }

        for (let name in customFields) {
          try {
            result[name] = eval(customFields[name].replace(/`/g, '\''));
          } catch(e) {
            result[name] = `field ${name}: error parse ${customFields[name]}`;
          }
          // if(name == 'section') result[name] = $('.views-field.views-field-field-section a').text();
        }

        return result;
      } catch (e) {
        return {
          error: JSON.stringify(e),
        };
      }
    },

    onSuccess: result => {
      if (!result.result) return;

      if (result.result.error) {
        const msg = `${color.red}evaluatePage: Error collect page data: result.result.error${color.reset}`;
        console.error(msg);
      }
      // console.log(`html_size: ${result.result.html_size}`);
    },

    customCrawl: async (page, crawl, crawler) => {
      // You can access the page object before requests
      await page.setRequestInterception(true);
      await page.setBypassCSP(true);

      //page.on('console', msg => console.log(msg.text()));
      await page.exposeFunction('__customFields', () => {
        return options.fields;
      });

      let mixedContentUrl = '';

      // это событие срабатывает, когда chrome подгружает статику на странице (и саму страницу)
      page.on('request', request => {
        //console.log('request.url(): ', request.url());

        // check for mixed content, thanks to https://github.com/busterc/mixed-content-crawler/
        if (protocol == 'https:' &&
          ['image', 'stylesheet', 'script'].includes(request.resourceType()) &&
          request.url().match(/^http:/)) {
          request.notHTTPS = true;
          mixedContentUrl = request.url();
          return request.abort();
        }

        const isDoc = options.docsExtensions.some(
          ext => request.url().includes(`.${ext}`));
        if (isDoc) {
          // досюда как-то доходит
          request.abort();
        } else if (SKIP_IMAGES && request.resourceType() == 'image') {
          request.abort();
        } else if (SKIP_CSS && request.resourceType() == 'stylesheet') {
          request.abort();
        } else if (SKIP_JS && request.resourceType() == 'script') {
          request.abort();
        } else {
          request.continue();
        }
      });

      page.on('requestfailed', request => {
        // skip adv errors
        if (request.url().includes('googlesyndication')
         || request.url().includes('googleads')
         || request.url().includes('adfox')
         || request.url().includes('an.yandex.ru')
         || request.url().includes('nativeroll.tv')
        ) {
          return;
        }

        if (request.notHTTPS) {
          console.error(
            `${color.red}${crawler._options.url}: mixed content: ${request.url()}${color.reset}`);
          return;
        }

        const isStatic = ['image', 'script', 'stylesheet'].includes(request.resourceType());
        if (!isStatic) {
          console.error(`Request failed: ${request.response()?.status()}, ${request.url()}, ${request.failure().errorText}`);

          // add to result table when first error
          if (!failedUrls.includes(crawler._options.url)) {
            failedUrls.push(crawler._options.url);
            const result = {
              options: {},
              depth: 0,
              previousUrl: '',
              response: {
                url: crawler._options.url,
                status: request.response()?.status(),
              },
              redirectChain: [],
              screenshot: null,
              cookies: [],
              links: [],
            };
            exporter.writeLine(result);
          }
        }
      });

      /* page.on('error', function(err) {
        console.error(`${color.red}Page error:${color.reset} ` + err.toString());
      });

      page.on('close', function() {
        console.error(`${color.red}Page closed${color.reset} `);
      });

      page.on('pageerror', function(err) {
        console.error(`${color.red}pegeerror:${color.reset} ` + err.toString());
      }); */

      // console.log('co '+ crawler._options.url);

      // костыль, который возвращает фейково обойдённый документ, если он признан документом
      // нужно, чтобы доки не сканировались (выдают ошибку), но при этом добавлялись в csv
      // т.к. в этом контексте нет текущего урла, он задаётся в глобал через событие requeststarted
      const isDoc = crawler._options.url && options.docsExtensions.some(
        ext => crawler._options.url.includes(`.${ext}`));
      if (isDoc) {
        return {
          options: {},
          depth: 0,
          previousUrl: '',
          response: {
            url: crawler._options.url,
          },
          redirectChain: [],
          result: {},
          screenshot: null,
          cookies: [],
          links: [],
        };
      }

      // The result contains options, links, cookies and etc.
      const result = await crawl();

      if (options.lighthouse) {
        const opts = {
          // extends: 'lighthouse:default',
          /*onlyAudits: [
            'first-meaningful-paint',
            'speed-index',
            'first-cpu-idle',
            'interactive',
          ],*/
          // onlyCategories : [ 'performance'/*, 'pwa', 'accessibility', 'best-practices', 'seo'*/ ],
          port: lighthouseChrome.port,
          locale: options.lang,
        };
        const res = await lighthouse(crawler._options.url, opts);
        const data = JSON.parse(res.report);

        const audits = [
          'first-contentful-paint',
          'speed-index',
          'largest-contentful-paint',
          'interactive',
          'total-blocking-time',
          'cumulative-layout-shift',
        ];
        const categories = [
          'performance',
          'accessibility',
          'best-practices',
          'seo',
          'pwa'];
        const lighthouseData = {
          scores: {},
        };

        const fieldConfigs = []; // для генерации конфига полей

        for (let auditName of audits) {
          if (!data.audits[auditName]) continue;
          lighthouseData[auditName] = parseInt(
            data.audits[auditName].numericValue);
        }

        for (let categoryId of categories) {
          if (!data.categories[categoryId]) continue;

          // lighthouse.scores
          lighthouseData.scores[categoryId] = parseInt(
            data.categories[categoryId].score * 100);

          // all audits
          for (let auditRef of data.categories[categoryId].auditRefs) {
            let value;
            const auditName = auditRef.id;
            const audit = data.audits[auditName];

            if (audit.numericValue) value = parseInt(audit.numericValue);
            else value = audit.score;

            lighthouseData[auditName] = value;

            // add to sheet fields
            if (options.fieldsPreset === 'lighthouse-all') {
              const fieldId = 'lighthouse.' + auditName;
              if (fields.indexOf(fieldId) === -1) {
                fields.push(fieldId);
              }
            }

            // generate field config
            const fieldConfig = {
              name: 'lighthouse_' + audit.id,
              comment: audit.title,
              description: audit.description,
              groups: ['# Lighthouse: ' + data.categories[categoryId].title],
              type: 'integer',
            };
            if (auditRef.group) {
              const groupTitle = data.categories[categoryId].title + ': ' +
                data.categoryGroups[auditRef.group].title;
              fieldConfig.groups.push(groupTitle);
              // fieldConfig.groups = [groupTitle];
            }
            fieldConfigs.push(fieldConfig);
          }
        }

        result.lighthouse = lighthouseData;
        // console.log(JSON.stringify(fieldConfigs)); // copy to fields.js
        // console.log(lighthouseData);
      }

      result.result.mixed_content_url = mixedContentUrl;
      if (result.response.url) {
        result.response.url = decodeURI(result.response.url);
      }

      // console validate output
      // was in onSuccess(), but causes exception on docs
      if (options.consoleValidate) {
        const msgs = [];
        const validate = validateResults(result, fields); // TODO: fields declared implicitly
        for (let name in validate) {
          const res = validate[name];
          const msgColor = {warning: color.yellow, error: color.red}[res.type];
          msgs.push(`${name}: ${msgColor}${res.msg}${color.reset}`);
        }
        if (msgs.length > 0) console.log(msgs.join(', '));
      }

      // You can access the page object after requests
      result.content = await page.content();

      // plugins afterRequest
      try {
        socketSend(options.socket, 'ping', 'ping'); // https://github.com/socketio/socket.io/issues/3025
        // log('ping', opts.socket, true);
        await registry.execPlugins(result, options, 'afterRequest');
      } catch (e) {
        console.log('Error while plugins afterRequest');
        console.log(e);
      }
      // console.log('result.readability_reading: ', result.readability_reading);
      // console.log('result.readability_readingMinutes: ', result.readability_readingMinutes);
      // console.log('result.readability_readingTime: ', result.readability_readingTime);

      // You need to extend and return the crawled result
      return result;
    },
  };

  const crawlerOptions = {...defaultOptions, ...options};
  crawlerOptions.args = defaultOptions.args; // override args for chromium

  // start
  const start = Date.now();

  // console.log(`${color.yellow}Scrapping ${baseUrl}...${color.reset}`);
  let requestedCount = 0;

  try {
    crawler = await HCCrawler.launch(crawlerOptions);
  } catch (e) {
    console.log(e);
  }

  crawler.on('requeststarted', async opts => {
    if (crawler._browser._connection._closed) return; // catch error after scan

    const queueCount = await crawler.queueSize();
    requestedCount = crawler.requestedCount() + 1;
    if (options.cancel) {
      crawler.setMaxRequest(requestedCount); // cancel command
    }
    // console.log('crawler: ', crawler);
    log(`${requestedCount} ${decodeURI(opts.url)} (${queueCount})`);
  });
  crawler.on('requestfailed', error => {
    if (crawler._browser._connection._closed) return; // catch error after scan
    console.error(
      `${color.red}Failed: ${decodeURI(error.options.url)}${color.reset}`);
  });
  crawler.on('requestdisallowed', options => {
    log(`Disallowed in robots.txt: ${decodeURI(options.url)}`, options.socket);
    console.error(`${color.yellow}Disallowed in robots.txt: ${decodeURI(
      options.url)}${color.reset}`);
  });
  crawler.on('maxdepthreached', opts => {
    if (options.maxDepth > 1) console.log(`${color.yellow}Max depth reached${color.reset}`);
  });
  crawler.on('maxrequestreached', options => {
    if (crawler._browser._connection._closed) return; // catch error after scan
    console.log(`\n${color.yellow}Max requests reached${color.reset}`);
    // console.log(`${color.yellow}Please, ignore this error:${color.reset}`);
  });

  if (options.urlList) {
    log('Queue ' + urls.length + ' urls', options.socket);
    for (let url of urls) {
      await crawler.queue(url);
    }
  } else {
    await crawler.queue(baseUrl);
  }

  await crawler.onIdle();
  await crawler.close();

  // after scan
  const scanTime = Math.round((Date.now() - start) / 1000);
  const perPage = Math.round((scanTime / requestedCount) * 100) / 100;

  // close lighthouse's chrome
  await chromeLauncher.killAll();

  const outValidationSummary = () => {
    const sum = getValidationSum();
    if (Object.entries(sum).length === 0) return;
    console.log(`\n\n${color.white}Validation summary:${color.reset}`);
    for (let colName in sum) {
      console.log(`\n${color.white}${colName}:${color.reset}`);
      for (let res of sum[colName]) {
        const msgColor = {warning: color.yellow, error: color.red}[res.type];
        console.log(`${msgColor}${res.msg}${color.reset}\t${res.url}`);
      }
    }
  };

  const finishScan = async () => {
    console.log('');

    if (options.consoleValidate) {
      outValidationSummary();
    }

    // legacy, xlsx don't needed more
    if (options.xlsx) {
      saveAsXlsx(csvPath, xlsxPath);
      if (options.gdrive) await publishGoogleDrive(xlsxPath);
      if (options.openFile) exec(`"${xlsxPath}"`);
    }

    if (options.json) {
      await saveAsJson(csvPath, jsonPath, options.lang, options.preset, options.defaultFilter, baseUrl, options.args, scanTime);
      if (!options.removeJson) console.log('Saved to ' + jsonPath);

      // user plugins
      await registry.execPlugins(jsonPath, options, 'afterScan');

      if (!options.webService) {
        if (options.upload) webPath = await uploadJson(jsonPath);
        await startViewer(jsonPath, webPath);
      }

      if (options.webService) {
        const { jsonName, localPath } = copyJsonToReports(jsonPath, options.socket.uid);

        // send result json to socket
        socketSend(options.socket, 'result', {name: jsonName});
        console.log(`Save to ${jsonName}`);


        // TODO: error upload 8MB+
        if (options.upload) {
          webPath = await uploadJson(jsonPath);
          socketSend(options.socket, 'result', {json: webPath});
        }

        const mins = Number(scanTime / 60).toFixed(1);
        log(`Finish: ${mins} mins (${perPage} sec per page)`, options.socket);

        // return stats
        return {
          time: scanTime,
          perPage: perPage,
          pages: requestedCount,
        }
      }

      if (options.removeJson) fs.unlinkSync(jsonPath);
    }

    if (options.removeCsv) fs.unlinkSync(csvPath);

    const mins = Number(scanTime / 60).toFixed(1);
    log(`Finish: ${mins} mins (${perPage} sec per page)`, options.socket);
  };

  const tryFinish = async (tries) => {
    try {
      return await finishScan();
    } catch (e) {
      if (e.code == 'EBUSY') {
        let msg = `${color.red}${xlsxPath} is busy`;
        if (tries > 0) msg += ', please close file in 10 seconds!';
        console.error(msg);

        if (tries > 0) {
          setTimeout(async () => {
            await tryFinish(tries - 1);
          }, 10000);
        }
      } else {
        log('error after scan: ' + e.message);
        // console.error(e);
      }
    }
  };

  return await tryFinish(finishTries);
};
