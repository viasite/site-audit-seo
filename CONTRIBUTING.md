# Contributing to site-audit-seo

Thanks for your interest in contributing to site-audit-seo. This guide will help you get started.

## Getting Started

### Prerequisites

- Node.js 16+
- npm
- Docker and docker-compose (optional, for containerized development)
- Google Chrome (for Puppeteer/Lighthouse features)

### Local Development Setup

1. Clone the repository:
```bash
git clone https://github.com/viasite/site-audit-seo.git
cd site-audit-seo
```

2. Install dependencies:
```bash
npm install
```

3. Run the CLI tool locally:
```bash
node src/index.js -u https://example.com
```

### Install from master branch
```
npm install -g git+https://github.com/viasite/site-audit-seo.git --unsafe-perm
```

## Docker Development

For build, you should symlink `site-audit-seo-viewer` to the `data/front` directory:

```bash
ln -s /path/to/site-audit-seo-viewer /path/to/site-audit-seo/data/front
```

Then:

```bash
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
- `afterScan` - runs after the full site scan is complete. Useful for exporting data, sending notifications, etc.
- `afterRequest` - runs after each page request. Useful for extracting additional data from pages.

### Installing plugins:
You can install plugins with `npm` in the `data` directory.

### Plugin extension points:
- [x] Extract data from a page
- [x] Analyze HTML of a page
- [x] Actions after scan (implemented)
- [ ] Command line arguments

## Submitting Changes

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-change`)
3. Make your changes
4. Test locally with `node src/index.js -u https://example.com`
5. Commit with a clear message
6. Push to your fork and open a Pull Request

## Reporting Issues

If you find a bug or have a feature request, please open an issue with:
- A clear description of the problem or suggestion
- Steps to reproduce (for bugs)
- Your environment details (OS, Node.js version, npm version)
