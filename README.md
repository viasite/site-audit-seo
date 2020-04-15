Сканирование одного или несколько сайтов в файлы csv.

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
  -p, --preset <preset>    Table preset (default: "seo")
  -d, --max-depth <depth>  Max scan depth (default: 10)
  -c, --concurrenty        Threads number
  --no-skip-static         Scan static files
  --follow-xml-sitemap     Follow sitemap.xml
  --max-requests <num>     Limit max pages scan (default: 0)
  --no-headless            Show browser GUI while scan
  --encoding <enc>         Result csv encoding (default: "win1251")
  --out-dir <dir>          Output directory (default: ".")
  -V, --version            output the version number
  -h, --help               display help for command
```

## Как посчитать контент по csv
1. Открыть в блокноте
2. Документы посчитать поиском `,0`
3. Листалки исключить поиском `?`
4. Вычесть 1 (шапка)

## Баги
Иногда пишет в csv одинаковые страницы. Это бывает в 2 случаях: 
1. Редирект с другой страницы на эту (решается установкой `skipRequestedRedirect: true`, сделано).
2. Одновременный запрос одной и той же страницы в параллельных потоках.

## TODO:
- Не учитывать страницы ?page= , но сканировать
- Unique links
