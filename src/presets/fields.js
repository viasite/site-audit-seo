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
    groups: ['canonical'],
    type: 'boolean',
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
  },
  {
    name: 'status',
    comment: 'Код ответа страницы',
    comment_en: 'HTTP answer code',
    validate: {
      error: '!= 200',
    },
    groups: ['info'],
    type: 'integer',
  },
  {
    name: 'request_time',
    comment: 'Время отдачи страницы (без js)',
    comment_en: 'Request time (without js)',
    validate: {
      warning: '> 500',
      error: '> 1000',
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
    groups: ['metatags'],
  },
  {
    name: 'h1',
    comment: 'h1',
    comment_en: 'h1',
    groups: ['seo'],
  },
  {
    name: 'description',
    comment: 'Description',
    /*validate: {
        warning: 'len() > 256',
    },*/
    groups: ['metatags'],
  },
  {
    name: 'keywords',
    comment: 'Keywords',
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
    groups: ['seo'],
    type: 'integer',
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
    groups: ['canonical'],
    type: 'integer',
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
    groups: ['content', 'seo', 'images'],
    type: 'integer',
  },
  {
    name: 'images_alt_empty',
    comment: 'img с пустым alt',
    comment_en: 'img with empty alt',
    groups: ['seo', 'images'],
    type: 'integer',
  },
  {
    name: 'images_outer',
    comment: 'img на внешние URL',
    comment_en: 'img with outer URL',
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
    groups: ['perf'],
    type: 'integer',
  },

  {
    name: 'lighthouse_scores_performance',
    comment: 'Lighthouse: Производительность',
    comment_en: 'Lighthouse: Performance',
    groups: ['Lighthouse: Main'],
    type: 'integer',
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
    name: 'lighthouse_scores_interactive',
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

module.exports = {fields, getFieldByName};
