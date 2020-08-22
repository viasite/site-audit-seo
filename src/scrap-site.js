// see API - https://github.com/yujiosaka/headless-chrome-crawler/blob/master/docs/API.md#event-requeststarted
const fs = require('fs');
const saveAsXlsx = require('./save-as-xlsx');
const saveAsJson = require('./save-as-json');
const uploadJson = require('./upload-json');
const publishGoogleSheets = require('./publish-google-sheets');
const startViewer = require('./start-viewer');
const HCCrawler = require('@popstas/headless-chrome-crawler');
const CSVExporter = require('@popstas/headless-chrome-crawler/exporter/csv');
const url = require('url');
const {validateResults, getValidationSum} = require('./validate');
const { exec } = require('child_process');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

const DEBUG = true; // выключить, если не нужны console.log на каждый запрос (не будет видно прогресс)

const color = require('./color');

// запреты браузеру на подгрузку статики, ускоряет
let SKIP_IMAGES = true;
let SKIP_CSS = true;
let SKIP_JS = true;
const finishTries = 5;

// поля описаны в API по ссылке выше
const fields_presets = {
  default: ['response.url', 'depth'],
  minimal: ['response.url'],
  seo: [
    'response.url',
    'result.mixed_content_url',
    'result.canonical',
    'result.is_canonical',
    'previousUrl',
    'depth',
    'response.status',
    'result.request_time',
    'result.title',
    'result.h1',
    'result.description',
    'result.keywords',
    'result.og_title',
    'result.og_image',
    'result.schema_types',
    'result.h1_count',
    'result.h2_count',
    'result.h3_count',
    'result.h4_count',
    'result.canonical_count',
    'result.images',
    'result.images_without_alt',
    'result.images_alt_empty',
    'result.images_outer',
    'result.links',
    'result.links_inner',
    'result.links_outer',
    'result.text_ratio_percent',
    'result.dom_size',
    'result.html_size'
  ],
  headers: [
    'response.url',
    'depth',
    'response.headers.content-type',
    'response.headers.',
    'response.headers.x-bitrix-composite',
    'response.headers.x-page-speed',
    'response.headers.x-cached-by',
    'response.headers.x-drupal-cache'
  ],
  parse: [
    'response.url',
    'result.title',
    'result.h1',
    'result.description',
    'result.keywords',
  ],
  lighthouse: [
    'response.url',
    'result.title',
    'lighthouse.scores.performance',
    'lighthouse.scores.pwa',
    'lighthouse.scores.accessibility',
    'lighthouse.scores.best-practices',
    'lighthouse.scores.seo',

    'lighthouse.first-contentful-paint',
    'lighthouse.speed-index',
    'lighthouse.largest-contentful-paint',
    'lighthouse.interactive',
    'lighthouse.total-blocking-time',
    'lighthouse.cumulative-layout-shift',
  ],
  'lighthouse-all': [
    'response.url',
    'result.title',
    'lighthouse.scores.performance',
    'lighthouse.scores.pwa',
    'lighthouse.scores.accessibility',
    'lighthouse.scores.best-practices',
    'lighthouse.scores.seo',
    'lighthouse.first-contentful-paint',
    'lighthouse.speed-index',
    'lighthouse.largest-contentful-paint',
    'lighthouse.interactive',
    'lighthouse.total-blocking-time',
    'lighthouse.cumulative-layout-shift',
    'lighthouse.first-cpu-idle',
    'lighthouse.max-potential-fid',
    'lighthouse.first-meaningful-paint',
    'lighthouse.estimated-input-latency',
    'lighthouse.render-blocking-resources',
    'lighthouse.uses-responsive-images',
    'lighthouse.offscreen-images',
    'lighthouse.unminified-css',
    'lighthouse.unminified-javascript',
    'lighthouse.unused-css-rules',
    'lighthouse.unused-javascript',
    'lighthouse.uses-optimized-images',
    'lighthouse.uses-webp-images',
    'lighthouse.uses-text-compression',
    'lighthouse.uses-rel-preconnect',
    'lighthouse.server-response-time',
    'lighthouse.redirects',
    'lighthouse.uses-rel-preload',
    'lighthouse.uses-http2',
    'lighthouse.efficient-animated-content',
    'lighthouse.duplicated-javascript',
    'lighthouse.legacy-javascript',
    'lighthouse.total-byte-weight',
    'lighthouse.uses-long-cache-ttl',
    'lighthouse.dom-size',
    'lighthouse.critical-request-chains',
    'lighthouse.user-timings',
    'lighthouse.bootup-time',
    'lighthouse.mainthread-work-breakdown',
    'lighthouse.font-display',
    'lighthouse.performance-budget',
    'lighthouse.timing-budget',
    'lighthouse.resource-summary',
    'lighthouse.third-party-summary',
    'lighthouse.largest-contentful-paint-element',
    'lighthouse.layout-shift-elements',
    'lighthouse.uses-passive-event-listeners',
    'lighthouse.no-document-write',
    'lighthouse.long-tasks',
    'lighthouse.non-composited-animations',
    'lighthouse.unsized-images',
    'lighthouse.network-requests',
    'lighthouse.network-rtt',
    'lighthouse.network-server-latency',
    'lighthouse.main-thread-tasks',
    'lighthouse.diagnostics',
    'lighthouse.metrics',
    'lighthouse.screenshot-thumbnails',
    'lighthouse.final-screenshot',
    'lighthouse.accesskeys',
    'lighthouse.aria-allowed-attr',
    'lighthouse.aria-hidden-body',
    'lighthouse.aria-hidden-focus',
    'lighthouse.aria-input-field-name',
    'lighthouse.aria-required-attr',
    'lighthouse.aria-required-children',
    'lighthouse.aria-required-parent',
    'lighthouse.aria-roles',
    'lighthouse.aria-toggle-field-name',
    'lighthouse.aria-valid-attr-value',
    'lighthouse.aria-valid-attr',
    'lighthouse.button-name',
    'lighthouse.bypass',
    'lighthouse.color-contrast',
    'lighthouse.definition-list',
    'lighthouse.dlitem',
    'lighthouse.document-title',
    'lighthouse.duplicate-id-active',
    'lighthouse.duplicate-id-aria',
    'lighthouse.form-field-multiple-labels',
    'lighthouse.frame-title',
    'lighthouse.heading-order',
    'lighthouse.html-has-lang',
    'lighthouse.html-lang-valid',
    'lighthouse.image-alt',
    'lighthouse.input-image-alt',
    'lighthouse.label',
    'lighthouse.layout-table',
    'lighthouse.link-name',
    'lighthouse.list',
    'lighthouse.listitem',
    'lighthouse.meta-refresh',
    'lighthouse.meta-viewport',
    'lighthouse.object-alt',
    'lighthouse.tabindex',
    'lighthouse.td-headers-attr',
    'lighthouse.th-has-data-cells',
    'lighthouse.valid-lang',
    'lighthouse.video-caption',
    'lighthouse.video-description',
    'lighthouse.logical-tab-order',
    'lighthouse.focusable-controls',
    'lighthouse.interactive-element-affordance',
    'lighthouse.managed-focus',
    'lighthouse.focus-traps',
    'lighthouse.custom-controls-labels',
    'lighthouse.custom-controls-roles',
    'lighthouse.visual-order-follows-dom',
    'lighthouse.offscreen-content-hidden',
    'lighthouse.use-landmarks',
    'lighthouse.is-on-https',
    'lighthouse.external-anchors-use-rel-noopener',
    'lighthouse.geolocation-on-start',
    'lighthouse.notification-on-start',
    'lighthouse.no-vulnerable-libraries',
    'lighthouse.password-inputs-can-be-pasted-into',
    'lighthouse.image-aspect-ratio',
    'lighthouse.image-size-responsive',
    'lighthouse.doctype',
    'lighthouse.charset',
    'lighthouse.no-unload-listeners',
    'lighthouse.appcache-manifest',
    'lighthouse.js-libraries',
    'lighthouse.deprecations',
    'lighthouse.errors-in-console',
    'lighthouse.viewport',
    'lighthouse.meta-description',
    'lighthouse.http-status-code',
    'lighthouse.link-text',
    'lighthouse.crawlable-anchors',
    'lighthouse.is-crawlable',
    'lighthouse.robots-txt',
    'lighthouse.hreflang',
    'lighthouse.canonical',
    'lighthouse.font-size',
    'lighthouse.plugins',
    'lighthouse.tap-targets',
    'lighthouse.structured-data',
    'lighthouse.load-fast-enough-for-pwa',
    'lighthouse.works-offline',
    'lighthouse.offline-start-url',
    'lighthouse.service-worker',
    'lighthouse.installable-manifest',
    'lighthouse.redirects-http',
    'lighthouse.splash-screen',
    'lighthouse.themed-omnibox',
    'lighthouse.content-width',
    'lighthouse.without-javascript',
    'lighthouse.apple-touch-icon',
    'lighthouse.maskable-icon',
    'lighthouse.pwa-cross-browser',
    'lighthouse.pwa-page-transitions',
    'lighthouse.pwa-each-page-has-url'
  ]
};

module.exports = async (baseUrl, options = {}) => {
  const domain = url.parse(baseUrl).hostname;
  const protocol = url.parse(baseUrl).protocol;
  const csvPath = `${options.outDir}/${domain}.csv`;
  const xlsxPath = `${options.outDir}/${domain}.xlsx`;
  const jsonPath = `${options.outDir}/${domain}.json`;
  let webPath;

  if(!options.color) color.white = color.red = color.reset = color.yellow = '';

  if (!options.fields_preset || !fields_presets[options.fields_preset]){
    options.fields_preset = 'default';
  }

  let fields = fields_presets[options.fields_preset];

  // exclude fields
  if (options.fieldsExclude && options.fieldsExclude.length > 0){
    fields = fields.filter(f => {
      const fName = f.replace(/.*\./g, '');
      return !options.fieldsExclude.includes(fName);
    });
  }

  // custom fields
  if(options.fields.length > 0) {
    // console.log('options.fields: ', options.fields);
    const newFields = Object.keys(options.fields).map(f => 'result.' + f);
    fields = [...fields, ...newFields];
  }

  // lighthouse fields
  if (options.lighthouse) {
    for (let fName of fields_presets.lighthouse) {
      if (fields.indexOf(fName) === -1) {
        fields.push(fName);
      }
    }
  }

  // skip static
  if (options.skipStatic !== undefined) {
    SKIP_IMAGES = SKIP_CSS = SKIP_JS = options.skipStatic;
  }

  // open second chrome for lighthouse
  let lighthouseChrome;
  if(options.lighthouse) {
    const chromeFlags = ['--no-sandbox'];
    if (options.headless) chromeFlags.push('--headless');
    lighthouseChrome = await chromeLauncher.launch({chromeFlags});
  }

  const exporter = new CSVExporter({
    file: csvPath,
    fields: fields,
    separator: ';'
  });

  let crawler;
  const defaultOptions = {
    allowedDomains: options.limitDomain ? [domain] : undefined,
    skipRequestedRedirect: true, // all redirects marks as visited
    depthPriority: false, // without it find not all pages
    args: ['--no-sandbox'], // puppeteer freezes without it
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
      if(url.parse(options.url).protocol != protocol) return false;

      return true;
    },

    // сюда можно дописывать сборщики данных со страницы
    // поля надо добавить в fields выше
    evaluatePage: async () => {
      try {
        const customFields = await window.__customFields();
        // console.log('window.__customFields(): ', JSON.stringify(customFields));

        let domainParts = location.host.split('.');
        const domain2level = domainParts.slice(domainParts.length-2).join('.');
        const canonical = $('link[rel="canonical"]').attr('href');
        const result = {
          request_time:
            window.performance.timing.responseEnd - window.performance.timing.requestStart,
          title: $('title').text(),
          h1: $('h1').text().trim(),
          h1_count: $('h1').length,
          h2_count: $('h2').length,
          h3_count: $('h3').length,
          h4_count: $('h4').length,
          canonical_count: $('link[rel="canonical"]').length,
          dom_size: document.getElementsByTagName('*').length,
          head_size: document.head.innerHTML.length,
          body_size: document.body.innerHTML.length,
          html_size: document.head.innerHTML.length + document.body.innerHTML.length,
          text_ratio_percent: Math.round(document.body.innerText.length / document.body.innerHTML.length * 100),
          images: $('img').length,
          images_without_alt: $('img:not([alt]').length,
          images_alt_empty: $('img[alt=""]').length,
          images_outer: $('img[src^="http"]:not([src^="/"]):not([src*="'+domain2level+'"])').length,
          links: $('a[href]:not([href^="javascript"]):not([href^="#"])').length,
          links_inner: $('a[href^="/"], a[href*="'+domain2level+'"]').length,
          links_outer: $('a[href]:not([href^="javascript"]):not([href^="#"]):not([href^="/"]):not([href*="'+domain2level+'"])').length,
          // links_absolute: $('').length,
          description:
            ($('meta[name="description"]').attr('content') &&
              $('meta[name="description"]')
                .attr('content')
                .split('\n')
                .join(' ')) ||
            '',
          keywords: $('meta[name="keywords"]').attr('content'),
          canonical: canonical,
          is_canonical: canonical ? (canonical == decodeURI(window.location.href) ? 1 : 0) : '',
          og_title: $('meta[property="og:title"]').attr('content'),
          og_image: $('meta[property="og:image"]').attr('content'),
          schema_types: $.unique($('[itemtype]').map((i, item) => $(item).attr('itemType').replace(/https?:\/\/schema\.org\//, ''))).toArray().join(', ')
        };

        for(let name in customFields) {
          result[name] = eval(customFields[name].replace(/`/g, "'"));
          // if(name == 'section') result[name] = $('.views-field.views-field-field-section a').text();
        }

        return result;
      } catch (e) {
        return {
          error: JSON.stringify(e)
        };
      }
    },

    onSuccess: result => {
      if (!result.result) return;

      if (result.result.error) console.error(`${color.red}Error collect page data: result.result.error${color.reset}`);
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
        if (protocol == 'https:' && ['image', 'stylesheet', 'script'].includes(request.resourceType()) && request.url().match(/^http:/)) {
          request.notHTTPS = true;
          mixedContentUrl = request.url();
          return request.abort();
        }

        const isDoc = options.docsExtensions.some(ext => request.url().includes(`.${ext}`));
        if(isDoc) {
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

      page.on('requestfailed',  request => {
        if (request.notHTTPS) {
          console.error(`${color.red}mixed content: ${request.url()}${color.reset}`);
        }
      });

      /* page.on('error', function(err) {
        console.error(`${color.red}Page error:${color.reset} ` + err.toString()); 
      }); */

      /*page.on('close', function() {
        console.error(`${color.red}Page closed${color.reset} `); 
      });*/

      /* page.on('pegeerror', function(err) {
        console.error(`${color.red}pegeerror:${color.reset} ` + err.toString()); 
      }); */

      // console.log('co '+ crawler._options.url);

      // костыль, который возвращает фейково обойдённый документ, если он признан документом
      // нужно, чтобы доки не сканировались (выдают ошибку), но при этом добавлялись в csv
      // т.к. в этом контексте нет текущего урла, он задаётся в глобал через событие requeststarted
      const isDoc = crawler._options.url && options.docsExtensions.some(ext => crawler._options.url.includes(`.${ext}`));
      if (isDoc) {
        return{
          options: {},
          depth: 0,
          previousUrl: '',
          response: {
            url: crawler._options.url
          },
          redirectChain: [],
          result: {},
          screenshot: null,
          cookies: [],
          links: []
        };
      }

      // The result contains options, links, cookies and etc.
      const result = await crawl();

      if(options.lighthouse) {
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
          locale: options.lang
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
        const categories = ['performance', 'accessibility', 'best-practices', 'seo', 'pwa'];
        const lighthouseData = {
          scores: {}
        }

        const fieldConfigs = []; // для генерации конфига полей

        for (let auditName of audits) {
          if (!data.audits[auditName]) continue;
          lighthouseData[auditName] = parseInt(data.audits[auditName].numericValue);
        }

        for (let categoryId of categories) {
          if(!data.categories[categoryId]) continue;

          // lighthouse.scores
          lighthouseData.scores[categoryId] = parseInt(data.categories[categoryId].score * 100)

          // all audits
          for (let auditRef of data.categories[categoryId].auditRefs) {
            let value;
            const auditName = auditRef.id;
            const audit = data.audits[auditName];

            if (audit.numericValue) value = parseInt(audit.numericValue);
            else value = audit.score;

            lighthouseData[auditName] = value;

            // add to sheet fields
            if (options.fields_preset === 'lighthouse-all') {
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
            }
            if (auditRef.group) {
              const groupTitle = data.categories[categoryId].title + ': ' + data.categoryGroups[auditRef.group].title;
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
      if(result.response.url) result.response.url = decodeURI(result.response.url);

      // console validate output
      // was in onSuccess(), but causes exception on docs
      const msgs = [];
      const validate = validateResults(result, fields); // TODO: fields declared implicitly
      for(let name in validate) {
        const res = validate[name];
        const msgColor = { warning: color.yellow, error: color.red }[res.type];
        msgs.push(`${name}: ${msgColor}${res.msg}${color.reset}`);
      }
      if(msgs.length > 0) console.log(msgs.join(', '));

      // You can access the page object after requests
      result.content = await page.content();
      // You need to extend and return the crawled result
      return result;
    }
  };

  const crawlerOptions = { ...defaultOptions, ...options };









  // start
  const start = Date.now();

  console.log(`${color.yellow}Scrapping ${baseUrl}...${color.reset}`);
  let requestedCount = 0;

  try {
    crawler = await HCCrawler.launch(crawlerOptions);
  } catch(e) {
    console.log(e);
  }

  crawler.on('requeststarted', async options => {
    const queueCount = await crawler.queueSize();
    requestedCount = crawler.requestedCount() + 1;
    if (DEBUG) console.log(`${requestedCount} ${decodeURI(options.url)} (${queueCount})`);
  });
  crawler.on('requestfailed', error => {
    console.error(`${color.red}Failed: ${decodeURI(error.options.url)}${color.reset}`);
  });
  crawler.on('requestdisallowed', options => {
    console.error(`${color.yellow}Disallowed in robots.txt: ${decodeURI(options.url)}${color.reset}`);
  });
  crawler.on('maxdepthreached', options => {
    console.log(`${color.yellow}Max depth reached${color.reset}`);
  });
  crawler.on('maxrequestreached', options => {
    console.log(`\n\n${color.yellow}Max requests reached\nPlease, ignore this error:${color.reset}`);
  });
  await crawler.queue(baseUrl);
  await crawler.onIdle();
  await crawler.close();











  // after scan
  const t = Math.round((Date.now() - start) / 1000);
  const perPage = Math.round((t / requestedCount) * 100) / 100;

  // close lighthouse's chrome
  await chromeLauncher.killAll();;

  const outValidationSummary = () => {
    const sum = getValidationSum();
    if(Object.entries(sum).length === 0) return;
    console.log(`\n\n${color.white}Validation summary:${color.reset}`);
    for(let colName in sum) {
      console.log(`\n${color.white}${colName}:${color.reset}`);
      for(let res of sum[colName]) {
        const msgColor = { warning: color.yellow, error: color.red }[res.type];
        console.log(`${msgColor}${res.msg}${color.reset}\t${res.url}`);
      }
    }
  };

  const finishScan = async () => {
    saveAsXlsx(csvPath, xlsxPath);
    console.log(`\n${color.yellow}Saved to ${xlsxPath}${color.reset}`);

    if (options.json) await saveAsJson(csvPath, jsonPath, options.lang);
    if (options.upload) webPath = await uploadJson(jsonPath, options);

    if (options.web) await publishGoogleSheets(xlsxPath);

    if (options.json) await startViewer(jsonPath, webPath);

    if(options.removeCsv) {
      fs.unlinkSync(csvPath);
    }

    console.log(`Finish: ${t} sec (${perPage} per page)`);

    if(options.openFile) exec(`"${xlsxPath}"`);
  };

  outValidationSummary();

  const tryFinish = async (tries) => {
    try {
      await finishScan()
    } catch (e) {
      if (e.code == 'EBUSY') {
        let msg = `${color.red}${xlsxPath} is busy`;
        if(tries > 0) msg += ', please close file in 10 seconds!';
        console.error(msg);

        if (tries > 0) {
          setTimeout(async () => {
            await tryFinish(tries - 1);
          }, 10000);
        }
      } else {
        console.error(e);
      }
    }
  };

  await tryFinish(finishTries);
};
