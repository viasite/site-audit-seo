[![npm](https://img.shields.io/npm/v/site-audit-seo)](https://www.npmjs.com/package/site-audit-seo) [![npm](https://img.shields.io/npm/dt/site-audit-seo)](https://www.npmjs.com/package/site-audit-seo)

CLI tool for SEO site audit, crawl site, output to console, csv and xlsx.

Scraper can scan one or several sites at once.

Based on [headless-chrome-crawler](https://github.com/yujiosaka/headless-chrome-crawler) (puppeteer). Used forked version [@popstas/headless-chrome-crawler](https://github.com/popstas/headless-chrome-crawler)

Русское описание [ниже](#русский)

## Install:
``` bash
npm install -g site-audit-seo
```

#### For linux users
``` bash
npm install -g site-audit-seo --unsafe-perm=true
```
After installing on Ubuntu, you may need to change the owner of the Chrome directory from root to user (replace `1000` to your username):
``` bash
chown -R 1000:1000 /usr/lib/node_modules/site-audit-seo/node_modules/puppeteer/.local-chromium/

# or
chown -R 1000:1000 /usr/local/lib/node_modules/site-audit-seo/node_modules/puppeteer/.local-chromium/
```

Error details [Invalid file descriptor to ICU data received](https://github.com/puppeteer/puppeteer/issues/2519).


## Usage:
```
$ site-audit-seo --help
Usage: site-audit-seo -u https://example.com

Options:
  -u --urls <urls>             Comma separated url list for scan
  -p, --preset <preset>        Table preset (minimal, seo, headers, parse) (default: "seo")
  -d, --max-depth <depth>      Max scan depth (default: 10)
  -c, --concurrency <threads>  Threads number (default: 2)
  --delay <ms>                 Delay between requests (default: 0)
  -f, --fields <json>          JSON with custom fields
  --no-skip-static             Scan static files
  --no-limit-domain            Scan not only current domain
  --docs-extensions            Comma-separated extensions that will be add to table,
                               default:doc,docx,xls,xlsx,ppt,pptx,pdf,rar,zip
  --follow-xml-sitemap         Follow sitemap.xml
  --ignore-robots-txt          Ignore disallowed in robots.txt
  -m, --max-requests <num>     Limit max pages scan (default: 0)
  --no-headless                Show browser GUI while scan
  --no-remove-csv              No delete csv after xlsx generate
  --out-dir <dir>              Output directory (default: ".")
  --csv <path>                 Skip scan, only convert csv to xlsx
  --no-color                   No console colors
  --no-console-validate        Don't output validate messages in console
  -V, --version                output the version number
  -h, --help                   display help for command
```

## Features:
- Crawls the entire site, collects links to pages and documents
- Documents with the extensions `doc`,` docx`, `xls`,` xlsx`, `ppt`,` pptx`, `pdf`,` rar`, `zip` are added to the list with a depth == 0
- Search pages with SSL mixed content
- Each site is saved to a file with a domain name
- Does not follow links outside the scanned domain (configurable)
- Does not load images, css, js (configurable)
- Some URLs are ignored ([`preRequest` in `src/scrap-site.js`](src/scrap-site.js#L112))

### XLSX features
- The first row and the first column are fixed
- Column width and auto cell height are configured for easy viewing
- URL, title, description and some other fields are limited in width
- Title is right-aligned to reveal the common part
- Validation of some columns (status, request time, description length)

### Fields list (20.04.2020):
- url
- mixed_content_url
- canonical
- is_canonical
- previousUrl
- depth
- status
- request_time
- title
- h1
- description
- keywords
- og_title
- og_image
- schema_types
- h1_count
- h2_count
- h3_count
- h4_count
- images
- images_without_alt
- images_alt_empty
- images_outer
- links
- links_inner
- links_outer
- text_ratio_percent
- dom_size
- html_size


## Custom fields
``` bash
site-audit-seo -d 1 -u https://example -f '{ "title": "$(`title`).text()" }'
```
You should pass JSON.

Single quotes `'` should be replaced to `


## Bugs
1. Sometimes it writes identical pages to csv. This happens in 2 cases:  
1.1. Redirect from another page to this (solved by setting `skipRequestedRedirect: true`, hardcoded).  
1.2. Simultaneous request of the same page in parallel threads.  
2. Sometimes a number appears instead of the URL, it occurs at the stage of converting csv to xlsx, don't know why.


## Free audit tools alternatives
- [WebSite Auditor (Link Assistant)](https://www.link-assistant.com/) - desktop app, 500 pages
- [Screaming Frog SEO Spider](https://www.screamingfrog.co.uk/seo-spider/) - desktop app, same as site-audit-seo, 500 pages
- [Seobility](https://www.seobility.net/) - 1 project up to 1000 pages free
- [Neilpatel (Ubersuggest)](https://app.neilpatel.com/) - 1 project, 150 pages
- [Semrush](https://semrush.com/) - 1 project, 100 pages per month free
- [Seoptimer](https://www.seoptimer.com/) - good for single page analysis


## Free data scrapers
- [Web Scraper](https://webscraper.io/) - free for local use extension
- [Portia](https://github.com/scrapinghub/portia) - self-hosted visual scraper builder, scrapy based
- [Crawlab](https://github.com/crawlab-team/crawlab) - distributed web crawler admin platform, self-hosted with Docker
- [OutWit Hub](https://www.outwit.com/#hub) - free edition, pro edition for $99
- [Octoparse](https://www.octoparse.com/) - 10 000 records free
- [Parsers.me](https://parsers.me/) - 1 000 pages per run free
- [website-scraper](https://www.npmjs.com/package/website-scraper) - opensource, CLI, download site to local directory
- [website-scraper-puppeteer](https://www.npmjs.com/package/website-scraper-puppeteer) - same but puppeteer based
- [Gerapy](https://github.com/Gerapy/Gerapy) - distributed Crawler Management Framework Based on Scrapy, Scrapyd, Django and Vue.js

## Русский
Сканирование одного или несколько сайтов в файлы csv и xlsx.

## Особенности:
- Обходит весь сайт, собирает ссылки на страницы и документы
- Документы с расширениями `doc`, `docx`, `xls`, `xlsx`, `pdf`, `rar`, `zip` добавляются в список с глубиной 0
- Поиск страниц с SSL mixed content
- Каждый сайт сохраняется в файл с именем домена
- Не ходит по ссылкам вне сканируемого домена (настраивается)
- Не загружает картинки, css, js (настраивается)
- Некоторые URL игнорируются ([`preRequest` в `src/scrap-site.js`](src/scrap-site.js#L112))

### Особенности XLSX:
- Первый ряд и первая колонка закрепляются
- Ширина колонок и автоматическая высота ячеек настроены для удобного просмотра
- URL, title, description и некоторые другие поля ограничены по ширине
- Title выравнивается по правому краю для выявления общей части
- Валидация некоторых колонок (status, request time, description length)

## Установка:
``` bash
npm install -g site-audit-seo
```

#### Если у вас Ubuntu
``` bash
npm install -g site-audit-seo --unsafe-perm=true
```

После установки на Ubuntu может понадобиться поменять владельца папки с Chrome с root на пользователя (замените `1000` на вашего юзера):
``` bash
chown -R 1000:1000 /usr/lib/node_modules/site-audit-seo/node_modules/puppeteer/.local-chromium/

# or
chown -R 1000:1000 /usr/local/lib/node_modules/site-audit-seo/node_modules/puppeteer/.local-chromium/
```

Подробности ошибки [Invalid file descriptor to ICU data received](https://github.com/puppeteer/puppeteer/issues/2519).


## Кастомные поля
Можно передать дополнительные поля так:
``` bash
site-audit-seo -d 1 -u https://example -f '{ "title": "$(`title`).text()" }'
```
Надо передавать JSON.

Одинарные кавычки `'` в команде надо менять на ` 


## Как посчитать контент по csv
1. Открыть в блокноте
2. Документы посчитать поиском `,0`
3. Листалки исключить поиском `?`
4. Вычесть 1 (шапка)


## Баги
1. Иногда пишет в csv одинаковые страницы. Это бывает в 2 случаях:  
1.1. Редирект с другой страницы на эту (решается установкой `skipRequestedRedirect: true`, сделано).  
1.2. Одновременный запрос одной и той же страницы в параллельных потоках.  
2. Иногда вместо URL появляется цифра, происходит на этапе конвертации csv в xlsx, не знаю почему.


## TODO:
- Unique links
- Scraper freezes when scrap doc in 2 threads
- [Offline w3c validation](https://www.npmjs.com/package/html-validator)
- [Words count](https://github.com/IonicaBizau/count-words)
- [Sentences count](https://github.com/NaturalNode/natural)
- External follow links
- Broken images
