import fs from 'fs';
import express from 'express';
import config from '../config.js'

export default async (jsonPath, webPath = false) => {
  const app = express();
  const port = 3001;

  const jsonUrl = webPath || `http://localhost:${port}/data.json`;
  const jsonRaw = fs.readFileSync(jsonPath);

  const viewerOrigin = config.viewerOrigin || 'https://json-viewer.popstas.pro';
  // const uploadOrigin = config.uploadOrigin || 'https://site-audit.viasite.ru';
  app.get('/', function(req, res, next) {
    res.redirect(302, onlineViewLink(jsonUrl));
  });

  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  app.use('/data.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(jsonRaw);
  });

  function onlineViewLink(url) {
    const origin = config.viewerOrigin || 'https://json-viewer.popstas.pro';
    return `${origin}/?url=${url}`;
  }

  function outLinks(url) {
    // console.log(`JSON file: ${url}`);
    // console.log('');
    // console.log(`Dev viewer: http://localhost:3000/?url=${url}`);
    // console.log(`Short link: ${viewerOrigin}/?url=${url}`);
    console.log('');
    console.log(`Report link: ${onlineViewLink(url)}`);
    //console.log(`Public viewer: ${onlineViewLink(url.replace(`http://localhost:${port}`, 'https://3001.home.popstas.ru'))}`);
    console.log('');
  }

  outLinks(jsonUrl);

  if (!webPath) {
    app.listen(port, () => {
      const msg = `Started server at http://localhost:${port}, press Ctrl+C to exit`;
      console.log(msg);
    });
  }
};
