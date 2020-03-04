// see API - https://github.com/yujiosaka/headless-chrome-crawler/blob/master/docs/API.md#event-requeststarted
const HCCrawler = require('headless-chrome-crawler');
const CSVExporter = require('headless-chrome-crawler/exporter/csv');
const url = require('url');

const DEBUG = true; // выключить, если не нужны console.log на каждый запрос (не будет видно прогресс)
const docs = ['doc', 'docx', 'xls', 'xlsx', 'pdf', 'rar', 'zip']; // можно дополнять

// поля описаны в API по ссылке выше
const fields = ['response.url', 'depth']; // стандартный комплект
// const fields = ['response.url', 'depth', 'response.status', 'result.title', 'result.description', 'result.keywords', 'result.canonical', 'result.og_title', 'result.og_image']; // полный комплект
// const fields = ['response.url', 'depth', 'response.headers.content-type', 'response.headers.', 'response.headers.x-bitrix-composite', 'response.headers.x-page-speed', 'response.headers.x-cached-by', 'response.headers.x-drupal-cache']; // http заголовки

let currentUrl = ''; // для хака с документами

module.exports = async (baseUrl, options) => {
  const domain = url.parse(baseUrl).hostname;
  const FILE = `./data/${domain}.csv`; // файл вывода

  const exporter = new CSVExporter({
    file: FILE,
    fields: fields
  });

  const defaultOptions = {
    allowedDomains: [domain], // закомментить, если надо не только этот домен (лучше дописать)
    maxDepth: 10, // макс. глубина
    maxConcurrency: 2, // параллельные потоки
    // maxRequest: 10, // для тестов
    depthPriority: false, // без этой опции сканирует криво, многое не видит
    args: ['--no-sandbox'], // без этого puppeteer зависает
    exporter,

    // сюда дописывать правила игнора url
    preRequest: options => {
      // console.log(options.url);
      if (options.url.match(/\.(jpg|jpeg|png|gif)/)) return false; // картинки
      if (options.url.match(/\?width=\d+&height=\d+/)) return false; // визитки, сотрудники
      if (options.url.includes('?vi=y')) return false; // версия для слабовидящих
      if (options.url.includes('gallery/?page=detail')) return false; // Битрикс Галерея 2.0

      return true;
    },

    evaluatePage: () => ({
      // сюда можно дописывать сборщики данных со страницы
      // поля надо добавить в fields выше
      title: $('title').text(),
      description: $('meta[name="description"]').attr('content'),
      keywords: $('meta[name="keywords"]').attr('content'),
      canonical: $('link[rel="canonical"]').attr('href'),
      og_title: $('meta[property="og:title"]').attr('content'),
      og_image: $('meta[property="og:image"]').attr('content')
    }),

    /* onSuccess: (result => {
          if (!result.result) return; // Dont show result when evaluatePage's result is null
          console.log(`${result.result.title} ${result.options.url}.`);
        }), */

    customCrawl: async (page, crawl) => {
      // You can access the page object before requests
      await page.setRequestInterception(true);
      // это событие срабатывает, когда chrome подгружает статику на странице (и саму страницу)
      page.on('request', request => {
        //console.log('request.url(): ', request.url());

        // don't request image
        if (request.resourceType() == 'image') {
          request.abort();
        } else {
          request.continue();
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
      // You can access the page object after requests
      result.content = await page.content();
      // You need to extend and return the crawled result
      return result;
    }
  };
  crawlerOptions = { ...defaultOptions, ...options };

  const start = Date.now();

  console.log(`Scrapping ${baseUrl}...`);

  const crawler = await HCCrawler.launch(crawlerOptions);
  crawler.on('requeststarted', options => {
    currentUrl = options.url;
    if (DEBUG) console.log(`request ${options.url}`);
  });
  await crawler.queue(baseUrl);
  await crawler.onIdle();

  const t = Math.round((Date.now() - start) / 1000);
  console.log(`Finish: ${t} sec`);
  await crawler.close();
};
