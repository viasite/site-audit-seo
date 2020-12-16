const program = require("./program");
const scrapSite = require("./scrap-site");

const app = require("express")();
const bodyParser = require('body-parser')
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

const port = 3001;

let userSocket;

http.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('status', 'connected to server');
  userSocket = socket;
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post("/scan", async (req, res) => {
  const url = req.body.url;
  const args = req.body.args.split(" ");
  if (!url) {
    userSocket.emit('status', 'URL not defined!')
    return;
  }
  program.parse([...['', ''], ...args]);
  await program.postParse();
  scan(url, program);
  res.send('OK');
});

app.get("/", async (req, res) => {
  const args = reqQueryToArgs(req);
  program.parse(args);
  await program.postParse();
  console.log('program: ', program);

  const url = program.urls[0]; // TODO: support multiple urls queue

  const data = await scan(url, program);


  if (data.webPath) {
    const webViewer = `https://viasite.github.io/site-audit-seo-viewer/?url=${data.webPath}`;
    res.send(`<a target="_blank" href="${webViewer}">${webViewer}</a>`);
  }
  else {
    res.json(data);
  }
});

async function scan(url, program) {
  const opts = {
    fieldsPreset: program.preset,              // варианты: default, seo, headers, minimal
    fieldsExclude: program.exclude,             // исключить поля
    maxDepth: program.maxDepth,                 // глубина сканирования
    maxConcurrency: parseInt(program.concurrency), // параллельно открываемые вкладки
    lighthouse: program.lighthouse,             // сканировать через lighthouse
    delay: parseInt(program.delay),             // задержка между запросами
    skipStatic: program.skipStatic,             // не пропускать подгрузку браузером статики (картинки, css, js)
    followSitemapXml: program.followXmlSitemap, // чтобы найти больше страниц
    limitDomain: program.limitDomain,           // не пропускать подгрузку браузером статики (картинки, css, js)
    urlList: program.urlList,                   // метка, что передаётся страница со списком url
    maxRequest: program.maxRequests,            // для тестов
    headless: program.headless,                 // на десктопе открывает браузер визуально
    docsExtensions: program.docsExtensions,     // расширения, которые будут добавлены в таблицу
    outDir: program.outDir,                     // папка, куда сохраняются csv
    outName: program.outName,                   // имя файла
    color: program.color,                       // раскрашивать консоль
    lang: program.lang,                         // язык
    openFile: program.openFile,                 // открыть файл после сканирования
    fields: program.fields,                     // дополнительные поля, --fields 'title=$("title").text()'
    defaultFilter: program.defaultFilter,       //
    removeCsv: program.removeCsv,               // удалять csv после генерации xlsx
    removeJson: program.removeJson,             // удалять json после поднятия сервера
    xlsx: program.xlsx,                         // сохранять в XLSX
    gdrive: program.gdrive,                     // публиковать на google docs
    json: program.json,                         // сохранять json файл
    upload: program.upload,                     // выгружать json на сервер
    consoleValidate: program.consoleValidate,   // выводить данные валидации в консоль
    obeyRobotsTxt: !program.ignoreRobotsTxt,    // не учитывать блокировки в robots.txt
  };

  opts.webService = true;
  opts.socket = userSocket;

  userSocket.emit('status', `start audit: ${url}`);
  const data = await scrapSite(url, opts);
  socket.emit('status', `finish audit: ${url}`);
  return data;
}

function reqQueryToArgs(req) {
  if (req.query.url) {
    req.query.urls = req.query.url;
    delete(req.query.url);
  }

  const args = [process.argv[0], process.argv[1]];
  for (let reqParam in req.query) {
    for (let opt of program.options) {
      let argNames = []
      argNames.push(opt.long.replace(/^--/, ''));
      if (opt.short) argNames.push(opt.short.replace(/^-/, ''));
      if (opt.negate) {
        for (let i in argNames) {
          argNames[i] = argNames[i].replace(/^no-/, '');
        }
      }

      // add arg as in command line
      if (argNames.includes(reqParam)) {
        args.push('--' + argNames[0]);
        args.push(req.query[reqParam]);
      }
    }
  }
  console.log('args: ', args);
  return args;
}
