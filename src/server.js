const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const scrapSite = require("./scrap-site");

const queue = require("queue");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require("http").createServer(app);
const serveIndex = require('serve-index');

// SLack integration
if (process.env.SLACK_SIGNING_SECRET !== '') {
  const { createMessageAdapter } = require('@slack/interactive-messages');
  const { createEventAdapter } = require('@slack/events-api');
  const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);
  const slackInteractions = createMessageAdapter(process.env.SLACK_SIGNING_SECRET);
}

if (process.env.SLACK_TOKEN !== '' && process.env.SLACK_CONVERSATION_ID !== '') {
  const { WebClient } = require('@slack/web-api');
  // An access token (from your Slack app or custom integration - xoxp, xoxb)
  const slackToken = process.env.SLACK_TOKEN;
  const slackWeb = new WebClient(slackToken);
  // This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
  const slackConversationId = process.env.SLACK_CONVERSATION_ID;
}

initExpress(app);

const prefix_url = process.env.PREFIX_URL || "";
const data_dir = process.env.DATA_DIR || "/app/data";

const io = require("socket.io")(http, {
  path: prefix_url + "/socket.io",  
  cors: {
    origin: ["https://metrix.evolutive.group"],
    allowedHeaders: ["*/*"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// state
const adapter = new FileSync(data_dir+'/db.json');
const db = lowdb(adapter);
db.defaults({ state: {} }).write();

// add reboot
const stats = db.get('stats').value() || {};
const reboots = stats.reboots ? stats.reboots + 1 : 1;
db.set('stats.reboots', reboots).write();

const maxConcurrency = 64;
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
  // TODO: remove
  delete(program.preset);
  delete(program.exclude);
  delete(program.maxDepth);
  delete(program.concurrency);
  delete(program.lighthouse);

  program.delay = 0;
  program.skipStatic = false;
  delete(program.followXmlSitemap);
  delete(program.ignoreRobotsTxt);
  program.limitDomain = true;
  delete(program.urlList);
  delete(program.maxRequests);
  program.headless = true;
  delete(program.docsExtensions);
  program.outDir = data_dir+'/site-audit-seo/';
  delete(program.outName);
  program.color = true;

  delete(program.lang);
  delete(program.openFile);
  program.fields = [];
  delete(program.defaultFilter);
  delete(program.removeCsv);
  delete(program.removeJson);
  delete(program.xlsx);
  delete(program.gdrive);
  delete(program.json);
  delete(program.upload);
  delete(program.consoleValidate);
  delete(program.influxdb);
  delete(program.urls);

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
    console.log('socket.uid: ', socket.uid);
    console.log("auth: ", auth);
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

if(typeof slackEvents !== 'undefined') {  
  // Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
  slackEvents.on('message', (event) => {
    console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
  });

  // Handle errors (see `errorCodes` export)
  slackEvents.on('error', console.error);
}

if(typeof slackWeb !== 'undefined' && typeof slackConversationId !== 'undefined' ) {
  (async () => {
    // See: https://api.slack.com/methods/chat.postMessage
    const res = await slackWeb.chat.postMessage({ channel: slackConversationId, text: 'Hello there' });
    // `res` contains information about the posted message
    console.log('Message sent: ', res.ts);
  })();
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

  const prefix_url = process.env.PREFIX_URL || "";
  const data_dir = process.env.DATA_DIR || "/app/data";

  // Attach the event adapter to the express app as a middleware
  if(typeof slackEvents !== 'undefined') {
    app.use('/slack/events', slackEvents.expressMiddleware());
  }

  // Serve URLs like /ftp/thing as public/ftp/thing
  // The express.static serves the file contents
  // The serveIndex is this module serving the directory
  app.use(`${prefix_url}/reports/`, express.static(data_dir+"/reports"), serveIndex(data_dir+"/reports", {'icons': true}))

  app.get(`${prefix_url}/`, async (req, res) => {
    res.send("site-audit-seo working");
  });

  const host = process.env.HOST || "0.0.0.0";
  const port = process.env.PORT || 5301;

  http.listen(port, () => {
    console.log(`Server listening at "http://${host}:${port}"`);
  });
}