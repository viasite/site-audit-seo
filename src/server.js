const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const scrapSite = require("./scrap-site");

const queue = require("queue");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require("http").createServer(app);

initExpress(app);

const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// state
const adapter = new FileSync('data/db.json');
const db = lowdb(adapter);
db.defaults({ state: {} }).write();

// add reboot
const stats = db.get('stats').value() || {};
const reboots = stats.reboots ? stats.reboots + 1 : 1;
db.set('stats.reboots', reboots).write();

const maxConcurrency = 2;
let scansTotal = 0;
let pagesTotal = 0;
let connections = 0;
let q;
const startedTime = Date.now();
initQueue();
io.on("connection", onSocketConnection);






async function onScan(url, args, socket) {
  log(`> site-audit-seo ` + (url ? `-u ${url} ` : '') + args, socket);
  args = args.split(" ");
  if (!url) {
    log("URL not defined!", socket);
    return;
  }

  const program = require("./program");

  // repeat default, cross-scans global!
  delete(program.preset);
  delete(program.concurrency);
  delete(program.lighthouse);
  program.delay = 0;
  delete(program.ignoreRobotsTxt);
  delete(program.followXmlSitemap);
  delete(program.maxDepth);
  delete(program.maxRequests);
  delete(program.language);
  delete(program.influxDbMaxSend);
  
  program.exitOverride();
  try {
    program.parse([...["", ""], ...args]);
  } catch (e) {
    log("failed to parse arguments: " + e.message, socket);
    return;
  }

  await program.postParse();

  const opts = program.getOptions();
  opts.webService = true;
  opts.socket = socket;

  // console.log('opts: ', opts);
  program.outBrief(opts);

  // try {
  if (serverState()['running'] >= maxConcurrency) {
    log('Pending...', socket, true);
  }
  q.push(async function () {
    log(`Start audit: ${url}`, socket, true);
    const res = await scrapSite(url, opts);

    if (res && res.pages) pagesTotal += res.pages;

    // update persistant state
    const stats = db.get('stats').value() || {};
    db.set('stats.pagesTotal', stats.pagesTotal ? stats.pagesTotal + res.pages : res.pages).write();
    db.set('stats.scansTotal', stats.scansTotal ? stats.scansTotal + 1 : 1).write();
    db.write();

    log(`Finish audit: ${url}`, socket, true);
    return res;
  });
}

function initQueue() {
  q = queue({
    concurrency: maxConcurrency,
    autostart: true,
  });
  q.on("success", function (result, job) {
    scansTotal++;
  });
  q.start((err) => {
    if (err) throw err;
    console.log("all done!");
  });
}

function serverState() {
  const stats = db.get('stats').value() || {};

  return {
    running: q.length < maxConcurrency ? q.length : maxConcurrency,
    available: Math.max(0, maxConcurrency - q.length),
    pending: Math.max(0, q.length - maxConcurrency),
    connections: connections,
    scansTotal: scansTotal,
    pagesTotal: pagesTotal,
    scansTotalAll: stats.scansTotal || 0,
    pagesTotalAll: stats.pagesTotal || 0,
    uptime: Math.floor((Date.now() - startedTime) / 1000),
    reboots: reboots,
  }
}

function sendStats(socket) {
  socketSend(socket, "serverState", serverState());
}

function onSocketConnection(socket) {
  log("user connected to server", socket, true);
  connections++;

  submitQueueEvents(socket);

  const interval = setInterval(() => {
    sendStats(socket);
  }, 5000);

  socket.on("auth", (auth) => {
    socket.uid = auth && auth.uid ? auth.uid : "";
    // console.log('socket.uid: ', socket.uid);
    // console.log("auth: ", auth);

    const msg =
      !socket.uid || socket.uid.includes("anon")
        ? "anonymous user: " + auth.uid
        : "user authenticated: " + auth.email;
    log(msg, socket, true);

    sendStats(socket);
  });

  socket.on("scan", ({url, args}) => {
    return onScan(url, args, socket)
  });

  socket.on("disconnect", () => {
    clearInterval(interval);
    connections--;
    console.log("user disconnected");
  });
}

function submitQueueEvents(socket) {
  q.on("success", function (result, job) {
    console.log("job finished processing:", job.toString().replace(/\n/g, ""));
    sendStats(socket);
  });
  q.on("timeout", function (next, job) {
    console.log("job timed out:", job.toString().replace(/\n/g, ""));
    next();
  });
  q.on("start", function (job) {
    console.log("jobs started", job);
    sendStats(socket);
  });
  q.on("error", function (err, job) {
    console.log("error:", err);
    console.log("job:", job);
  });
}

function log(msg, socket, outTime=false) {
  if (outTime) {
    msg = new Date().toTimeString().split(' ')[0] + ' ' + msg;
  }
  console.log(msg);
  socketSend(socket, "status", msg);
}

function socketSend(socket, event, msg) {
  if (socket) {
    // console.log('socket: ' + event, msg);
    // console.log(event + socket.uid + ": ", msg);
    socket.emit(event + (socket.uid || ""), msg);
  }
}

function initExpress(app) {
  // CORS
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/reports", express.static("data/reports"));

  app.get("/", async (req, res) => {
    res.send("site-audit-seo working");
  });

  const port = process.env.PORT || 5301;
  http.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
}
