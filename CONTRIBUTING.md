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
Example package.json:

``` json
{
  "name": "site-audit-seo-export-influxdb",
  "site-audit-seo": {
    "plugins": {
      "export-influxdb": "sendToInfluxDB.js"
    }
  }
}
```

See core plugins at [src/plugins](src/plugins).

### Plugin types:
- `plugins` - launch after scan, for export data, send notifications and so on

### Install plugins:
You can install plugins with `npm` to `data` directory.

### Places for plugin:
- [ ] Extractors data from page
- [ ] Analyze html of page
- [x] Actions after scan (implemented)
- [ ] Command line arguments
