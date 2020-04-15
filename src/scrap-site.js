// see API - https://github.com/yujiosaka/headless-chrome-crawler/blob/master/docs/API.md#event-requeststarted
const fs = require('fs');
const iconv = require('iconv-lite');
const HCCrawler = require('headless-chrome-crawler');
const CSVExporter = require('headless-chrome-crawler/exporter/csv');
const url = require('url');

const DEBUG = true; // выключить, если не нужны console.log на каждый запрос (не будет видно прогресс)
const docs = ['doc', 'docx', 'xls', 'xlsx', 'pdf', 'rar', 'zip']; // можно дополнять

// запреты браузеру на подгрузку статики, ускоряет
let SKIP_IMAGES = true;
let SKIP_CSS = true;
let SKIP_JS = true;

// поля описаны в API по ссылке выше
const fields_presets = {
  default: ['response.url', 'depth'],
  minimal: ['response.url'],
  seo: [
    'response.url',
    'result.canonical',
    'result.is_canonical',
    'previousUrl',
    'result.mixed_content_url',
    'depth',
    'response.status',
    'result.request_time',
    'result.title',
    'result.h1',
    'result.description',
    'result.keywords',
    'result.og_title',
    'result.og_image',
    'result.h1_count',
    'result.h2_count',
    'result.h3_count',
    'result.h4_count',
    'result.images',
    'result.images_without_alt',
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
  ]
};

module.exports = async (baseUrl, options = {}) => {
  const domain = url.parse(baseUrl).hostname;
  const protocol = url.parse(baseUrl).protocol;
  const FILE = `./data/${domain}.csv`; // файл вывода
  let currentUrl = ''; // для хака с документами

  if (!options.fields_preset || !fields_presets[options.fields_preset]){
    options.fields_preset = 'default';
  }
  const fields = fields_presets[options.fields_preset];

  if (options.skip_static !== undefined) {
    SKIP_IMAGES = SKIP_CSS = SKIP_JS = options.skip_static;
  }

  const exporter = new CSVExporter({
    file: FILE,
    fields: fields,
    separator: ';'
  });

  const defaultOptions = {
    allowedDomains: [domain], // закомментить, если надо не только этот домен (лучше дописать)
    maxDepth: 10, // макс. глубина
    maxConcurrency: 2, // параллельные потоки
    skipRequestedRedirect: true, // все редиректы помечаются как посещённые
    depthPriority: false, // без этой опции сканирует криво, многое не видит
    args: ['--no-sandbox'], // без этого puppeteer зависает
    exporter,
    encoding: 'utf-8',

    // сюда дописывать правила игнора url
    preRequest: options => {
      // console.log(options.url);
      if (options.url.match(/\.(jpg|jpeg|png|gif)/i)) return false; // картинки
      if (options.url.match(/\?width=\d+&height=\d+/)) return false; // визитки, сотрудники
      if (options.url.includes('?vi=y')) return false; // версия для слабовидящих
      if (options.url.includes('gallery/?page=detail')) return false; // Битрикс Галерея 2.0
      if (options.url.includes('/?display=')) return false; // Аспро: вид списка
      if (options.url.includes('redirect.php')) return false; // bitrix redirect
      if (options.url.includes('rk.php')) return false; // bitrix rk
      if (options.url.includes('/?catalog_view=')) return false; // bitrix display
      if (options.url.includes('/?SORT=')) return false; // bitrix sort
      if (options.url.includes('/filter/clear/apply/')) return false; // bitrix filter

      return true;
    },

    // сюда можно дописывать сборщики данных со страницы
    // поля надо добавить в fields выше
    evaluatePage: () => {
      try {
        let domainParts = location.host.split('.');
        const domain2level = domainParts.slice(domainParts.length-2).join('.');
        return {
          request_time:
            window.performance.timing.responseEnd - window.performance.timing.requestStart,
          title: $('title').text(),
          h1: $('h1').text().trim(),
          h1_count: $('h1').length,
          h2_count: $('h2').length,
          h3_count: $('h3').length,
          h4_count: $('h4').length,
          dom_size: document.getElementsByTagName('*').length,
          head_size: document.head.innerHTML.length,
          body_size: document.body.innerHTML.length,
          html_size: document.head.innerHTML.length + document.body.innerHTML.length,
          text_ratio_percent: Math.round(document.body.innerText.length / document.body.innerHTML.length * 100),
          images: $('img').length,
          images_without_alt: $('img:not([alt]').length,
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
          canonical: $('link[rel="canonical"]').attr('href'),
          is_canonical: $('link[rel="canonical"]').attr('href') == window.location.href ? 1 : 0,
          og_title: $('meta[property="og:title"]').attr('content'),
          og_image: $('meta[property="og:image"]').attr('content')
        };
      } catch (e) {
        return {
          error: JSON.stringify(e)
        };
      }
    },

    onSuccess: result => {
      if (!result.result) return;
      if (result.result.error) console.error('Error collect page data:', result.result.error);
      // console.log(`html_size: ${result.result.html_size}`);
    },

    customCrawl: async (page, crawl) => {
      // You can access the page object before requests
      await page.setRequestInterception(true);
      await page.setBypassCSP(true);

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

        if (SKIP_IMAGES && request.resourceType() == 'image') {
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
          console.error('mixed content: ', request.url());
        }
      });

      // костыль, который возвращает фейково обойдённый документ, если он признан документом
      // нужно, чтобы доки не сканировались (выдают ошибку), но при этом добавлялись в csv
      // т.к. в этом контексте нет текущего урла, он задаётся в глобал через событие requeststarted
      const isDoc = docs.some(ext => currentUrl.includes(`.${ext}`));
      if (isDoc) {
        return {
          options: {},
          depth: 0,
          previousUrl: '',
          response: {
            url: currentUrl
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

      result.result.mixed_content_url = mixedContentUrl;
      // You can access the page object after requests
      result.content = await page.content();
      // You need to extend and return the crawled result
      return result;
    }
  };
  const crawlerOptions = { ...defaultOptions, ...options };

  const start = Date.now();

  console.log(`Scrapping ${baseUrl}...`);
  let requestedCount = 0;

  const crawler = await HCCrawler.launch(crawlerOptions);
  crawler.on('requeststarted', async options => {
    currentUrl = options.url.toLowerCase();
    const queueCount = await crawler.queueSize();
    requestedCount = crawler.requestedCount() + 1;
    if (DEBUG) console.log(`${requestedCount} ${options.url} (${queueCount})`);
  });
  crawler.on('requestfailed', error => {
    console.error(`Failed: ${error.options.url}`);
  });
  crawler.on('requestdisallowed', options => {
    console.error(`Disallowed in robots.txt: ${options.url}`);
  });
  crawler.on('maxdepthreached', options => {
    console.log(`Max depth reached`);
  });
  await crawler.queue(baseUrl);
  await crawler.onIdle();

  const t = Math.round((Date.now() - start) / 1000);
  const perPage = Math.round((t / requestedCount) * 100) / 100;
  console.log(`Finish: ${t} sec (${perPage} per page)`);
  await crawler.close();

  if (crawlerOptions.encoding.toLowerCase() != 'utf-8') {
    const csvRaw = fs.readFileSync(FILE, 'utf-8');
    fs.writeFileSync(FILE, iconv.encode(csvRaw, crawlerOptions.encoding));
  }
};
