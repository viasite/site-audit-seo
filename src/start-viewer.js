const fs = require('fs')
const express = require('express')

module.exports = async (jsonPath, webPath=false) => {
    const app = express();
    const port = 3001;
    app.use('/', express.static('./web'));
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
    app.use('/data.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(fs.readFileSync(jsonPath));
        // express.static('./web')
    });

    app.listen(port, () => {
        const dataJson = webPath || `http://localhost:${port}/data.json`;
        // console.log(`Open for view report: http://localhost:${port}/`);
        console.log(`JSON file: ${dataJson}`);
        console.log(`Dev viewer: http://localhost:3000/?url=${dataJson}`);
        console.log(`Online viewer: https://viasite.github.io/site-audit-seo-viewer/?url=${dataJson}`);
    });
}