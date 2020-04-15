# [2.0.0](https://github.com/viasite/sites-scraper/compare/v1.0.0...v2.0.0) (2020-04-15)


### Bug Fixes

* add filters /?catalog_view=, /?SORT=, /filter/clear/apply/ ([802635f](https://github.com/viasite/sites-scraper/commit/802635f))
* ignore http scan while first page was https ([be62808](https://github.com/viasite/sites-scraper/commit/be62808))


### Features

* command line interface ([5b62d72](https://github.com/viasite/sites-scraper/commit/5b62d72))
* images_alt_empty ([f953b96](https://github.com/viasite/sites-scraper/commit/f953b96))
* images, images_without_alt ([2431b53](https://github.com/viasite/sites-scraper/commit/2431b53))
* links, links_inner, links_outer, text_ratio_percent ([14cb3fa](https://github.com/viasite/sites-scraper/commit/14cb3fa))
* log robots.txt disallow to console ([4ef6a8e](https://github.com/viasite/sites-scraper/commit/4ef6a8e))
* mixed_content_url ([e058452](https://github.com/viasite/sites-scraper/commit/e058452))



# [1.0.0](https://github.com/viasite/sites-scraper/compare/de18f1e...v1.0.0) (2020-03-11)


### Bug Fixes

* fix freeze when exception while pageEvaluate (collect page data), add html_size ([5b2541e](https://github.com/viasite/sites-scraper/commit/5b2541e))
* h1 trim ([67fbc0d](https://github.com/viasite/sites-scraper/commit/67fbc0d))
* ignore /?display= ([2b08a55](https://github.com/viasite/sites-scraper/commit/2b08a55))
* ignore bitrix redirects ([b310334](https://github.com/viasite/sites-scraper/commit/b310334))
* ignore case on extension check ([be5407e](https://github.com/viasite/sites-scraper/commit/be5407e))
* move basic options to index.js ([f7e1d6b](https://github.com/viasite/sites-scraper/commit/f7e1d6b))
* move canonical after url ([3c74a10](https://github.com/viasite/sites-scraper/commit/3c74a10))
* remove url duplicates ([110b379](https://github.com/viasite/sites-scraper/commit/110b379))
* save csv for Excel ([c9e3004](https://github.com/viasite/sites-scraper/commit/c9e3004))


### Features

* add referer page ([572411f](https://github.com/viasite/sites-scraper/commit/572411f))
* add skip_static to options ([7981e9b](https://github.com/viasite/sites-scraper/commit/7981e9b))
* fields presets ([0577b39](https://github.com/viasite/sites-scraper/commit/0577b39))
* ignore css and js ([a203275](https://github.com/viasite/sites-scraper/commit/a203275))
* is_canonical ([e6b0377](https://github.com/viasite/sites-scraper/commit/e6b0377))
* move sites list to data/sites.conf ([68f16ca](https://github.com/viasite/sites-scraper/commit/68f16ca))
* optional encode csv to win1251 ([f025b7f](https://github.com/viasite/sites-scraper/commit/f025b7f))
* progress, show page count, time per page ([b6aa6f4](https://github.com/viasite/sites-scraper/commit/b6aa6f4))
* progress: more verbose output, queue size, events ([a115e7c](https://github.com/viasite/sites-scraper/commit/a115e7c))
* request_time, h1, h1-h4 count, dom_count ([29c2f86](https://github.com/viasite/sites-scraper/commit/29c2f86))
* scrap site list ([de18f1e](https://github.com/viasite/sites-scraper/commit/de18f1e))



