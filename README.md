![npm](https://img.shields.io/npm/v/sites-scraper) ![npm](https://img.shields.io/npm/dt/sites-scraper)

CLI tool for SEO, scans one or several sites and generate CSV and/or XLSX.

Based on [headless-chrome-crawler](https://github.com/yujiosaka/headless-chrome-crawler) (puppeteer).

Русское описание [ниже](#русский)

## Install:
``` bash
npm install -g sites-scraper
```

#### For linux users
``` bash
npm install -g sites-scraper --unsafe-perm=true
```
After installing on Ubuntu, you may need to change the owner of the Chrome directory from root to user (replace `1000` to your username):
``` bash
chown -R 1000:1000 /usr/lib/node_modules/sites-scraper/node_modules/puppeteer/.local-chromium/

# or
chown -R 1000:1000 /usr/local/lib/node_modules/sites-scraper/node_modules/puppeteer/.local-chromium/
```

Error details [Invalid file descriptor to ICU data received](https://github.com/puppeteer/puppeteer/issues/2519).


## Usage:
```
$ sites-scraper --help
Usage: sites-scraper -u https://example.com

Options:
  -u --urls <urls>             Comma separated url list for scan
  -p, --preset <preset>        Table preset (minimal, seo, headers, parse) (default: "seo")
  -d, --max-depth <depth>      Max scan depth (default: 10)
  -c, --concurrency <threads>  Threads number (default: 2)
  -f, --fields <json>          JSON with custom fields
  --no-skip-static             Scan static files
  --no-limit-domain            Scan not only current domain
  --docs-extensions            Comma-separated extensions that will be add to table, default:doc,docx,xls,xlsx,pdf,rar,zip
  --follow-xml-sitemap         Follow sitemap.xml
  --max-requests <num>         Limit max pages scan (default: 0)
  --no-headless                Show browser GUI while scan
  --no-remove-csv              No delete csv after xlsx generate
  --out-dir <dir>              Output directory (default: ".")
  --no-color                   No console colors
  -V, --version                output the version number
  -h, --help                   display help for command
```

## Features:
- Crawls the entire site, collects links to pages and documents
- Documents with the extensions `doc`,` docx`, `xls`,` xlsx`, `pdf`,` rar`, `zip` are added to the list with a depth == 0
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

### Fields list (19.04.2020):
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
- links
- links_inner
- links_outer
- text_ratio_percent
- dom_size
- html_size


## Custom fields
``` bash
sites-scraper -d 1 -u https://example -f '{ "title": "$(`title`).text()" }'
```
You should pass JSON.

Single quotes `'` should be replaced to `


## Bugs
1. Sometimes it writes identical pages to csv. This happens in 2 cases:  
1.1. Redirect from another page to this (solved by setting `skipRequestedRedirect: true`, hardcoded).  
1.2. Simultaneous request of the same page in parallel threads.  
2. Sometimes a number appears instead of the URL, it occurs at the stage of converting csv to xlsx, don't know why.



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
npm install -g sites-scraper
```

#### Если у вас Ubuntu
``` bash
npm install -g sites-scraper --unsafe-perm=true
```

После установки на Ubuntu может понадобиться поменять владельца папки с Chrome с root на пользователя (замените `1000` на вашего юзера):
``` bash
chown -R 1000:1000 /usr/lib/node_modules/sites-scraper/node_modules/puppeteer/.local-chromium/

# or
chown -R 1000:1000 /usr/local/lib/node_modules/sites-scraper/node_modules/puppeteer/.local-chromium/
```

Подробности ошибки [Invalid file descriptor to ICU data received](https://github.com/puppeteer/puppeteer/issues/2519).


## Кастомные поля
Можно передать дополнительные поля так:
``` bash
sites-scraper -d 1 -u https://example -f '{ "title": "$(`title`).text()" }'
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
