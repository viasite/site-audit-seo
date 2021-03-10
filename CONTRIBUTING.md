## Install master branch
```
npm install -g git+https://github.com/viasite/site-audit-seo.git --unsafe-perm
```

## docker-compose build
For build you should symlink `site-audit-seo-viewer` to `data/front` directory.

For me:

```
ln -s $HOME/projects/js/site-audit-seo-viewer $HOME/projects/site-audit-seo/data/front
```

Then:

```
docker-compose build
docker-compose up -d
```

## Plugins

### AfterScan plugin

#### AfterScan package.json:

``` json
{
  "name": "site-audit-seo-export-influxdb",
  "site-audit-seo": {
    "plugins": {
      "export-influxdb": {
        "main": "sendToInfluxDB.js",
        "type": "afterScan",
      }
    }
  }
}
```

#### Minimal `afterScan` plugin code:

``` js
function afterScan(jsonPath, options) {
  const jsonRaw = fs.readFileSync(jsonPath);
  const data = JSON.parse(jsonRaw);
}

module.exports = afterScan;
```


### AfterRequest plugin

### AfterRequest package.json:

``` json
{
  "name": "site-audit-seo-export-influxdb",
  "site-audit-seo": {
    "plugins": {
      "readability": {
        "main": "readability.js",
        "type": "afterRequest",
        "fields": [
          {
            "name": "readability_time",
            "comment": "Читать, секунд?",
            "comment_en": "Reading, time",
            "groups": ["readability"],
            "type": "integer"
          }
        ]
      }
    }
  }
}
```

#### Minimal `afterRequest` plugin code:

``` js
function afterRequest(result, options) {
  result.newField = 123;
}

module.exports = afterRequest;
```

See core plugins at [src/plugins](src/plugins).

### Plugin types:
- `plugins` - launch depends of plugin type: `afterScan`, `afterRequest`, for export data, send notifications and so on

### Install plugins:
You can install plugins with `npm` to `data` directory.

### Places for plugin:
- [x] Extractors data from page
- [x] Analyze html of page
- [x] Actions after scan (implemented)
- [ ] Command line arguments
