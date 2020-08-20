const fieldsLighthouse = require('./fields-lighthouse');
const fields = [
    {
        name: 'url',
        comment: 'URL, который ответил (после редиректа)',
        groups: ['info'],
    },
    {
        name: 'mixed_content_url',
        comment: 'URL по HTTP ссылке',
        validate: {
            error: '== 0'
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
        validate: {
            error: '== 0'
        },
        groups: ['canonical'],
    },
    {
        name: 'previousUrl',
        comment: 'URL, на котором нашли ссылку',
        groups: ['info'],
    },
    {
        name: 'depth',
        comment: 'Глубина сканирования',
        groups: ['info'],
    },
    {
        name: 'status',
        comment: 'Код ответа страницы',
        validate: {
            error: '!= 200'
        },
        groups: ['info'],
    },
    {
        name: 'request_time',
        comment: 'Время отдачи страницы (без js)',
        validate: {
            warning: '> 500',
            error: '> 1000'
        },
        groups: ['perf'],
    },
    {
        name: 'title',
        comment: 'Title страницы',
        /*validate: {
            error: 'len() == 0' // TODO:
        },*/
        groups: ['metatags'],
    },
    {
        name: 'h1',
        comment: 'h1',
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
        comment: 'og_title',
        groups: ['metatags'],
    },
    {
        name: 'og_image',
        comment: 'og_image',
        groups: ['metatags'],
    },
    {
        name: 'schema_types',
        comment: 'Микроформаты schema_types',
        groups: ['metatags'],
    },
    {
        name: 'h1_count',
        comment: 'Кол-во h1 на странице',
        validate: {
            warning: '== 0',
            error: '> 1',
        },
        groups: ['seo'],
    },
    {
        name: 'h2_count',
        comment: 'Кол-во h2 на странице',
        groups: ['seo'],
    },
    {
        name: 'h3_count',
        comment: 'Кол-во h3 на странице',
        groups: ['seo'],
    },
    {
        name: 'h4_count',
        comment: 'Кол-во h4 на странице',
        groups: ['seo'],
    },
    {
        name: 'canonical_count',
        comment: 'Кол-во canonical странице',
        validate: {
            warning: '> 1'
        },
        groups: ['canonical'],
    },
    {
        name: 'images',
        comment: 'img на странице',
        groups: ['content', 'images'],
    },
    {
        name: 'images_without_alt',
        comment: 'img без alt',
        groups: ['content', 'seo', 'images'],
    },
    {
        name: 'images_alt_empty',
        comment: 'img с пустым alt',
        groups: ['seo', 'images'],
    },
    {
        name: 'images_outer',
        comment: 'img на внешние URL',
        groups: ['seo', 'images'],
    },
    {
        name: 'links',
        comment: 'Ссылки',
        groups: ['content', 'links'],
    },
    {
        name: 'links_inner',
        comment: 'Ссылки внутренние',
        groups: ['content', 'links'],
    },
    {
        name: 'links_outer',
        comment: 'Ссылки внешние',
        groups: ['content', 'links'],
    },
    {
        name: 'text_ratio_percent',
        comment: 'Text ratio, отношение текста к html',
        groups: ['content', 'seo'],
    },
    {
        name: 'dom_size',
        comment: 'Кол-во элементов DOM',
        validate: {
            warning: '> 1500',
            error: '> 3000'
        },
        groups: ['perf'],
    },
    {
        name: 'html_size',
        comment: 'Размер HTML, байт',
        validate: {
            warning: '> 1000000'
        },
        groups: ['perf'],
    },

    {
        name: 'lighthouse_scores_performance',
        comment: 'Lighthouse: Производительность',
        groups: ['lighthouse'],
    },
    {
        name: 'lighthouse_scores_pwa',
        comment: 'Lighthouse: PWA',
        groups: ['lighthouse'],
    },
    {
        name: 'lighthouse_scores_accessibility',
        comment: 'Lighthouse: Доступность',
        groups: ['lighthouse'],
    },
    {
        name: 'lighthouse_scores_best-practices',
        comment: 'Lighthouse: Best-practices',
        groups: ['lighthouse'],
    },
    {
        name: 'lighthouse_scores_seo',
        comment: 'Lighthouse: SEO',
        groups: ['lighthouse'],
    },

    {
        name: 'lighthouse_first-contentful-paint',
        // comment: 'First contentful paint',
        validate: {
            warning: '> 2000',
            error: '> 4000',
        },
        groups: ['lighthouse'],
    },
    {
        name: 'lighthouse_speed-index',
        // comment: 'Lighthouse, Performance',
        validate: {
            warning: '> 4300',
            error: '> 5800',
        },
        groups: ['lighthouse'],
    },
    {
        name: 'lighthouse_largest-contentful-paint',
        // comment: 'Lighthouse, Performance',
        validate: {
            warning: '> 2000',
            error: '> 4000',
        },
        groups: ['lighthouse'],
    },
    {
        name: 'lighthouse_scores_interactive',
        // comment: 'Lighthouse, Performance',
        validate: {
            warning: '> 3800',
            error: '> 7300',
        },
        groups: ['lighthouse'],
    },
    {
        name: 'lighthouse_total-blocking-time',
        // comment: 'Lighthouse, Performance',
        validate: {
            warning: '> 300',
            error: '> 600',
        },
        groups: ['lighthouse'],
    },
    {
        name: 'lighthouse_cumulative-layout-shift',
        // comment: 'Lighthouse, Performance',
        validate: {
            warning: '> 100',
            error: '> 250',
        },
        groups: ['lighthouse'],
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
            }
        }
    }
}

// add lh fields
for (let lhf of fieldsLighthouse) {
    if (fields.find(f => f.name == lhf.name)) continue;
    lhf.validate = {
        error: '== 0'
    };
    fields.push(lhf);
}

module.exports = {fields, getFieldByName}