## [6.0.1](https://github.com/viasite/site-audit-seo/compare/v6.0.0...v6.0.1) (2025-06-24)


### Bug Fixes

* update viewer link ([bd5f083](https://github.com/viasite/site-audit-seo/commit/bd5f083cd548059950a126c228cb7aa958e1e687))


### Features

* html_size now calculate size before js render ([a02733a](https://github.com/viasite/site-audit-seo/commit/a02733aebbad357afe68aa3f2bf42b7e09ce8a7c))
* maxRequests hard limit, for public server ([3e00db6](https://github.com/viasite/site-audit-seo/commit/3e00db6e9dcbd912e91fae8d57f5097da8bcddd2))



# [6.0.0](https://github.com/viasite/site-audit-seo/compare/v5.1.5...v6.0.0) (2024-04-13)


### Bug Fixes

* --timeout default 10 -> 20 sec, reduce retryDelay 10 -> 5 sec, lighthouse maxWaitForLoad 10 -> 30 sec ([c7a829f](https://github.com/viasite/site-audit-seo/commit/c7a829ff0b578615ac621ccea6f4016be23d24a8))
* add failed requests to table, like http 204 ([61844de](https://github.com/viasite/site-audit-seo/commit/61844dee2c58e2087e7bad7264f9ee9bdb759280))
* add filterType to url field ([a41307a](https://github.com/viasite/site-audit-seo/commit/a41307a64f83dac728f8e3d113ca702ee334299a))
* add language "de" ([6e0166e](https://github.com/viasite/site-audit-seo/commit/6e0166e0dbd7d9f24da31c08a7f5f502b0e46be4))
* add partialReport to brief ([3c68849](https://github.com/viasite/site-audit-seo/commit/3c68849e760edf27577c9ac8a56f95963c696eeb))
* better cancelling, error logging, fix rescan for remain urls ([273ae86](https://github.com/viasite/site-audit-seo/commit/273ae86de6c69cb22439fffd4518ff4162c3e0e9))
* better scan start/stop indication ([b0697be](https://github.com/viasite/site-audit-seo/commit/b0697be116711c09c14cf799cc3acc4da5902c95))
* correct the treatment of 300x status codes as errors ([d11ad67](https://github.com/viasite/site-audit-seo/commit/d11ad67696519bd71165335718c64a3e7367d33f))
* disable uploading to custom server by default, upload to cloud instead unless viewerOrigin is defined ([3ddbb79](https://github.com/viasite/site-audit-seo/commit/3ddbb79b3d47228e3c19d44e1a2c954c0614f81b))
* don't create two reports when saveProgress report exists ([ad1dcb3](https://github.com/viasite/site-audit-seo/commit/ad1dcb3cf7211544e6a62dd876a363b6aa530bc2))
* fix console validate after lodash upgrade ([52cd7e7](https://github.com/viasite/site-audit-seo/commit/52cd7e790afb7583f65dab5e8cce52a42e6f73d8))
* fix restore connection by first socket id ([d5f6e71](https://github.com/viasite/site-audit-seo/commit/d5f6e71cf4ccd846cddd282b1c3d779817ce1745))
* fix scan error when result.result is not defined ([8074521](https://github.com/viasite/site-audit-seo/commit/8074521e96763aaefcc249292d4406fdb227d630))
* fix url pass to saveAsJson ([024dfdc](https://github.com/viasite/site-audit-seo/commit/024dfdc5f4b27f2d27dd10f9fea7838a00d6ec0b))
* html_size, images_without_alt was empty ([910986c](https://github.com/viasite/site-audit-seo/commit/910986c2b582aabec6d5255ea96148c17de3b2c8))
* limit default concurrency to 10 ([e3de101](https://github.com/viasite/site-audit-seo/commit/e3de101e40c48c7cd7df3983ae0fd1800499bb2e))
* remove debug project dir mount, add empty data/reports dir ([f938f9e](https://github.com/viasite/site-audit-seo/commit/f938f9e6262639807b5969292e8695addbd96d44))
* remove minor arguments from brief ([799bdbc](https://github.com/viasite/site-audit-seo/commit/799bdbca1bff276acc8bd16f99167e9a735e3f5c))
* respect disablePlugins from config ([856244a](https://github.com/viasite/site-audit-seo/commit/856244a7979e2178f2fff02f1f0ad32d0aa7d806))
* update environment variables ([faa8be9](https://github.com/viasite/site-audit-seo/commit/faa8be964b9431bfe8088c6dcec2a847438e19d3))


### Features

* add inline table filters for enum fields ([d697ff6](https://github.com/viasite/site-audit-seo/commit/d697ff6b3736948091b773cebab23e4707d304f5))
* add x_cache field ([e34a355](https://github.com/viasite/site-audit-seo/commit/e34a3555d2161a7595fb697f49497f7d0c676b86))
* featureScreenshot, onlyDomains, ./config.js, serverLoadPercent, maxConcurrency, node 14 -> 18 ([181f6ae](https://github.com/viasite/site-audit-seo/commit/181f6ae0bc31dcc7ad0301193f93f3dff3aa21fd))
* incremental saving of scan progress, add result.error, better page load error detection, scan document exist ([69894c0](https://github.com/viasite/site-audit-seo/commit/69894c0de46e502b51b20da0fb5d060eb7e0d2d6))
* persist report name, save progress every 100 urls, continue scan for urlList, filter item duplicates, add fields redirects, redirected_from, add preset seo-minimal, run plugins only if plugin fields in preset, reduce --timeout 30s -> 10s, add --screenshot, support comments in url list, less crashes ([9598b19](https://github.com/viasite/site-audit-seo/commit/9598b19b92c7994c7c0d9d70b39552cd2e778d57))
* upload reports to yandex cloud ([30a79bc](https://github.com/viasite/site-audit-seo/commit/30a79bcbb11e10a39af2ebfea8a0c20ff94730f7))
* zero-knowledge install ([57965a7](https://github.com/viasite/site-audit-seo/commit/57965a75b6541936bd5784f6531561c00396dc77))



## [5.1.5](https://github.com/viasite/site-audit-seo/compare/v5.1.4...v5.1.5) (2021-06-23)


### Bug Fixes

* docker-compose fix: remove mount data/db-docker.json, add git clone data/front ([a9d5f11](https://github.com/viasite/site-audit-seo/commit/a9d5f1121f012415a0ec2c6ae0c4adc645da678e)), closes [#18](https://github.com/viasite/site-audit-seo/issues/18)


### Features

* change default columns: add readability, remove useless links and headers counters ([492c363](https://github.com/viasite/site-audit-seo/commit/492c363cdf80dbea11ef077dbdb75ec4435a948f))
* **scan:** better disconnect survive, resend logs while disconnected with client ([19717df](https://github.com/viasite/site-audit-seo/commit/19717dfcaef9a4cd4fe4fc6d3ad6677be5462226))



## [5.1.4](https://github.com/viasite/site-audit-seo/compare/v5.1.3...v5.1.4) (2021-04-21)


### Bug Fixes

* was error after save scan time ([2e0b05a](https://github.com/viasite/site-audit-seo/commit/2e0b05a1c405a7ec6109a3efe5c0b99c051d01ce))



## [5.1.3](https://github.com/viasite/site-audit-seo/compare/v5.1.2...v5.1.3) (2021-04-21)


### Features

* show server version ([7b3eff7](https://github.com/viasite/site-audit-seo/commit/7b3eff785badb7420760ee751320a8235002fe71))



## [5.1.2](https://github.com/viasite/site-audit-seo/compare/v5.1.1...v5.1.2) (2021-04-21)


### Bug Fixes

* lighthouse_largest-contentful-paint validate ([2b752c9](https://github.com/viasite/site-audit-seo/commit/2b752c9cdd18a5b0f99369160f6790ae2a94bcac))


### Features

* save report scan time ([05dc3af](https://github.com/viasite/site-audit-seo/commit/05dc3af50488754a8e836bee8838073712ff38b1))



## [5.1.1](https://github.com/viasite/site-audit-seo/compare/v5.1.0...v5.1.1) (2021-04-06)


### Bug Fixes

* make working in docker ([1f2b4bb](https://github.com/viasite/site-audit-seo/commit/1f2b4bb65455e8b2a99e111b39ff795699e88be6))



# [5.1.0](https://github.com/viasite/site-audit-seo/compare/v5.0.1...v5.1.0) (2021-03-13)


### Bug Fixes

* add h1 field to metatags group ([bea02da](https://github.com/viasite/site-audit-seo/commit/bea02dabfa77dbd51db34265256c7b5fc57bf736))
* add package-data.json to git ([e5fef0b](https://github.com/viasite/site-audit-seo/commit/e5fef0b70dd685630a6791bf3fb49c1023965e83))
* arg --disable-plugins: set default [] ([9fcf266](https://github.com/viasite/site-audit-seo/commit/9fcf26628007061535f08ae7b02d5279929e5c06))
* fix command line mode ([dad7d54](https://github.com/viasite/site-audit-seo/commit/dad7d541ba69d57cd526a06f9054d0b66bbc05db))
* page scan retryCount 3 -> 1 (faster, same result) ([fbf0619](https://github.com/viasite/site-audit-seo/commit/fbf06198bfbaac859c2da15f99e54a457d63a7b0))
* **scan:** page_date when itemprop="datePublished"[content] ([91ee04e](https://github.com/viasite/site-audit-seo/commit/91ee04e6cbc72913b0c7de79e3410792ca2d552e))
* suppress headless-chrome-crawler exceptions after max requests reached ([ac374b3](https://github.com/viasite/site-audit-seo/commit/ac374b3313886ba04978b529188d7bf05e556aa0))


### Features

* --disable-plugins command line argument ([3a483c3](https://github.com/viasite/site-audit-seo/commit/3a483c3fb1b6b6ba53017d6e833b03f1abfe472d))
* **json:** save scan options for rescan ([0d5fd47](https://github.com/viasite/site-audit-seo/commit/0d5fd4791a0b81524e2f39f7bad2bf426fb25749))
* **presets:** add column preset "content" ([236574d](https://github.com/viasite/site-audit-seo/commit/236574d4eaa1a74769acb4c86c93fd2d1d36822f))
* **scan:** new field: page_date (from microdata) ([f8eecca](https://github.com/viasite/site-audit-seo/commit/f8eeccaab1559a3ed9a8efeef12568d94d2b95cc))



## [5.0.1](https://github.com/viasite/site-audit-seo/compare/v5.0.0...v5.0.1) (2021-03-10)



# [5.0.0](https://github.com/viasite/site-audit-seo/compare/v4.2.0...v5.0.0) (2021-03-10)


### Bug Fixes

* add google_amp to metatags group ([21e2e21](https://github.com/viasite/site-audit-seo/commit/21e2e217507595e8dc57d935ee98ae5324c79d65))
* exec plugins for CLI tool ([af7256c](https://github.com/viasite/site-audit-seo/commit/af7256c157bb6de6657b9e798849d9e8122f623d))
* **registry:** fix crash when no package.json or site-audit-seo section in user node_modules ([e3e7319](https://github.com/viasite/site-audit-seo/commit/e3e7319a0c082ca02348a0a58498e6fc7e2003a0))


### Features

* cancel command ([3db580b](https://github.com/viasite/site-audit-seo/commit/3db580b1055f2261f1488b385fa061bad698652e))
* **core:** plugin system for actions after scan ([ac49bb3](https://github.com/viasite/site-audit-seo/commit/ac49bb34786329d7391dda39c683e4827277989d))
* plugin types: afterRequest, afterScan ([e7ba5f7](https://github.com/viasite/site-audit-seo/commit/e7ba5f7e7365721de29c70c08ce747ee3c0e6989))
* restore connection with running scan job ([5cc36fa](https://github.com/viasite/site-audit-seo/commit/5cc36faf38e2bbb6be442ca18be6f0b967680db5))



# [4.2.0](https://github.com/viasite/site-audit-seo/compare/v4.1.1...v4.2.0) (2020-12-29)


### Bug Fixes

* fixed cross scans program values for main settings, fix send 'minimal' to InfluxDB ([fbc2ff5](https://github.com/viasite/site-audit-seo/commit/fbc2ff5844e4796630aaec04543ae6129e3c9eb2))
* **scrap:** don't fail page when error in user --field ([74a6ecb](https://github.com/viasite/site-audit-seo/commit/74a6ecb2ed0bd66b9db7b7b27ee9b44949dfe218))
* **server:** remove all previous program values ([36cca7d](https://github.com/viasite/site-audit-seo/commit/36cca7d953a378837ee07a4cc4ee83c3d50d8081))


### Features

* **server:** connections stats ([7845bd8](https://github.com/viasite/site-audit-seo/commit/7845bd80886d7c366dffebe8f9a2353f3b25a526))



## [4.1.1](https://github.com/viasite/site-audit-seo/compare/v4.1.0...v4.1.1) (2020-12-26)


### Features

* **server:** more server stats: persistent stats, uptime, reboots count ([4f06cf9](https://github.com/viasite/site-audit-seo/commit/4f06cf910b3a5b46be6f96ff5ffc200e314e96aa))



# [4.1.0](https://github.com/viasite/site-audit-seo/compare/v4.0.0...v4.1.0) (2020-12-26)


### Bug Fixes

* don't show "Pending" when no queue ([d19299a](https://github.com/viasite/site-audit-seo/commit/d19299af875bac2eb78b481dace1e635bde40769))
* remove parallel lighthouse when --urls scan ([ea77a79](https://github.com/viasite/site-audit-seo/commit/ea77a790677bc3bee0291dfed7b26c49a69b2c9f))
* **scan:** url field can used as name for --urls scan ([e115c59](https://github.com/viasite/site-audit-seo/commit/e115c59780cbe404f098ac7a2b457760049e3feb))
* **scrap:** fix --url-list and url with url list ([f9f729e](https://github.com/viasite/site-audit-seo/commit/f9f729e15abfcef488a9235ee999d169bae89143))
* show active --follow-xml-sitemap in brief ([bbefbd9](https://github.com/viasite/site-audit-seo/commit/bbefbd943330a1620f53c301197f19e0124bc864))


### Features

* --influxdb-max-send, working in CLI, config influxdb.maxSendCount ([b09b54e](https://github.com/viasite/site-audit-seo/commit/b09b54e21835668252b67b1bbccbad81db4b17d5))
* **scan:** out time in log ([ce1567c](https://github.com/viasite/site-audit-seo/commit/ce1567cc9951108999817469c42a85f6b08382f0))
* support scan single urls, --urls page1,page2 (without spaces!) ([b6b86de](https://github.com/viasite/site-audit-seo/commit/b6b86de7a3f7e9b2907d652ee9261e065ed666a6))



# [4.0.0](https://github.com/viasite/site-audit-seo/compare/v3.4.0...v4.0.0) (2020-12-24)


### Bug Fixes

* better report filename ([6b9d264](https://github.com/viasite/site-audit-seo/commit/6b9d2645fe6f0aaf7f341f1a1aadd4c8ac8ddc80))
* sanitize upload filename ([24352ee](https://github.com/viasite/site-audit-seo/commit/24352eeb1b4ac94a0e20f50ec1e53160412de6f4))
* server: CORS allow all, PORT env ([178fd89](https://github.com/viasite/site-audit-seo/commit/178fd891d7567a9cca971494d8b322f329162fa5))
* show anon/user id on auth success message ([d090dc2](https://github.com/viasite/site-audit-seo/commit/d090dc287843ad086f3ab52daaa24335d7f5719b))


### Features

* add brief before scan for web interface ([bd97cfa](https://github.com/viasite/site-audit-seo/commit/bd97cfa20dbcdd1133c00e417b5630e448f08435))
* save reports to user directories ([783214e](https://github.com/viasite/site-audit-seo/commit/783214ee62be19c910ea8f712cbda2c8071fceb0))
* **server:** Google auth, scans queue ([8bd342f](https://github.com/viasite/site-audit-seo/commit/8bd342f8f81278f6ee2b17fd11efeb6a1249e8e8)), closes [#6](https://github.com/viasite/site-audit-seo/issues/6)
* **server:** scansTotal ([e0e4739](https://github.com/viasite/site-audit-seo/commit/e0e4739b635819156fa27184b1f031866495df41))
* **server:** send to InfluxDB ([4ebd31f](https://github.com/viasite/site-audit-seo/commit/4ebd31f4a5df9b803cedb15069acaf607243c938)), closes [#9](https://github.com/viasite/site-audit-seo/issues/9)
* working docker-compose ([e9917db](https://github.com/viasite/site-audit-seo/commit/e9917dbec25aea844081b2414233e6b6c6851c30))



# [3.4.0](https://github.com/viasite/site-audit-seo/compare/v3.3.0...v3.4.0) (2020-12-04)


### Features

* --url-list, able to scan list of urls ([d0985d8](https://github.com/viasite/site-audit-seo/commit/d0985d82d86e639581375a05c6b4294823e0d1ea))



# [3.3.0](https://github.com/viasite/site-audit-seo/compare/v3.2.3...v3.3.0) (2020-11-27)


### Bug Fixes

* outer_links: only http, not tel: mailto: etc. ([1d71579](https://github.com/viasite/site-audit-seo/commit/1d715793c98fe157dc01095a3423b928f5746c44))


### Features

* --default-filter ([02b0129](https://github.com/viasite/site-audit-seo/commit/02b01294b8462f2a4ee8199123545663a7b2a74a))
* --out-name ([4968cb3](https://github.com/viasite/site-audit-seo/commit/4968cb3f198b1df0c7fbeaa50d69eced63890efb))
* google_amp field ([d79aab0](https://github.com/viasite/site-audit-seo/commit/d79aab0391ca5efb915bf94a242f5c87f8ecae46))
* short link ([3251c3e](https://github.com/viasite/site-audit-seo/commit/3251c3e67a56c2acde47c645f7267cf3f68026e5))



## [3.2.3](https://github.com/viasite/site-audit-seo/compare/v3.2.2...v3.2.3) (2020-09-23)


### Bug Fixes

* include all lighthouse fields when --lighthouse used ([0efaa0a](https://github.com/viasite/site-audit-seo/commit/0efaa0ac7732613ac524176a9ef14c894ad62b20))
* support relative canonical ([76b5cce](https://github.com/viasite/site-audit-seo/commit/76b5ccee20bd565b6de8f9ae9223d3bec151af33))



## [3.2.2](https://github.com/viasite/site-audit-seo/compare/v3.2.1...v3.2.2) (2020-08-26)


### Bug Fixes

* --fields was broken, fixed ([23d19c6](https://github.com/viasite/site-audit-seo/commit/23d19c67154b6ca086a864b985fd0c7e408e8b5e))
* **filters:** remove filters H1 != 1, Status != 200 ([dab86a2](https://github.com/viasite/site-audit-seo/commit/dab86a2569264d0f0ada83ea823a4775131a8ee9))
* out total scan time in minutes ([d2a787d](https://github.com/viasite/site-audit-seo/commit/d2a787d1f79a64cd2cf9cfe3b5a4fe5eb2146061))
* output error when request failed ([ebfbd6e](https://github.com/viasite/site-audit-seo/commit/ebfbd6e7dfee628d613cff10c0ab520c701a63b4))
* **validation:** lighthouse_interactive validation ([3756324](https://github.com/viasite/site-audit-seo/commit/3756324774e90fd3bd799ece2f455bc51c0751e7))


### Features

* add column preset 'default + lighthouse' ([5bd21e5](https://github.com/viasite/site-audit-seo/commit/5bd21e56a236e4b4d4de0b1e3c490bcf59b55bd8))



## [3.2.1](https://github.com/viasite/site-audit-seo/compare/v3.2.0...v3.2.1) (2020-08-23)


### Bug Fixes

* add og_image to default, align right for title ([3298147](https://github.com/viasite/site-audit-seo/commit/32981472c056d8529c1f0a4b5e40bfd908df225e))
* og_image type = image ([0c29f78](https://github.com/viasite/site-audit-seo/commit/0c29f786ea8b83209da94e56d2037b2c9302e381))


### Features

* **new filters:** Status != 200, Not canonical, DOM > 1500, Images outer > 0 ([a4f323c](https://github.com/viasite/site-audit-seo/commit/a4f323c1b0691336cebc4a5cf78dec5adac9a452))
* out generated json size in MB ([dbff72d](https://github.com/viasite/site-audit-seo/commit/dbff72d6bcbfc6e7b32cd5f1f4c0fa68158e1776))



# [3.2.0](https://github.com/viasite/site-audit-seo/compare/v3.1.0...v3.2.0) (2020-08-22)


### Bug Fixes

* concurrency = 1 when lighthouse ([78a199d](https://github.com/viasite/site-audit-seo/commit/78a199d193f31907ac7a46d43a68662e51a2fe8d))
* local time in json upload name ([58ef6a3](https://github.com/viasite/site-audit-seo/commit/58ef6a370c92153a276e072270727587a607a1da))
* when upload, get only json basename, not full path ([93c3d92](https://github.com/viasite/site-audit-seo/commit/93c3d9291e4a5715aa31962615e034c9a3409c59))


### Features

* default columns for presets in json ([61c777a](https://github.com/viasite/site-audit-seo/commit/61c777abc78330d73023c8956cca01b65dc630fc))



# [3.1.0](https://github.com/viasite/site-audit-seo/compare/v3.0.0...v3.1.0) (2020-08-22)


### Bug Fixes

* "# Lighthouse" for main groups ([d4243eb](https://github.com/viasite/site-audit-seo/commit/d4243eb10b428198437e7f1dcb4b505a0a775ef2))
* better finish scan ([eb25a69](https://github.com/viasite/site-audit-seo/commit/eb25a6985e1101bf8800f5a8dc4b298da70b07c8))
* better json name for upload ([fc848a9](https://github.com/viasite/site-audit-seo/commit/fc848a99ed639cc6940545d7df4f18cee450d654))
* default concurrency = 1 when use --lighthouse ([e4cf923](https://github.com/viasite/site-audit-seo/commit/e4cf923f5468c78e767c042c4de42ebf4449c1ce))
* show uploaded json links when port 3001 is busy ([968dbd5](https://github.com/viasite/site-audit-seo/commit/968dbd5d55e5c57bb01e1f0279d0e8b2cee3afea))


### Features

* --lang [en,ru] ([8b9bece](https://github.com/viasite/site-audit-seo/commit/8b9bece5b27eb1d27389a2ede394ec152a865e1d))
* config file, add --xlsx option ([79aaa68](https://github.com/viasite/site-audit-seo/commit/79aaa68a9bfaf6189ca74e1b8a1ce47a40660572))
* now default output dir is ~/site-audit-seo/, not current dir ([e38af7d](https://github.com/viasite/site-audit-seo/commit/e38af7d8b2f4bf35a88861ca798625da3e18f3e2))
* now default save as json, now as xlsx ([803727b](https://github.com/viasite/site-audit-seo/commit/803727baf19c85069d7afb97509bb036d1dacf2d))
* now default save as json, remove json, not save as xlsx ([a6ed60d](https://github.com/viasite/site-audit-seo/commit/a6ed60d0cab9c9435ae4bb07034588dfc6f6b9b0))
* use current locale language (only ru/en, default en) ([a2461a0](https://github.com/viasite/site-audit-seo/commit/a2461a0f821fa83dfd3c758733e1b77243603226))



# [3.0.0](https://github.com/viasite/site-audit-seo/compare/v2.9.0...v3.0.0) (2020-08-21)


### Bug Fixes

* change to site-audit-seo-viewer web view ([e49edee](https://github.com/viasite/site-audit-seo/commit/e49edeebc02c34b338260343b075e6f4fc3fcf9d))
* field values based validation for lighthouse ([d93cf1a](https://github.com/viasite/site-audit-seo/commit/d93cf1ad599fc2925b959ea235060e08bcc642a7))
* lighthouse group main ([6e7f26b](https://github.com/viasite/site-audit-seo/commit/6e7f26b9fc3202de88d8af604b76899212cab178))
* save as JSON: integer type for correct sorting ([fa48b5a](https://github.com/viasite/site-audit-seo/commit/fa48b5a3b998c52322a8e9a0ae32c27cff12067d))


### Features

* --json, save results to .json file ([6347757](https://github.com/viasite/site-audit-seo/commit/634775725e18359070b71c8841576697c1446f36))
* --lighthouse appends base Lighthouse fields to any preset ([fe6d274](https://github.com/viasite/site-audit-seo/commit/fe6d274d546aa28e6eb753bf7e8658c92d511b56))
* --no-open-file ([ac38d77](https://github.com/viasite/site-audit-seo/commit/ac38d777cb1944b6430cda37bded45efad782fa7))
* --preset lighthouse-all ([15597de](https://github.com/viasite/site-audit-seo/commit/15597de1ef5b7c7fe229c884d5c7f6676b428d00))
* --upload report to persistent public store ([192665e](https://github.com/viasite/site-audit-seo/commit/192665e4dd16f9144bcd912c4dc0c2130a7921b3))
* export as json, named all fields ([eef898b](https://github.com/viasite/site-audit-seo/commit/eef898bc29e76a7e07938d94a18aeb375d85986e))
* filters, columns and default - new fields in json ([249d4f3](https://github.com/viasite/site-audit-seo/commit/249d4f383929370eb61c61301db4ea50b0e497de))
* web viewer for json ([b76b4dc](https://github.com/viasite/site-audit-seo/commit/b76b4dc049aee5b1daf29fd29cd2eb2802590260))



# [2.9.0](https://github.com/viasite/site-audit-seo/compare/v2.8.0...v2.9.0) (2020-08-16)


### Features

* export xlsx report to Google Drive ([c7c3458](https://github.com/viasite/site-audit-seo/commit/c7c3458bf2ecceab27a8e2a4b3e481c06f9e7cf1))



# [2.8.0](https://github.com/viasite/site-audit-seo/compare/v2.7.1...v2.8.0) (2020-08-16)


### Bug Fixes

* shortened lighthouse column names ([ade33ef](https://github.com/viasite/site-audit-seo/commit/ade33ef05b515a213e4a3b5a665ffc82008bec90))


### Features

* --fields 'title=$("title").text()' ([5b130d0](https://github.com/viasite/site-audit-seo/commit/5b130d0f4e940f0e0b2c8d20d3b1747ebf64a6e9))
* display scan parameters on start ([9bfb201](https://github.com/viasite/site-audit-seo/commit/9bfb20190edf7df2ade03888d50354c5aed5d2cb))
* success colors for lighthouse in xlsx ([c31e554](https://github.com/viasite/site-audit-seo/commit/c31e5543209c6d7eed9041bc618f0148ebd667fd))



## [2.7.1](https://github.com/viasite/site-audit-seo/compare/v2.7.0...v2.7.1) (2020-08-14)


### Bug Fixes

* lighthouse memory leak fix: now only 1 chrome instance for lighthouse ([2ebf375](https://github.com/viasite/site-audit-seo/commit/2ebf375b449b108f458224fa4d9d28c1ca9d623b))



# [2.7.0](https://github.com/viasite/site-audit-seo/compare/v2.6.0...v2.7.0) (2020-08-13)


### Features

* --preset lighthouse ([07f50c2](https://github.com/viasite/site-audit-seo/commit/07f50c2bfade202eda366b531183d40d43d65cee))



# [2.6.0](https://github.com/viasite/site-audit-seo/compare/v2.5.0...v2.6.0) (2020-07-26)


### Features

* --exclude fields from result ([1a1b7d7](https://github.com/viasite/site-audit-seo/commit/1a1b7d7fc286e2d9a3288a0af120083b94cb596b))



# [2.5.0](https://github.com/viasite/site-audit-seo/compare/v2.4.1...v2.5.0) (2020-07-20)


### Features

* open file after scan on Windows and MacOS, --open-file ([f1cee2a](https://github.com/viasite/site-audit-seo/commit/f1cee2a5d0acd3d365544d674a0195ad689007f7))



## [2.4.1](https://github.com/viasite/site-audit-seo/compare/v2.4.0...v2.4.1) (2020-05-08)


### Bug Fixes

* title validate ([41b72fd](https://github.com/viasite/site-audit-seo/commit/41b72fd4088cff5943f78f7510ab76c16acb8449))



# [2.4.0](https://github.com/viasite/site-audit-seo/compare/v2.3.3...v2.4.0) (2020-05-08)


### Features

* validation summary ([e9a0917](https://github.com/viasite/site-audit-seo/commit/e9a0917bb60ddec752bf5e150196f53d61182592))



## [2.3.3](https://github.com/viasite/site-audit-seo/compare/v2.3.2...v2.3.3) (2020-05-06)


### Bug Fixes

* switch to @popstas/headless-chrome-crawler was not finished ([786ad89](https://github.com/viasite/site-audit-seo/commit/786ad896b59cff021cd574d669cf1455ab2a4d53))


### Features

* canonical_count ([b986eec](https://github.com/viasite/site-audit-seo/commit/b986eec052d8f2dd09f31b04e1845c75b4601bc1))



## [2.3.2](https://github.com/viasite/site-audit-seo/compare/v2.3.1...v2.3.2) (2020-05-05)



## [2.3.1](https://github.com/viasite/site-audit-seo/compare/v2.3.0...v2.3.1) (2020-05-05)


### Bug Fixes

*  canonical and url fix for non-ascii urls ([5600e68](https://github.com/viasite/site-audit-seo/commit/5600e68c44b6d443e401e9b1c20d2443ff0fcd5a))
* -m alias for --max-requests ([b744d04](https://github.com/viasite/site-audit-seo/commit/b744d049959ed8d00da71f4a6be3e3d81696998a))
* add ppt, pptx to docs extensions ([ab21e61](https://github.com/viasite/site-audit-seo/commit/ab21e61a937be574ef575ff44d1d5dfd908ea5b5))
* change validation colors, background in place of font color ([4e4df1a](https://github.com/viasite/site-audit-seo/commit/4e4df1ae91e3e03dab10e485d21fd3db1519d2f9))
* errors while doc request (ignore docs in 'request' handler) ([dc0f4b6](https://github.com/viasite/site-audit-seo/commit/dc0f4b6529846e34bc60a17a6eca165d079111ae))
* exception while trying docs validate ([0e71bf1](https://github.com/viasite/site-audit-seo/commit/0e71bf1f037f1933f0002e5d65d8062d4ed60fa9))
* fix images_outer for src like "images/img.jpg", "data:..." ([dd84e51](https://github.com/viasite/site-audit-seo/commit/dd84e516ac722253371b661ad22b730ff55d4c4a))


### Features

* --csv, only convert csv to xlsx ([59449b1](https://github.com/viasite/site-audit-seo/commit/59449b1b030755e3670e096718d4db09352401a6))
* --delay between requests ([cc15ea8](https://github.com/viasite/site-audit-seo/commit/cc15ea81d1a2fda467a9f9db1506a3e7551906e6))
* --ignore-robots-txt ([33535b2](https://github.com/viasite/site-audit-seo/commit/33535b2cee4cd54851302aedc369c367e9008ab0))
* console output of non-200 http codes ([009dedb](https://github.com/viasite/site-audit-seo/commit/009dedb9a1e17a1525b4e3ad9a062a9d55426839))
* images_outer ([007995d](https://github.com/viasite/site-audit-seo/commit/007995d2d5701c83a9147ff924a5170b8338c698))
* text_ratio validate (<10% warning) ([db47575](https://github.com/viasite/site-audit-seo/commit/db47575a3790eb126d473a62844d15ce2b93fc29))
* validation results in console, --no-console-validate ([ee63716](https://github.com/viasite/site-audit-seo/commit/ee63716a7cb9947d776870f371d77bcc99f9e971))



# [2.3.0](https://github.com/viasite/site-audit-seo/compare/v2.2.0...v2.3.0) (2020-04-18)


### Bug Fixes

* --skip-static and --concurrency fix ([086eabd](https://github.com/viasite/site-audit-seo/commit/086eabd90b26b2238433705dc3706a662310c9f5))
* better width fitting ([0942833](https://github.com/viasite/site-audit-seo/commit/0942833121013520662393862f666597ff639553))
* h1 warning validation ([9aabfc7](https://github.com/viasite/site-audit-seo/commit/9aabfc788a644d317df007053cbf0fbfc00c2389))
* message when max requests reached ([6693528](https://github.com/viasite/site-audit-seo/commit/6693528582041d1339e5433c5f2304f2b729d72d))
* retry save xls after 10 seconds when file busy ([7b54273](https://github.com/viasite/site-audit-seo/commit/7b5427367ec9b5b179f1274c472d05f66af78d17))


### Features

* --no-limit-domain ([b765ce7](https://github.com/viasite/site-audit-seo/commit/b765ce7548ad35cf0f7e0aba22a29bdf7f938104))
* add --docs-extensions ([4903598](https://github.com/viasite/site-audit-seo/commit/4903598eeeafc600c267dcb228bca2cd63178326))



# [2.2.0](https://github.com/viasite/site-audit-seo/compare/v2.1.0...v2.2.0) (2020-04-18)


### Bug Fixes

*  switch to @popstas/xlsx-style package until author package update ([b26ec76](https://github.com/viasite/site-audit-seo/commit/b26ec7604ff055ec4e90919455408eb816b43942))
* not show is_canonical: 0 when canonical is empty ([31d0271](https://github.com/viasite/site-audit-seo/commit/31d027113ddfdb4173b2fff3422ad33288e396be))


### Features

* style and validation of xlsx ([eb99928](https://github.com/viasite/site-audit-seo/commit/eb99928847ce23b6c1bc0a6d3e458a0cb1966979))



# [2.1.0](https://github.com/viasite/site-audit-seo/compare/v2.0.1...v2.1.0) (2020-04-17)


### Bug Fixes

* https schema.org replace ([3c643b6](https://github.com/viasite/site-audit-seo/commit/3c643b6f8ce6ccb7bc7d18b0a3cb565f5aebf918))


### Features

* custom fields in command ([c0c42cd](https://github.com/viasite/site-audit-seo/commit/c0c42cd7f085857b2ef17f6c4c2a85437a9d7217))
* export to xlsx ([21406fb](https://github.com/viasite/site-audit-seo/commit/21406fb180d86ddf4b2fe09777e76a9c26901ed9))
* parse preset ([3330a60](https://github.com/viasite/site-audit-seo/commit/3330a60564ebc409f28f0520c381348b49f16319))
* schema_types (schema.org) ([bdde095](https://github.com/viasite/site-audit-seo/commit/bdde0953cf27dcc89947c7534829ac041f2ef9e8))



## [2.0.1](https://github.com/viasite/site-audit-seo/compare/v2.0.0...v2.0.1) (2020-04-15)


### Features

* console colors ([a78d9cb](https://github.com/viasite/site-audit-seo/commit/a78d9cbabafcced719ac19cee5308d2170b95e7b))



# [2.0.0](https://github.com/viasite/site-audit-seo/compare/v1.0.0...v2.0.0) (2020-04-15)


### Bug Fixes

* add filters /?catalog_view=, /?SORT=, /filter/clear/apply/ ([802635f](https://github.com/viasite/site-audit-seo/commit/802635f54d77955cdf2249f768e12357bb1b0797))
* ignore http scan while first page was https ([be62808](https://github.com/viasite/site-audit-seo/commit/be628081284d74fa5f08e210a0e20c9aa149fa0f))


### Features

* command line interface ([5b62d72](https://github.com/viasite/site-audit-seo/commit/5b62d72a5096d33c797ca0a8e48be4b3ca3edd3c))
* images_alt_empty ([f953b96](https://github.com/viasite/site-audit-seo/commit/f953b961174446de7b02575d98a1baa08a603d25))
* images, images_without_alt ([2431b53](https://github.com/viasite/site-audit-seo/commit/2431b53787653ed402118a9f6cb572655142399f))
* links, links_inner, links_outer, text_ratio_percent ([14cb3fa](https://github.com/viasite/site-audit-seo/commit/14cb3fa4a8ec4fd226687443a5d30aff8182461d))
* log robots.txt disallow to console ([4ef6a8e](https://github.com/viasite/site-audit-seo/commit/4ef6a8ea73ed0a18fed5ff05b3921830a46aad5b))
* mixed_content_url ([e058452](https://github.com/viasite/site-audit-seo/commit/e058452f3970492704acda0cbab7e49d85ca0f54))



# [1.0.0](https://github.com/viasite/site-audit-seo/compare/de18f1eb16f4e55c3b89559b86fe0eec9ee0a2af...v1.0.0) (2020-03-11)


### Bug Fixes

* fix freeze when exception while pageEvaluate (collect page data), add html_size ([5b2541e](https://github.com/viasite/site-audit-seo/commit/5b2541e2df030b2044357a590aa98d64c0a3f5f4))
* h1 trim ([67fbc0d](https://github.com/viasite/site-audit-seo/commit/67fbc0d7af363df17d39995879f175b40d297c12))
* ignore /?display= ([2b08a55](https://github.com/viasite/site-audit-seo/commit/2b08a555bac55da66629488cf2342ffb3ab0e979))
* ignore bitrix redirects ([b310334](https://github.com/viasite/site-audit-seo/commit/b310334318f51c7893f35a78d74f15a75c2ad1e5))
* ignore case on extension check ([be5407e](https://github.com/viasite/site-audit-seo/commit/be5407e7ff0ca0057cefab46ea0dcafffa390a77))
* move basic options to index.js ([f7e1d6b](https://github.com/viasite/site-audit-seo/commit/f7e1d6b63ab4ff12bf43a5ebd6f26878a8500e09))
* move canonical after url ([3c74a10](https://github.com/viasite/site-audit-seo/commit/3c74a106927f531791a7f9cb6045678c71a46679))
* remove url duplicates ([110b379](https://github.com/viasite/site-audit-seo/commit/110b37907edd6862e902b528add8b77c6edc6aea))
* save csv for Excel ([c9e3004](https://github.com/viasite/site-audit-seo/commit/c9e300425ef21b03f8605cfab53bea336802e4ad))


### Features

* add referer page ([572411f](https://github.com/viasite/site-audit-seo/commit/572411f6b510747ff1dab2a8eeff1d8f0a4759d4))
* add skip_static to options ([7981e9b](https://github.com/viasite/site-audit-seo/commit/7981e9b8ffa07cddfc67df59ea6f4ad88809c129))
* fields presets ([0577b39](https://github.com/viasite/site-audit-seo/commit/0577b39a72d35dc9882c9ceb8bbccd5997723c68))
* ignore css and js ([a203275](https://github.com/viasite/site-audit-seo/commit/a203275a7ab5dbd73ccb0473a2560619ca8744ab))
* is_canonical ([e6b0377](https://github.com/viasite/site-audit-seo/commit/e6b037723f5ddf86110266fd7badcd0a9d602cf4))
* move sites list to data/sites.conf ([68f16ca](https://github.com/viasite/site-audit-seo/commit/68f16cabe61b72e87283e36f2ad779d14eb49563))
* optional encode csv to win1251 ([f025b7f](https://github.com/viasite/site-audit-seo/commit/f025b7fdab488d4db6d2eb2dbdc7c306964e6805))
* progress, show page count, time per page ([b6aa6f4](https://github.com/viasite/site-audit-seo/commit/b6aa6f4f4126e9aa028d270c13a1c69cbef7b778))
* progress: more verbose output, queue size, events ([a115e7c](https://github.com/viasite/site-audit-seo/commit/a115e7c1fa3568b4df7f1ed0d52ebe4088d1e678))
* request_time, h1, h1-h4 count, dom_count ([29c2f86](https://github.com/viasite/site-audit-seo/commit/29c2f868d2ab8334534857ad81982e6002235c2f))
* scrap site list ([de18f1e](https://github.com/viasite/site-audit-seo/commit/de18f1eb16f4e55c3b89559b86fe0eec9ee0a2af))



