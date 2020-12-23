const program = require("./program");
const scrapSite = require("./scrap-site");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const queue = require("queue");
const maxConcurrency = 2;
const q = queue({
  concurrency: maxConcurrency,
  autostart: true,
});

function sendStats(socket) {
  socketSend(socket, "serverState", {
    running: q.length < maxConcurrency ? q.length : maxConcurrency,
    available: Math.max(0, maxConcurrency - q.length),
    pending: Math.max(0, q.length - maxConcurrency),
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

q.start((err) => {
  if (err) throw err;
  console.log("all done!");
});

const port = process.env.PORT || 5301;

function log(msg, socket) {
  console.log(msg);
  socketSend(socket, "status", msg);
}

function socketSend(socket, event, msg) {
  if (socket) {
    // console.log('socket: ' + event, msg);
    console.log(event + socket.uid + ": ", msg);
    socket.emit(event + (socket.uid || ""), msg);
  }
}

io.on("connection", (socket) => {
  log("user connected to server", socket);

  submitQueueEvents(socket);

  const interval = setInterval(() => {
    sendStats(socket);
  }, 5000);

  socket.on("auth", (auth) => {
    socket.uid = auth && auth.uid ? auth.uid : "";
    console.log('socket.uid: ', socket.uid);
    // console.log("auth: ", auth);

    const msg =
      !socket.uid || socket.uid.includes("anon")
        ? "anonymous user"
        : "user authenticated";
    log(msg, socket);
  });

  socket.on("scan", async ({ url, args }) => {
    args = args.split(" ");
    if (!url) {
      log("URL not defined!", socket);
      return;
    }

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

    program.outBrief(opts);

    // try {
    q.push(async function () {
      return await scan(url, opts);
    });
  });

  socket.on("disconnect", () => {
    clearInterval(interval);
    console.log("user disconnected");
  });
});

http.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

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

/* app.post("/scan", async (req, res) => {
  const url = req.body.url;
  const args = req.body.args.split(" ");
  if (!url) {
    log("URL not defined!");
    return;
  }

  program.exitOverride();
  try {
    program.parse([...["", ""], ...args]);
  } catch (e) {
    log("failed to parse arguments: " + e.message);
    res.send("ERROR");
    return;
  }

  await program.postParse();

  const opts = program.getOptions();
  opts.webService = true;
  opts.socket = userSocket;

  program.outBrief(opts);

  // try {
    q.push(async function() {
      return await scan(url, opts);
    });
  // } catch (e) {
    // log("error while scan:", e.message);
  // }

  res.send("OK");
}); */

app.get("/", async (req, res) => {
  res.send("site-audit-seo working");
});

async function scan(url, opts) {
  socketSend(opts.socket, "status", `start audit: ${url}`);
  const data = await scrapSite(url, opts);
  socketSend(opts.socket, "status", `finish audit: ${url}`);
  return data;
}

/* function reqQueryToArgs(req) {
  if (req.query.url) {
    req.query.urls = req.query.url;
    delete req.query.url;
  }

  const args = [process.argv[0], process.argv[1]];
  for (let reqParam in req.query) {
    for (let opt of program.options) {
      let argNames = [];
      argNames.push(opt.long.replace(/^--/, ""));
      if (opt.short) argNames.push(opt.short.replace(/^-/, ""));
      if (opt.negate) {
        for (let i in argNames) {
          argNames[i] = argNames[i].replace(/^no-/, "");
        }
      }

      // add arg as in command line
      if (argNames.includes(reqParam)) {
        args.push("--" + argNames[0]);
        args.push(req.query[reqParam]);
      }
    }
  }
  console.log("args: ", args);
  return args;
} */
