// see API - https://github.com/yujiosaka/headless-chrome-crawler/blob/master/docs/API.md#event-requeststarted
const fs = require('fs');
const xlsx = require('xlsx-style');
const xlsxOrig = require('xlsx');
const HCCrawler = require('headless-chrome-crawler');
const CSVExporter = require('headless-chrome-crawler/exporter/csv');
const url = require('url');

const DEBUG = true; // выключить, если не нужны console.log на каждый запрос (не будет видно прогресс)
const docs = ['doc', 'docx', 'xls', 'xlsx', 'pdf', 'rar', 'zip']; // можно дополнять

const color = {
  reset: '\x1b[0m',
  white: '\x1b[37m',
  yellow: '\x1b[33m',
  red: '\x1b[31m'
};

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
    'result.images',
    'result.images_without_alt',
    'result.images_alt_empty',
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
  ]
};

// validation functions for fields for xlsx
const fields_validate = {
  mixed_content: {
    error: (v) => !!v
  },
  is_canonical: {
    error: (v) => v == 0
  },
  request_time: {
    warning: (v) => v > 500,
    error: (v) => v > 1000
  },
  status: {
    error: (v) => v != 200
  },
  description: {
    warning: (v) => v.length > 256
  },
  h1_count: {
    error: (v) => v > 1
  },
  dom_size: {
    warning: (v) => v > 1500,
    error: (v) => v > 3000
  },
  html_size: {
    warning: (v) => v > 1000000
  }
}

module.exports = async (baseUrl, options = {}) => {
  const domain = url.parse(baseUrl).hostname;
  const protocol = url.parse(baseUrl).protocol;
  const csvPath = `${options.outDir}/${domain}.csv`; // файл вывода
  const xlsxPath = `${options.outDir}/${domain}.xlsx`; // файл вывода
  let currentUrl = ''; // для хака с документами

  if(!options.color) color.white = color.red = color.reset = color.yellow = '';

  if (!options.fields_preset || !fields_presets[options.fields_preset]){
    options.fields_preset = 'default';
  }
  let fields = fields_presets[options.fields_preset];

  if(options.fields) {
    //console.log('options.fields: ', options.fields);
    fields = [...Object.keys(options.fields).map(f => 'result.' + f), ...fields];
  }

  if (options.skip_static !== undefined) {
    SKIP_IMAGES = SKIP_CSS = SKIP_JS = options.skip_static;
  }

  const exporter = new CSVExporter({
    file: csvPath,
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
          dom_size: document.getElementsByTagName('*').length,
          head_size: document.head.innerHTML.length,
          body_size: document.body.innerHTML.length,
          html_size: document.head.innerHTML.length + document.body.innerHTML.length,
          text_ratio_percent: Math.round(document.body.innerText.length / document.body.innerHTML.length * 100),
          images: $('img').length,
          images_without_alt: $('img:not([alt]').length,
          images_alt_empty: $('img[alt=""]').length,
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
          is_canonical: canonical ? (canonical == window.location.href ? 1 : 0) : '',
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

    customCrawl: async (page, crawl) => {
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
          console.error(`${color.red}mixed content: ${request.url()}${color.reset}`);
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

  console.log(`${color.yellow}Scrapping ${baseUrl}...${color.reset}`);
  let requestedCount = 0;

  const crawler = await HCCrawler.launch(crawlerOptions);
  crawler.on('requeststarted', async options => {
    currentUrl = options.url.toLowerCase();
    const queueCount = await crawler.queueSize();
    requestedCount = crawler.requestedCount() + 1;
    if (DEBUG) console.log(`${requestedCount} ${options.url} (${queueCount})`);
  });
  crawler.on('requestfailed', error => {
    console.error(`${color.red}Failed: ${error.options.url}${color.reset}`);
  });
  crawler.on('requestdisallowed', options => {
    console.error(`${color.yellow}Disallowed in robots.txt: ${options.url}${color.reset}`);
  });
  crawler.on('maxdepthreached', options => {
    console.log(`${color.yellow}Max depth reached${color.reset}`);
  });
  await crawler.queue(baseUrl);
  await crawler.onIdle();

  const t = Math.round((Date.now() - start) / 1000);
  const perPage = Math.round((t / requestedCount) * 100) / 100;
  await crawler.close();

  const saveAsXlsx = () => {
    // limit max column width
    const colWidths = {
      url: 60,
      h1: 100,
      title: 100,
      description: 100,
      keywords: 60,
      og_title: 100,
    }

    // styles presets for validation
    const styles = {
      warning: {
        font: {
          color: { rgb: "FFA09600" }
        }
      },
      error: {
        font: {
          color: { rgb: "FFFF0000" }
        }
      }
    }

    // styles presets for columns
    const colStyles = {
      title: {
        alignment: {
          horizontal: 'right'
        }
      },
      description: {
        alignment: {
          wrapText: true,
          indent: true
        }
      },
      keywords: {
        alignment: {
          wrapText: true,
          indent: true
        }
      }
    }

    const colNames = {};

    // read csv to workbook
    const csvRaw = fs.readFileSync(csvPath, 'utf-8');
    // xlsx-style cannot read csv
    const wb = xlsxOrig.read(csvRaw, {type: 'string'});
    const ws = wb.Sheets[wb.SheetNames[0]];

    const range = xlsx.utils.decode_range(ws['!ref']);
    const cols = [];

    // iterate rows
    for(let r = 0; r <= range.e.r; r++){
      // iterate cols
      for(let c = 0; c <= range.e.c; c++) {
        const addr = xlsx.utils.encode_cell({r:r, c:c});
        if(!ws[addr]) continue;
        const colVal = ws[addr].v

        // header
        if(r == 0) {
          const colName = colVal.replace('result.', '').replace('response.', '');
          ws[addr].v = colName
          if(colName) {
            cols[c] = colName.length;
            colNames[c] = colName;
          }
        }

        // columns width
        const length = Object.values(colVal).length;
        if(!cols[c]) cols[c] = length;
        else cols[c] = Math.max(cols[c], length);

        // not applicable to first row
        if(r == 0) continue;

        const colName = colNames[c];

        // limit width
        if(colWidths[colName]) cols[c] = Math.min(colWidths[colName], cols[c]);

        // cell style
        if(colStyles[colName]) ws[addr].s = colStyles[colName];

        // url
        // if(colName == 'url')  ws[addr].l = colVal;

        // validation
        if(r > 0){
          if(fields_validate[colName]){
            if(fields_validate[colName].warning && fields_validate[colName].warning(colVal)) ws[addr].s = styles.warning;
            if(fields_validate[colName].error && fields_validate[colName].error(colVal)) ws[addr].s = styles.error;
          }
        }
      }
    }
    const colsObj = cols.map(length => { return {wch: length} });
    ws['!cols'] = colsObj;

    // fix first row and first column
    ws['!freeze'] = { xSplit: "1", ySplit: "1", topLeftCell: "B2", activePane: "bottomRight", state: "frozen" };
    
    // work only on official sheetjs (without styles) and only in MS Office
    // ws['!autofilter'] = { ref: ws['!ref'] };

    xlsx.writeFile(wb, xlsxPath);
    if(options.removeCsv) {
      fs.unlinkSync(csvPath);
    }
  }

  saveAsXlsx();

  console.log(`${color.yellow}Saved to ${xlsxPath}${color.reset}`);
  console.log(`Finish: ${t} sec (${perPage} per page)`);
};
