const program = require("./program");
const scrapSite = require("./scrap-site");

const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});

const port = process.env.PORT || 5301;

let userSocket;

function log(msg) {
  console.log(msg);
  if (userSocket) userSocket.emit('status', msg);
}

io.on('connection', (socket) => {
  userSocket = socket;
  log('user connected to server');
  socket.on('disconnect', () => {
    userSocket = null;
    console.log('user disconnected');
  });
});

http.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

// CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/reports', express.static('data/reports'));

app.post("/scan", async (req, res) => {
  const url = req.body.url;
  const args = req.body.args.split(" ");
  if (!url) {
    userSocket.emit('status', 'URL not defined!')
    return;
  }
  program.parse([...['', ''], ...args]);
  await program.postParse();

  const opts = program.getOptions();
  opts.webService = true;
  opts.socket = userSocket;

  program.outBrief(opts);

  scan(url, opts);
  res.send('OK');
});

app.get("/", async (req, res) => {
  const args = reqQueryToArgs(req);
  program.parse(args);
  await program.postParse();

  const opts = program.getOptions();
  opts.webService = true;
  opts.socket = userSocket;

  program.outBrief(opts);

  const url = program.urls[0]; // TODO: support multiple urls queue

  // try {
    const data = await scan(url, opts);
    if (data.webPath) {
      const webViewer = `https://viasite.github.io/site-audit-seo-viewer/?url=${data.webPath}`;
      res.send(`<a target="_blank" href="${webViewer}">${webViewer}</a>`);
    }
    else {
      res.json(data);
    }
  // }
  /* catch(e) {
    console.warn(e.message)
  }; */
});

async function scan(url, opts) {
  if (userSocket) userSocket.emit('status', `start audit: ${url}`);
  const data = await scrapSite(url, opts);
  if (userSocket) userSocket.emit('status', `finish audit: ${url}`);
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
