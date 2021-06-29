const registry = require('../registry');
const fieldsLighthouse = require('./fields-lighthouse');
const fieldsLighthouseEn = require('./fields-lighthouse-en');
const fields = [
  {
    name: 'url',
    comment: 'URL',
    groups: ['info'],
  },
  {
    name: 'mixed_content_url',
    comment: 'URL по HTTP ссылке',
    comment_en: 'URL of mixed content',
    validate: {
      error: '== 0',
    },
    groups: ['info'],
  },
  {
    name: 'canonical',
    comment: 'Canonical URL',
    groups: ['canonical'],
  },
  {
    name: 'is_canonical',
    comment: 'Ссылка совпадает с canonical',
    comment_en: 'Is canonical',
    validate: {
      error: '== 0',
    },
    stat: {
      type: 'enum',
    },
    groups: ['canonical'],
    type: 'boolean',
    filterType: 'enum',
  },
  {
    name: 'previousUrl',
    comment: 'URL, на котором нашли ссылку',
    comment_en: 'Previous URL',
    groups: ['info'],
  },
  {
    name: 'depth',
    comment: 'Глубина сканирования',
    comment_en: 'Scan depth',
    groups: ['info'],
    type: 'integer',
    stat: {
      type: 'enum',
    },
    filterType: 'enum',
  },
  {
    name: 'status',
    comment: 'Код ответа страницы',
    comment_en: 'HTTP answer code',
    validate: {
      error: '!= 200',
    },
    stat: {
      type: 'enum',
    },
    groups: ['info'],
    type: 'integer',
    filterType: 'enum',
  },
  {
    name: 'request_time',
    comment: 'Время отдачи страницы (без js)',
    comment_en: 'Request time (without js)',
    validate: {
      warning: '> 500',
      error: '> 1000',
    },
    stat: {
      type: 'ranges',
      ranges: ['< 100', '100-499', '500-999', '1000-2000', '> 2000']
    },
    groups: ['perf'],
    type: 'integer',
  },
  {
    name: 'title',
    comment: 'Title',
    /*validate: {
        error: 'len() == 0' // TODO:
    },*/
    stat: {
      type: 'unique',
    },
    groups: ['metatags'],
    align: 'right',
  },
  {
    name: 'h1',
    comment: 'h1',
    comment_en: 'h1',
    stat: {
      type: 'unique',
    },
    groups: ['seo', 'metatags'],
  },
  {
    name: 'page_date',
    comment: 'Дата страницы',
    comment_en: 'Page date',
    groups: ['content'],
  },
  {
    name: 'description',
    comment: 'Description',
    /*validate: {
        warning: 'len() > 256',
    },*/
    stat: {
      type: 'unique',
    },
    groups: ['metatags'],
  },
  {
    name: 'keywords',
    comment: 'Keywords',
    stat: {
      type: 'unique',
    },
    groups: ['metatags'],
  },
  {
    name: 'og_title',
    comment: 'og:title',
    groups: ['metatags'],
  },
  {
    name: 'og_image',
    comment: 'og:image',
    groups: ['metatags'],
    type: 'image',
  },
  {
    name: 'schema_types',
    comment: 'Микроформаты schema_types',
    comment_en: 'Schema_types microformats',
    groups: ['metatags'],
  },
  {
    name: 'h1_count',
    comment: 'Кол-во h1 на странице',
    comment_en: 'h1 count',
    validate: {
      warning: '== 0',
      error: '> 1',
    },
    stat: {
      type: 'enum',
    },
    groups: ['seo'],
    type: 'integer',
    filterType: 'enum',
  },
  {
    name: 'h2_count',
    comment: 'Кол-во h2 на странице',
    comment_en: 'h2 count',
    groups: ['seo'],
    type: 'integer',
  },
  {
    name: 'h3_count',
    comment: 'Кол-во h3 на странице',
    comment_en: 'h3 count',
    groups: ['seo'],
    type: 'integer',
  },
  {
    name: 'h4_count',
    comment: 'Кол-во h4 на странице',
    comment_en: 'h4 count',
    groups: ['seo'],
    type: 'integer',
  },
  {
    name: 'canonical_count',
    comment: 'Кол-во canonical на странице',
    comment_en: 'Canonicals on page',
    validate: {
      warning: '> 1',
    },
    stat: {
      type: 'enum',
    },
    groups: ['canonical'],
    type: 'integer',
    filterType: 'enum',
  },
  {
    name: 'google_amp',
    comment_en: 'Google AMP',
    validate: {
      warning: '< 1',
    },
    stat: {
      type: 'enum',
    },
    groups: ['metatags'],
    type: 'integer',
    filterType: 'enum',
  },
  {
    name: 'images',
    comment: 'img на странице',
    comment_en: 'img on page',
    groups: ['content', 'images'],
    type: 'integer',
  },
  {
    name: 'images_without_alt',
    comment: 'img без alt',
    comment_en: 'img without alt',
    validate: {
      warning: '> 0',
    },
    groups: ['content', 'seo', 'images'],
    type: 'integer',
  },
  {
    name: 'images_alt_empty',
    comment: 'img с пустым alt',
    comment_en: 'img with empty alt',
    validate: {
      warning: '> 0',
    },
    groups: ['seo', 'images'],
    type: 'integer',
  },
  {
    name: 'images_outer',
    comment: 'img на внешние URL',
    comment_en: 'img with outer URL',
    validate: {
      warning: '> 0',
    },
    groups: ['seo', 'images'],
    type: 'integer',
  },
  {
    name: 'links',
    comment: 'Ссылки',
    comment_en: 'Links',
    groups: ['content', 'links'],
    type: 'integer',
  },
  {
    name: 'links_inner',
    comment: 'Ссылки внутренние',
    comment_en: 'Links inner',
    groups: ['content', 'links'],
    type: 'integer',
  },
  {
    name: 'links_outer',
    comment: 'Ссылки внешние',
    comment_en: 'Links outer',
    groups: ['content', 'links'],
    type: 'integer',
  },
  {
    name: 'text_ratio_percent',
    comment: 'Text ratio, отношение текста к html',
    comment_en: 'Text ratio',
    groups: ['content', 'seo'],
    validate: {
      warning: '< 5'
    },
    stat: {
      type: 'average',
    },
    type: 'integer',
  },
  {
    name: 'dom_size',
    comment: 'Кол-во элементов DOM',
    comment_en: 'DOM elements count',
    validate: {
      warning: '> 1500',
      error: '> 3000',
    },
    stat: {
      type: 'ranges',
      ranges: ['< 500', '500-1499', '1500-3000', '> 3000']
    },
    groups: ['perf'],
    type: 'integer',
  },
  {
    name: 'html_size',
    comment: 'Размер HTML, байт',
    comment_en: 'HTML size, bytes',
    validate: {
      warning: '> 500000',
      error: '> 1000000',
    },
    stat: {
      type: 'ranges',
      ranges: ['< 100000', '100000-500000', '> 500000']
    },
    groups: ['perf'],
    type: 'integer',
  },

  {
    name: 'lighthouse_scores_performance',
    comment: 'Lighthouse: Производительность',
    comment_en: 'Lighthouse: Performance',
    groups: ['Lighthouse: Main'],
    type: 'integer',
    stat: {
      type: 'ranges',
      ranges: ['< 50', '50-89', '90-100']
    },
  },
  {
    name: 'lighthouse_scores_pwa',
    comment: 'Lighthouse: PWA',
    groups: ['Lighthouse: Main'],
    type: 'integer',
  },
  {
    name: 'lighthouse_scores_accessibility',
    comment: 'Lighthouse: Доступность',
    comment_en: 'Lighthouse: Accessibility',
    groups: ['Lighthouse: Main'],
    type: 'integer',
  },
  {
    name: 'lighthouse_scores_best-practices',
    comment: 'Lighthouse: Best-practices',
    groups: ['Lighthouse: Main'],
    type: 'integer',
  },
  {
    name: 'lighthouse_scores_seo',
    comment: 'Lighthouse: SEO',
    groups: ['Lighthouse: Main'],
    type: 'integer',
  },

  {
    name: 'lighthouse_first-contentful-paint',
    validate: {
      warning: '> 2000',
      error: '> 4000',
    },
    groups: ['Lighthouse: Main'],
    type: 'integer',
  },
  {
    name: 'lighthouse_speed-index',
    validate: {
      warning: '> 4300',
      error: '> 5800',
    },
    groups: ['Lighthouse: Main'],
    type: 'integer',
  },
  {
    name: 'lighthouse_largest-contentful-paint',
    validate: {
      warning: '> 2000',
      error: '> 4000',
    },
    groups: ['Lighthouse: Main'],
    type: 'integer',
  },
  {
    name: 'lighthouse_interactive',
    validate: {
      warning: '> 3800',
      error: '> 7300',
    },
    groups: ['Lighthouse: Main'],
    type: 'integer',
  },
  {
    name: 'lighthouse_total-blocking-time',
    validate: {
      warning: '> 300',
      error: '> 600',
    },
    groups: ['Lighthouse: Main'],
    type: 'integer',
  },
  {
    name: 'lighthouse_cumulative-layout-shift',
    validate: {
      warning: '> 100',
      error: '> 250',
    },
    groups: ['Lighthouse: Main'],
    type: 'integer',
  },
];

function getFieldByName(name) {
  return fields[name] || false;
}

// merge lh fields
for (let fieldInd in fields) {
  const field = fields[fieldInd];
  const lhf = fieldsLighthouse.find(f => f.name == field.name);
  if (lhf) {
    for (let fn of ['comment', 'description', 'groups']) {
      if (!field[fn] && lhf[fn]) field[fn] = lhf[fn];
    }
    fields[fieldInd] = field;
  }

  if (!field.validate) {
    if (field.name.includes('lighthouse_scores')) {
      field.validate = {
        warning: '< 90',
        error: '< 50',
      };
    }
  }
}

// add lh fields
for (let lhf of fieldsLighthouse) {
  if (fields.find(f => f.name == lhf.name)) continue;
  lhf.validate = {
    error: '== 0',
  };

  // add English language
  const en = fieldsLighthouseEn.find(f => f.name === lhf.name);
  if (en) {
    lhf.comment_en = en.comment;
    lhf.description_en = en.description;
    lhf.groups_en = en.groups;
  }

  fields.push(lhf);
}

// plugins fields
const plugins = registry.getPlugins();
for (let plugin of plugins) {
  if (plugin.fields) for(let field of plugin.fields) {
    if (typeof field === 'string') {
      fields.push({
        name: field,
        groups: [plugin.name]
      });
    } else {
      fields.push(field);
    }
    // console.log(`push ${field}`);
  }
}


module.exports = {fields, getFieldByName};
