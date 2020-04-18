Сканирование одного или несколько сайтов в файлы csv и xlsx.

XLSX файл оформляется для удобного просмотра, подсвечиваются некоторые ошибки, найденные при сканировании.

## Особенности:
- Обходит весь сайт, собирает ссылки на страницы и документы
- Выгружает поля url и глубина, на которой найден url
- Документы с расширениями `doc`, `docx`, `xls`, `xlsx`, `pdf`, `rar`, `zip` добавляются в список с глубиной 0
- Поиск страниц с SSL mixed content
- Каждый сайт сохраняется в файл с именем домена
- Скрипт не ходит по ссылкам вне сканируемого домена
- Глубина по умолчанию 10
- По умолчанию сканирует в 2 потока
- Не загружает картинки, css, js (настраивается)
- Не считает урлы с ?width=123&height=123

## Установка:
```
npm install -g sites-scraper
```

#### Если у вас Ubuntu
```
npm install -g sites-scraper --unsafe-perm=true
```

После установки на Ubuntu может понадобиться поменять владельца папки с Chrome с root на пользователя:
```
chown -R 1000:1000 /usr/lib/node_modules/sites-scraper/node_modules/puppeteer/.local-chromium/
# or
chown -R 1000:1000 /usr/local/lib/node_modules/sites-scraper/node_modules/puppeteer/.local-chromium/
```
Подробности ошибки [Invalid file descriptor to ICU data received](https://github.com/puppeteer/puppeteer/issues/2519).

#### Локальная установка
```
git clone https://github.com/viasite/sites-scraper

cd sites-scraper
npm install
npm start
```

## Использование:
```
$ sites-scraper --help
Usage: sites-scraper -u https://example.com

Options:
  -u --urls <urls>         Comma separated url list for scan
  -p, --preset <preset>    Table preset (minimal, seo, headers, parse) (default: "seo")
  -d, --max-depth <depth>  Max scan depth (default: 10)
  -c, --concurrency        Threads number
  -f, --fields <json>      JSON with custom fields
  --no-skip-static         Scan static files
  --no-limit-domain        Scan not only current domain
  --docs-extensions        Docs extensions (comma-separated) that will be add to table, default:doc,docx,xls,xlsx,pdf,rar,zip
  --follow-xml-sitemap     Follow sitemap.xml
  --max-requests <num>     Limit max pages scan (default: 0)
  --no-headless            Show browser GUI while scan
  --no-remove-csv          No delete csv after xlsx generate
  --out-dir <dir>          Output directory (default: ".")
  --no-color               No console colors
  -V, --version            output the version number
  -h, --help               display help for command
```

## Кастомные поля
Можно передать дополнительные поля так:
```
sites-scraper -d 1 -u https://example -f '{ "title": "$(`title`).text()" }'
```
Надо передавать JSON.

Одинарные кавычки в команде надо менять на ` 


## Как посчитать контент по csv
1. Открыть в блокноте
2. Документы посчитать поиском `,0`
3. Листалки исключить поиском `?`
4. Вычесть 1 (шапка)

## Баги
Иногда пишет в csv одинаковые страницы. Это бывает в 2 случаях: 
1. Редирект с другой страницы на эту (решается установкой `skipRequestedRedirect: true`, сделано).
2. Одновременный запрос одной и той же страницы в параллельных потоках.
3. Иногда вместо URL появляется цифра, происходит на этапе конвертации csv в xlsx.

## TODO:
- Unique links
