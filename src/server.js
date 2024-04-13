import path from 'path';
import { JSONFilePreset } from 'lowdb/node'

import scrapSite from "./scrap-site.js";
// import { scrapSite } from "./scrap-site";
import registry from "./registry.js";
import utils from "./utils.js";

import queue from "queue";
import express from "express";
const app = express();
// import cors from 'cors';
// app.use(cors());
import bodyParser from "body-parser";
import http from "http";
import os from "os";
const server = http.createServer(app);
import config from "./config.js";
import { Server } from "socket.io";
import {fileURLToPath} from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
    // methods: ["GET", "POST"],
  },
  pingTimeout: 30000, // https://github.com/socketio/socket.io/issues/3025
});

const dataDir = process.env.DATA_DIR || 'data';
utils.initDataDir(dataDir);

process.uncaughtException = (error, source) => {
  console.error('Uncaught Exception in server.js:', error);
  console.error('Source:', source);
};
process.on('uncaughtException', process.uncaughtException);

initExpress(app);

// state
// const adapter = new FileSync();
const defaultData = { stats: []};
const dbPath = path.join(dataDir, 'db.json');
const db = await JSONFilePreset(dbPath, defaultData);
// const db = new LowSync(new JSONFileSync(dbPath), defaultData);
// db.defaults({ state: {} }).write();

// add reboot
const stats = db.data.stats;
const reboots = stats.reboots ? stats.reboots + 1 : 1;
// db.set('stats.reboots', reboots).write();
db.update(({stats}) => {
  stats.reboots = reboots;
});

const maxConcurrency = 2;
let scansTotal = 0;
let pagesTotal = 0;
let connections = 0;
const sockets = {};
let q;
const startedTime = Date.now();
initQueue();
io.on("connection", onSocketConnection);

// plugins
registry.load();




async function onScan(url, args, socket) {
  log(`> site-audit-seo ` + (url ? `-u ${url} ` : '') + args, socket);
  args = args.trim().split(" ").map(arg => {
    return arg.replace(/%20/g, ' ');
  });
  if (!url) {
    log("URL not defined!", socket);
    return;
  }

  const programImport = await import("./program.js");
  const program = programImport.default;

  // repeat default, cross-scans global!
  // TODO: remove
  delete(program.preset);
  delete(program.exclude);
  delete(program.maxDepth);
  delete(program.concurrency);
  delete(program.lighthouse);
  delete(program.screenshot);
  program.removeSelectors = '.matter-after,#matter-1,[data-slug]'; // TODO: to config

  program.delay = 0;
  program.skipStatic = false;
  delete(program.followXmlSitemap);
  delete(program.ignoreRobotsTxt);
  program.limitDomain = true;
  delete(program.urlList);
  delete(program.maxRequests);
  program.headless = true;
  delete(program.docsExtensions);
  program.outDir = '~/site-audit-seo/';
  delete(program.outName);
  program.color = true;

  delete(program.lang);
  program.fields = [];
  delete(program.defaultFilter);
  program.removeCsv = true;
  delete(program.removeJson);
  program.json = true;
  delete(program.upload);
  delete(program.consoleValidate);
  delete(program.influxdb);
  delete(program.urls);
  program.disablePlugins = config.disablePlugins || [];

  program.exitOverride();
  try {
    program.parse([...["", ""], ...args]);
  } catch (e) {
    log("failed to parse arguments: " + e.message, socket);
    return;
  }

  await program.postParse();

  const opts = program.getOptions();

  // console.log("args:", [...["", ""], ...args]);
  // console.log("opts:", opts);
  opts.args = args;
  opts.webService = true;
  opts.consoleValidate = false; // not needed
  opts.socket = socket;

  const prevSocketId = getKeyBySocketId(socket.id);
  // console.log('socket.id: ', socket.id);
  // console.log('sockets: ', sockets);
  // console.log('prevSocketId: ', prevSocketId);
  sockets[prevSocketId || socket.id].opts = opts;

  // console.log('opts: ', opts);
  program.outBrief(opts);

  // try {
  if (serverState()['running'] >= maxConcurrency) {
    log('Pending...', socket, true);
  }
  q.push(async function () {
    log(`Start audit: ${url}`, socket, true);

    // https://github.com/socketio/socket.io/issues/3025
    const pingInterval = setInterval(() => {
      opts.socket.emit('ping', '1');
      // log('ping', opts.socket, true);
    }, 5000);

    const res = await scrapSite({baseUrl: url, options: opts});

    if (res && res.pages) {
      pagesTotal += res.pages;

      // update persistent state
      db.update(({stats}) => {
        stats.pagesTotal = stats.pagesTotal ? stats.pagesTotal + res.pages : res.pages;
        stats.scansTotal = stats.scansTotal ? stats.scansTotal + 1 : 1;
      });
    }

    clearInterval(pingInterval);

    return res;
  })
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

function getKeyBySocketId(socketId) {
  for (let sid in sockets) {
    const s = sockets[sid];
    if (s?.opts?.socket?.id === socketId || sid === socketId) return sid;
  }
}

function serverState() {
  const stats = db.data.stats;
  // const stats = db.get('stats').value() || {};

  const socketsList = [];

  // for debug
  for (let sid in sockets) {
    const s = sockets[sid];
    const msg = s?.opts?.socket?.id !== sid ? `${sid} => ${s.socket.id}` : sid;
    socketsList.push(msg);
  }

  const conf = {
    running: q.length < maxConcurrency ? q.length : maxConcurrency,
    available: Math.max(0, maxConcurrency - q.length),
    pending: Math.max(0, q.length - maxConcurrency),
    connections: connections,
    scansTotal: scansTotal,
    pagesTotal: pagesTotal,
    scansTotalAll: stats.scansTotal || 0,
    pagesTotalAll: stats.pagesTotal || 0,
    serverLoadPercent: getServerLoadPercent(),
    uptime: Math.floor((Date.now() - startedTime) / 1000),
    serverVersion: packageJson.version,
    reboots: reboots,
    featureScreenshot: config.featureScreenshot,
    // sockets: socketsList, // only for debug!
  }
  if (config.onlyDomains) conf.onlyDomains = config.onlyDomains;
  return conf;
}

function getServerLoadPercent() {
  // return load average / number of CPUs
  const cpus = os.cpus().length;
  const load = os.loadavg()[0];
  return Math.round(load / cpus * 100);
}
function sendStats(socket) {
  socketSend(socket, "serverState", serverState());
}

function onSocketConnection(socket) {
  log(`user connected to server, connectionId: ${socket.id}`, socket, true);
  connections++;
  // console.log('socket.id: ', socket.id);
  sockets[socket.id] = { socket, opts: {} };

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

    // restore last connection
    if (auth.connectionId) {
      const prevSocketId = getKeyBySocketId(auth.connectionId);

      if (prevSocketId) {
        console.log(`restore connection: ${prevSocketId} -> ${socket.id}`);
        sockets[prevSocketId].opts.socket = socket; // replace socket in scan options
        delete(sockets[socket.id]);
      }
    }

    sendStats(socket);
  });

  socket.on("scan", ({url, args}) => {
    return onScan(url, args, socket)
  });

  socket.on("cancel", () => {
    log('cancel command...', socket);
    const prevSocketId = getKeyBySocketId(socket.id);
    if (prevSocketId) sockets[prevSocketId].opts.cancel = true;
  });

  socket.on("disconnect", () => {
    clearInterval(interval);
    connections--;
    log(`user disconnected: ${socket.id}`, socket, true);
  });
}

function submitQueueEvents(socket) {
  q.on("success", function (result, job) {
    // console.log("job finished processing:", job.toString().replace(/\n/g, ""));
    console.log("job finished processing");
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
    res.send(`site-audit-seo ${packageJson.version} working`);
  });

  const port = process.env.PORT || 5301;
  server.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });
}
