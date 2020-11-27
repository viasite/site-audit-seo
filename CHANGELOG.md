# [3.3.0](https://github.com/viasite/site-audit-seo/compare/v3.2.3...v3.3.0) (2020-11-27)


### Bug Fixes

* outer_links: only http, not tel: mailto: etc. ([1d71579](https://github.com/viasite/site-audit-seo/commit/1d71579))


### Features

* --default-filter ([02b0129](https://github.com/viasite/site-audit-seo/commit/02b0129))
* --out-name ([4968cb3](https://github.com/viasite/site-audit-seo/commit/4968cb3))
* google_amp field ([d79aab0](https://github.com/viasite/site-audit-seo/commit/d79aab0))
* short link ([3251c3e](https://github.com/viasite/site-audit-seo/commit/3251c3e))



## [3.2.3](https://github.com/viasite/site-audit-seo/compare/v3.2.2...v3.2.3) (2020-09-23)


### Bug Fixes

* include all lighthouse fields when --lighthouse used ([0efaa0a](https://github.com/viasite/site-audit-seo/commit/0efaa0a))
* support relative canonical ([76b5cce](https://github.com/viasite/site-audit-seo/commit/76b5cce))



## [3.2.2](https://github.com/viasite/site-audit-seo/compare/v3.2.1...v3.2.2) (2020-08-26)


### Bug Fixes

* **filters:** remove filters H1 != 1, Status != 200 ([dab86a2](https://github.com/viasite/site-audit-seo/commit/dab86a2))
* --fields was broken, fixed ([23d19c6](https://github.com/viasite/site-audit-seo/commit/23d19c6))
* output error when request failed ([ebfbd6e](https://github.com/viasite/site-audit-seo/commit/ebfbd6e))
* **validation:** lighthouse_interactive validation ([3756324](https://github.com/viasite/site-audit-seo/commit/3756324))
* out total scan time in minutes ([d2a787d](https://github.com/viasite/site-audit-seo/commit/d2a787d))


### Features

* add column preset 'default + lighthouse' ([5bd21e5](https://github.com/viasite/site-audit-seo/commit/5bd21e5))



## [3.2.1](https://github.com/viasite/site-audit-seo/compare/v3.2.0...v3.2.1) (2020-08-23)


### Bug Fixes

* add og_image to default, align right for title ([3298147](https://github.com/viasite/site-audit-seo/commit/3298147))
* og_image type = image ([0c29f78](https://github.com/viasite/site-audit-seo/commit/0c29f78))


### Features

* **new filters:** Status != 200, Not canonical, DOM > 1500, Images outer > 0 ([a4f323c](https://github.com/viasite/site-audit-seo/commit/a4f323c))
* out generated json size in MB ([dbff72d](https://github.com/viasite/site-audit-seo/commit/dbff72d))



# [3.2.0](https://github.com/viasite/site-audit-seo/compare/v3.1.0...v3.2.0) (2020-08-22)


### Bug Fixes

* concurrency = 1 when lighthouse ([78a199d](https://github.com/viasite/site-audit-seo/commit/78a199d))
* local time in json upload name ([58ef6a3](https://github.com/viasite/site-audit-seo/commit/58ef6a3))
* when upload, get only json basename, not full path ([93c3d92](https://github.com/viasite/site-audit-seo/commit/93c3d92))


### Features

* default columns for presets in json ([61c777a](https://github.com/viasite/site-audit-seo/commit/61c777a))



# [3.1.0](https://github.com/viasite/site-audit-seo/compare/v3.0.0...v3.1.0) (2020-08-22)


### Bug Fixes

* "# Lighthouse" for main groups ([d4243eb](https://github.com/viasite/site-audit-seo/commit/d4243eb))
* better finish scan ([eb25a69](https://github.com/viasite/site-audit-seo/commit/eb25a69))
* better json name for upload ([fc848a9](https://github.com/viasite/site-audit-seo/commit/fc848a9))
* default concurrency = 1 when use --lighthouse ([e4cf923](https://github.com/viasite/site-audit-seo/commit/e4cf923))
* show uploaded json links when port 3001 is busy ([968dbd5](https://github.com/viasite/site-audit-seo/commit/968dbd5))


### Features

* --lang [en,ru] ([8b9bece](https://github.com/viasite/site-audit-seo/commit/8b9bece))
* config file, add --xlsx option ([79aaa68](https://github.com/viasite/site-audit-seo/commit/79aaa68))
* now default output dir is ~/site-audit-seo/, not current dir ([e38af7d](https://github.com/viasite/site-audit-seo/commit/e38af7d))
* now default save as json, now as xlsx ([803727b](https://github.com/viasite/site-audit-seo/commit/803727b))
* now default save as json, remove json, not save as xlsx ([a6ed60d](https://github.com/viasite/site-audit-seo/commit/a6ed60d))
* use current locale language (only ru/en, default en) ([a2461a0](https://github.com/viasite/site-audit-seo/commit/a2461a0))



# [3.0.0](https://github.com/viasite/site-audit-seo/compare/v2.9.0...v3.0.0) (2020-08-21)


### Bug Fixes

* change to site-audit-seo-viewer web view ([e49edee](https://github.com/viasite/site-audit-seo/commit/e49edee))
* field values based validation for lighthouse ([d93cf1a](https://github.com/viasite/site-audit-seo/commit/d93cf1a))
* lighthouse group main ([6e7f26b](https://github.com/viasite/site-audit-seo/commit/6e7f26b))
* save as JSON: integer type for correct sorting ([fa48b5a](https://github.com/viasite/site-audit-seo/commit/fa48b5a))


### Features

* --json, save results to .json file ([6347757](https://github.com/viasite/site-audit-seo/commit/6347757))
* --lighthouse appends base Lighthouse fields to any preset ([fe6d274](https://github.com/viasite/site-audit-seo/commit/fe6d274))
* --no-open-file ([ac38d77](https://github.com/viasite/site-audit-seo/commit/ac38d77))
* --preset lighthouse-all ([15597de](https://github.com/viasite/site-audit-seo/commit/15597de))
* --upload report to persistent public store ([192665e](https://github.com/viasite/site-audit-seo/commit/192665e))
* export as json, named all fields ([eef898b](https://github.com/viasite/site-audit-seo/commit/eef898b))
* filters, columns and default - new fields in json ([249d4f3](https://github.com/viasite/site-audit-seo/commit/249d4f3))
* web viewer for json ([b76b4dc](https://github.com/viasite/site-audit-seo/commit/b76b4dc))



# [2.9.0](https://github.com/viasite/site-audit-seo/compare/v2.8.0...v2.9.0) (2020-08-16)


### Features

* export xlsx report to Google Drive ([c7c3458](https://github.com/viasite/site-audit-seo/commit/c7c3458))



# [2.8.0](https://github.com/viasite/site-audit-seo/compare/v2.7.1...v2.8.0) (2020-08-16)


### Bug Fixes

* shortened lighthouse column names ([ade33ef](https://github.com/viasite/site-audit-seo/commit/ade33ef))


### Features

* --fields 'title=$("title").text()' ([5b130d0](https://github.com/viasite/site-audit-seo/commit/5b130d0))
* display scan parameters on start ([9bfb201](https://github.com/viasite/site-audit-seo/commit/9bfb201))
* success colors for lighthouse in xlsx ([c31e554](https://github.com/viasite/site-audit-seo/commit/c31e554))



## [2.7.1](https://github.com/viasite/site-audit-seo/compare/v2.7.0...v2.7.1) (2020-08-14)


### Bug Fixes

* lighthouse memory leak fix: now only 1 chrome instance for lighthouse ([2ebf375](https://github.com/viasite/site-audit-seo/commit/2ebf375))



# [2.7.0](https://github.com/viasite/site-audit-seo/compare/v2.6.0...v2.7.0) (2020-08-13)


### Features

* --preset lighthouse ([07f50c2](https://github.com/viasite/site-audit-seo/commit/07f50c2))



# [2.6.0](https://github.com/viasite/site-audit-seo/compare/v2.5.0...v2.6.0) (2020-07-26)


### Features

* --exclude fields from result ([1a1b7d7](https://github.com/viasite/site-audit-seo/commit/1a1b7d7))



# [2.5.0](https://github.com/viasite/site-audit-seo/compare/v2.4.1...v2.5.0) (2020-07-20)


### Features

* open file after scan on Windows and MacOS, --open-file ([f1cee2a](https://github.com/viasite/site-audit-seo/commit/f1cee2a))



## [2.4.1](https://github.com/viasite/site-audit-seo/compare/v2.4.0...v2.4.1) (2020-05-08)


### Bug Fixes

* title validate ([41b72fd](https://github.com/viasite/site-audit-seo/commit/41b72fd))



# [2.4.0](https://github.com/viasite/site-audit-seo/compare/v2.3.3...v2.4.0) (2020-05-08)


### Features

* validation summary ([e9a0917](https://github.com/viasite/site-audit-seo/commit/e9a0917))



## [2.3.3](https://github.com/viasite/site-audit-seo/compare/v2.3.2...v2.3.3) (2020-05-06)


### Bug Fixes

* switch to [@popstas](https://github.com/popstas)/headless-chrome-crawler was not finished ([786ad89](https://github.com/viasite/site-audit-seo/commit/786ad89))


### Features

* canonical_count ([b986eec](https://github.com/viasite/site-audit-seo/commit/b986eec))



## [2.3.2](https://github.com/viasite/site-audit-seo/compare/v2.3.1...v2.3.2) (2020-05-05)



## [2.3.1](https://github.com/viasite/site-audit-seo/compare/v2.3.0...v2.3.1) (2020-05-05)


### Bug Fixes

*  canonical and url fix for non-ascii urls ([5600e68](https://github.com/viasite/site-audit-seo/commit/5600e68))
* -m alias for --max-requests ([b744d04](https://github.com/viasite/site-audit-seo/commit/b744d04))
* add ppt, pptx to docs extensions ([ab21e61](https://github.com/viasite/site-audit-seo/commit/ab21e61))
* change validation colors, background in place of font color ([4e4df1a](https://github.com/viasite/site-audit-seo/commit/4e4df1a))
* errors while doc request (ignore docs in 'request' handler) ([dc0f4b6](https://github.com/viasite/site-audit-seo/commit/dc0f4b6))
* exception while trying docs validate ([0e71bf1](https://github.com/viasite/site-audit-seo/commit/0e71bf1))
* fix images_outer for src like "images/img.jpg", "data:..." ([dd84e51](https://github.com/viasite/site-audit-seo/commit/dd84e51))


### Features

* --csv, only convert csv to xlsx ([59449b1](https://github.com/viasite/site-audit-seo/commit/59449b1))
* --delay between requests ([cc15ea8](https://github.com/viasite/site-audit-seo/commit/cc15ea8))
* --ignore-robots-txt ([33535b2](https://github.com/viasite/site-audit-seo/commit/33535b2))
* console output of non-200 http codes ([009dedb](https://github.com/viasite/site-audit-seo/commit/009dedb))
* images_outer ([007995d](https://github.com/viasite/site-audit-seo/commit/007995d))
* text_ratio validate (<10% warning) ([db47575](https://github.com/viasite/site-audit-seo/commit/db47575))
* validation results in console, --no-console-validate ([ee63716](https://github.com/viasite/site-audit-seo/commit/ee63716))



# [2.3.0](https://github.com/viasite/site-audit-seo/compare/v2.2.0...v2.3.0) (2020-04-18)


### Bug Fixes

* --skip-static and --concurrency fix ([086eabd](https://github.com/viasite/site-audit-seo/commit/086eabd))
* better width fitting ([0942833](https://github.com/viasite/site-audit-seo/commit/0942833))
* h1 warning validation ([9aabfc7](https://github.com/viasite/site-audit-seo/commit/9aabfc7))
* message when max requests reached ([6693528](https://github.com/viasite/site-audit-seo/commit/6693528))
* retry save xls after 10 seconds when file busy ([7b54273](https://github.com/viasite/site-audit-seo/commit/7b54273))


### Features

* --no-limit-domain ([b765ce7](https://github.com/viasite/site-audit-seo/commit/b765ce7))
* add --docs-extensions ([4903598](https://github.com/viasite/site-audit-seo/commit/4903598))



# [2.2.0](https://github.com/viasite/site-audit-seo/compare/v2.1.0...v2.2.0) (2020-04-18)


### Bug Fixes

*  switch to [@popstas](https://github.com/popstas)/xlsx-style package until author package update ([b26ec76](https://github.com/viasite/site-audit-seo/commit/b26ec76))
* not show is_canonical: 0 when canonical is empty ([31d0271](https://github.com/viasite/site-audit-seo/commit/31d0271))


### Features

* style and validation of xlsx ([eb99928](https://github.com/viasite/site-audit-seo/commit/eb99928))



# [2.1.0](https://github.com/viasite/site-audit-seo/compare/v2.0.1...v2.1.0) (2020-04-17)


### Bug Fixes

* https schema.org replace ([3c643b6](https://github.com/viasite/site-audit-seo/commit/3c643b6))


### Features

* custom fields in command ([c0c42cd](https://github.com/viasite/site-audit-seo/commit/c0c42cd))
* export to xlsx ([21406fb](https://github.com/viasite/site-audit-seo/commit/21406fb))
* parse preset ([3330a60](https://github.com/viasite/site-audit-seo/commit/3330a60))
* schema_types (schema.org) ([bdde095](https://github.com/viasite/site-audit-seo/commit/bdde095))



## [2.0.1](https://github.com/viasite/site-audit-seo/compare/v2.0.0...v2.0.1) (2020-04-15)


### Features

* console colors ([a78d9cb](https://github.com/viasite/site-audit-seo/commit/a78d9cb))



# [2.0.0](https://github.com/viasite/site-audit-seo/compare/v1.0.0...v2.0.0) (2020-04-15)


### Bug Fixes

* add filters /?catalog_view=, /?SORT=, /filter/clear/apply/ ([802635f](https://github.com/viasite/site-audit-seo/commit/802635f))
* ignore http scan while first page was https ([be62808](https://github.com/viasite/site-audit-seo/commit/be62808))


### Features

* command line interface ([5b62d72](https://github.com/viasite/site-audit-seo/commit/5b62d72))
* images_alt_empty ([f953b96](https://github.com/viasite/site-audit-seo/commit/f953b96))
* images, images_without_alt ([2431b53](https://github.com/viasite/site-audit-seo/commit/2431b53))
* links, links_inner, links_outer, text_ratio_percent ([14cb3fa](https://github.com/viasite/site-audit-seo/commit/14cb3fa))
* log robots.txt disallow to console ([4ef6a8e](https://github.com/viasite/site-audit-seo/commit/4ef6a8e))
* mixed_content_url ([e058452](https://github.com/viasite/site-audit-seo/commit/e058452))



# [1.0.0](https://github.com/viasite/site-audit-seo/compare/de18f1e...v1.0.0) (2020-03-11)


### Bug Fixes

* fix freeze when exception while pageEvaluate (collect page data), add html_size ([5b2541e](https://github.com/viasite/site-audit-seo/commit/5b2541e))
* h1 trim ([67fbc0d](https://github.com/viasite/site-audit-seo/commit/67fbc0d))
* ignore /?display= ([2b08a55](https://github.com/viasite/site-audit-seo/commit/2b08a55))
* ignore bitrix redirects ([b310334](https://github.com/viasite/site-audit-seo/commit/b310334))
* ignore case on extension check ([be5407e](https://github.com/viasite/site-audit-seo/commit/be5407e))
* move basic options to index.js ([f7e1d6b](https://github.com/viasite/site-audit-seo/commit/f7e1d6b))
* move canonical after url ([3c74a10](https://github.com/viasite/site-audit-seo/commit/3c74a10))
* remove url duplicates ([110b379](https://github.com/viasite/site-audit-seo/commit/110b379))
* save csv for Excel ([c9e3004](https://github.com/viasite/site-audit-seo/commit/c9e3004))


### Features

* add referer page ([572411f](https://github.com/viasite/site-audit-seo/commit/572411f))
* add skip_static to options ([7981e9b](https://github.com/viasite/site-audit-seo/commit/7981e9b))
* fields presets ([0577b39](https://github.com/viasite/site-audit-seo/commit/0577b39))
* ignore css and js ([a203275](https://github.com/viasite/site-audit-seo/commit/a203275))
* is_canonical ([e6b0377](https://github.com/viasite/site-audit-seo/commit/e6b0377))
* move sites list to data/sites.conf ([68f16ca](https://github.com/viasite/site-audit-seo/commit/68f16ca))
* optional encode csv to win1251 ([f025b7f](https://github.com/viasite/site-audit-seo/commit/f025b7f))
* progress, show page count, time per page ([b6aa6f4](https://github.com/viasite/site-audit-seo/commit/b6aa6f4))
* progress: more verbose output, queue size, events ([a115e7c](https://github.com/viasite/site-audit-seo/commit/a115e7c))
* request_time, h1, h1-h4 count, dom_count ([29c2f86](https://github.com/viasite/site-audit-seo/commit/29c2f86))
* scrap site list ([de18f1e](https://github.com/viasite/site-audit-seo/commit/de18f1e))



