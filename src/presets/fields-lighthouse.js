const fields = [
    {
        "name": "lighthouse_first-contentful-paint",
        "comment": "First Contentful Paint",
        "description": "Первая отрисовка контента – показатель, который определяет интервал времени между началом загрузки страницы и появлением первого изображения или блока текста. [Подробнее…](https://web.dev/first-contentful-paint/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Показатели"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_speed-index",
        "comment": "Speed Index",
        "description": "Индекс скорости загрузки показывает, как быстро на странице появляется контент. [Подробнее…](https://web.dev/speed-index/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Показатели"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_largest-contentful-paint",
        "comment": "Largest Contentful Paint",
        "description": "Отрисовка крупного контента – показатель, который определяет время, требуемое на полную отрисовку крупного текста или изображения. [Подробнее…](https://web.dev/lighthouse-largest-contentful-paint/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Показатели"
        ],
        "type": "integer",
        stat: {
            type: 'ranges',
            ranges: ['< 2500', '2500-4000', '> 4000']
        }
    },
    {
        "name": "lighthouse_interactive",
        "comment": "Time to Interactive",
        "description": "Время загрузки для взаимодействия – это время, в течение которого страница становится полностью готова к взаимодействию с пользователем. [Подробнее…](https://web.dev/interactive/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Показатели"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_total-blocking-time",
        "comment": "Total Blocking Time",
        "description": "Сумма (в миллисекундах) всех периодов от первой отрисовки контента до загрузки для взаимодействия, когда скорость выполнения задач превышала 50 мс. [Подробнее…](https://web.dev/lighthouse-total-blocking-time/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Показатели"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_cumulative-layout-shift",
        "comment": "Cumulative Layout Shift",
        "description": "Совокупное смещение макета – это процентная величина, на которую смещаются видимые элементы области просмотра при загрузке. [Подробнее…](https://web.dev/cls/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Показатели"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_first-cpu-idle",
        "comment": "Время окончания работы ЦП",
        "description": "Время окончания работы ЦП – время, когда на странице становится возможна обработка пользовательского ввода.  [Подробнее…](https://web.dev/first-cpu-idle/)",
        "groups": [
            "# Lighthouse: Производительность"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_max-potential-fid",
        "comment": "Макс. потенц. задержка после первого ввода",
        "description": "Максимальная потенциальная задержка после первого ввода показывает время выполнения самой длительной задачи. [Подробнее…](https://web.dev/lighthouse-max-potential-fid/)",
        "groups": [
            "# Lighthouse: Производительность"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_first-meaningful-paint",
        "comment": "Время загрузки достаточной части контента",
        "description": "Первая значимая отрисовка – показатель, определяющий интервал времени между началом загрузки страницы и появлением основного контента. [Подробнее…](https://web.dev/first-meaningful-paint/)",
        "groups": [
            "# Lighthouse: Производительность"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_estimated-input-latency",
        "comment": "Приблизительное время задержки при вводе",
        "description": "Примерное время задержки при вводе показывает время в миллисекундах, через которое приложение реагирует на действия пользователя в течение самых активных 5 секунд загрузки страницы. Если это время превышает 50 мс, пользователям может показаться, что ваше приложение работает слишком медленно. [Подробнее…](https://web.dev/estimated-input-latency/)",
        "groups": [
            "# Lighthouse: Производительность"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_render-blocking-resources",
        "comment": "Устраните ресурсы, блокирующие отображение",
        "description": "Некоторые ресурсы блокируют первую отрисовку страницы. Рекомендуем встроить критическую часть данных JS/CSS в код HTML и отложить загрузку остальных ресурсов. [Подробнее…](https://web.dev/render-blocking-resources/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Оптимизация"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_uses-responsive-images",
        "comment": "Настройте подходящий размер изображений",
        "description": "Чтобы сэкономить мобильный трафик и ускорить загрузку страницы, следите за тем, чтобы размеры ваших изображений соответствовали требованиям. [Подробнее…](https://web.dev/uses-responsive-images/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Оптимизация"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_offscreen-images",
        "comment": "Отложите загрузку скрытых изображений",
        "description": "Чтобы уменьшить время загрузки для взаимодействия, рекомендуем настроить отложенную загрузку скрытых изображений. Тогда основные ресурсы сайта будут загружаться в первую очередь. [Подробнее…](https://web.dev/offscreen-images/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Оптимизация"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_unminified-css",
        "comment": "Уменьшите размер кода CSS",
        "description": "Уменьшив файлы CSS, вы можете сократить объем полезной сетевой нагрузки. [Подробнее…](https://web.dev/unminified-css/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Оптимизация"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_unminified-javascript",
        "comment": "Уменьшите размер кода JavaScript",
        "description": "Уменьшив файлы JavaScript, вы можете сократить объем полезной нагрузки и время анализа скриптов. [Подробнее…](https://web.dev/unminified-javascript/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Оптимизация"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_unused-css-rules",
        "comment": "Удалите неиспользуемый код CSS",
        "description": "Чтобы сократить расход трафика, удалите ненужные правила из таблиц стилей и отложите загрузку кода CSS, который не используется в верхней части страницы. [Подробнее…](https://web.dev/unused-css-rules/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Оптимизация"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_unused-javascript",
        "comment": "Удалите неиспользуемый код JavaScript",
        "description": "Чтобы сократить расход трафика, удалите неиспользуемый код JavaScript. [Подробнее…](https://web.dev/unused-javascript/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Оптимизация"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_uses-optimized-images",
        "comment": "Настройте эффективную кодировку изображений",
        "description": "Оптимизированные изображения загружаются быстрее и меньше расходуют мобильный трафик. [Подробнее…](https://web.dev/uses-optimized-images/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Оптимизация"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_uses-webp-images",
        "comment": "Используйте современные форматы изображений",
        "description": "Форматы JPEG 2000, JPEG XR и WebP обеспечивают более эффективное сжатие по сравнению с PNG или JPEG, поэтому такие изображения загружаются быстрее и потребляют меньше трафика. [Подробнее…](https://web.dev/uses-webp-images/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Оптимизация"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_uses-text-compression",
        "comment": "Включите сжатие текста",
        "description": "Чтобы уменьшить расход сетевого трафика, рекомендуем сжимать текстовые ресурсы (gzip, deflate или brotli). [Подробнее…](https://web.dev/uses-text-compression/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Оптимизация"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_uses-rel-preconnect",
        "comment": "Используйте предварительное подключение к необходимым доменам",
        "description": "Чтобы быстро устанавливать соединение с необходимыми сторонними источниками, добавьте ресурсную подсказку `preconnect` или `dns-prefetch`. [Подробнее…](https://web.dev/uses-rel-preconnect/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Оптимизация"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_server-response-time",
        "comment": "Время до получения первого байта от сервера допустимое",
        "description": "Время ответа сервера для основного документа должно быть небольшим, так как все прочие запросы зависят от этого показателя. [Подробнее…](https://web.dev/time-to-first-byte/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Оптимизация"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_redirects",
        "comment": "Избегайте большого количества переадресаций",
        "description": "Переадресации могут стать причиной дополнительных задержек при загрузке страницы. [Подробнее…](https://web.dev/redirects/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Оптимизация"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_uses-rel-preload",
        "comment": "Настройте предварительную загрузку ключевых запросов",
        "description": "Чтобы основные ресурсы загружались в первую очередь, используйте для них элемент `<link rel=preload>`. [Подробнее…](https://web.dev/uses-rel-preload/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Оптимизация"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_uses-http2",
        "comment": "Use HTTP/2",
        "description": "Протокол HTTP/2 отличается от HTTP/1.1 массой преимуществ, включая бинарность, мультиплексирование запросов, а также возможность отправки данных по инициативе сервера. [Подробнее…](https://web.dev/uses-http2/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Оптимизация"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_efficient-animated-content",
        "comment": "Используйте видеоформаты для анимированного контента",
        "description": "Анимированный контент неэффективно загружать в виде больших GIF-файлов. Чтобы сэкономить сетевой трафик, используйте формат видео MPEG4/WebM для анимированного контента и формат изображений PNG/WebP – для статического. [Подробнее…](https://web.dev/efficient-animated-content/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Оптимизация"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_duplicated-javascript",
        "comment": "Удалите повторяющиеся модули из пакетов JavaScript",
        "description": "Чтобы сократить расход трафика, удалите из пакетов большие повторяющиеся модули JavaScript. ",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Оптимизация"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_legacy-javascript",
        "comment": "Не отправляйте устаревший код JavaScript в современные браузеры",
        "description": "Полизаполнения и преобразования позволяют работать с новыми функциями JavaScript в устаревших браузерах. Однако для большинства современных браузеров они не нужны. Используйте новую стратегию развертывания скриптов в пакетах JavaScript. Средство обнаружения модульных и немодульных функций сократит объем кода в современных браузерах и обеспечит поддержку устаревших браузеров. [Подробнее…](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Оптимизация"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_total-byte-weight",
        "comment": "Предотвращение чрезмерной нагрузки на сеть",
        "description": "Чрезмерная нагрузка на сеть стоит пользователям реальных денег и может стать причиной долгого ожидания при работе в Интернете. [Подробнее…](https://web.dev/total-byte-weight/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Диагностика"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_uses-long-cache-ttl",
        "comment": "Настройка правил эффективного использования кеша для статических объектов",
        "description": "Благодаря долгому времени хранения кеша страница может быстрее загружаться при повторных посещениях. [Подробнее…](https://web.dev/uses-long-cache-ttl/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Диагностика"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_dom-size",
        "comment": "Сокращение размера структуры DOM",
        "description": "Сложная структура DOM усилит использование памяти, замедлит [вычисление стилей](https://developers.google.com/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations) и увеличит затраты на [компоновку шаблонов](https://developers.google.com/speed/articles/reflow). [Подробнее…](https://web.dev/dom-size/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Диагностика"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_critical-request-chains",
        "comment": "Старайтесь не допускать создания цепочек критических запросов",
        "description": "Приведенные ниже цепочки критических запросов показывают, какие ресурсы загружаются с высоким приоритетом. Чтобы ускорить загрузку страниц, рекомендуем сократить длину цепочек, уменьшить размер скачиваемых ресурсов или отложить скачивание ненужных ресурсов. [Подробнее…](https://web.dev/critical-request-chains/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Диагностика"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_user-timings",
        "comment": "Метки и промежутки пользовательского времени",
        "description": "Используйте User Timing API, чтобы измерить реальную производительность своего приложения во время ключевых моментов взаимодействия с пользователями. [Подробнее…](https://web.dev/user-timings/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Диагностика"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_bootup-time",
        "comment": "Время выполнения кода JavaScript",
        "description": "Рекомендуем сократить время на анализ, компиляцию и выполнение скриптов JS. Для этого вы можете уменьшить размер фрагментов кода JS. [Подробнее…](https://web.dev/bootup-time/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Диагностика"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_mainthread-work-breakdown",
        "comment": "Минимизация работы в основном потоке",
        "description": "Рекомендуем сократить время на анализ, компиляцию и выполнение скриптов JS. Для этого вы можете уменьшить размер фрагментов кода JS. [Подробнее…](https://web.dev/mainthread-work-breakdown/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Диагностика"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_font-display",
        "comment": "Показ всего текста во время загрузки веб-шрифтов",
        "description": "Используйте свойство CSS font-display, чтобы пользователи могли видеть текст во время загрузки веб-шрифтов. [Подробнее…](https://web.dev/font-display/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Диагностика"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_performance-budget",
        "comment": "Бюджет производительности",
        "description": "Следите за тем, чтобы количество и размер сетевых запросов соответствовали целям, установленным в бюджете производительности. [Подробнее…](https://developers.google.com/web/tools/lighthouse/audits/budgets)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Бюджет"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_timing-budget",
        "comment": "Время на загрузку",
        "description": "Указав предельное время загрузки страниц сайта, вы сможете отслеживать его производительность. Показателями хорошей производительности являются быстрые загрузка страниц и обработка событий ввода. [Подробнее…](https://developers.google.com/web/tools/lighthouse/audits/budgets)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Бюджет"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_resource-summary",
        "comment": "Постарайтесь уменьшить количество запросов и размеры передаваемых данных",
        "description": "Чтобы установить бюджет для количества и размера ресурсов на странице, добавьте файл budget.json. [Подробнее…](https://web.dev/use-lighthouse-for-performance-budgets/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Диагностика"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_third-party-summary",
        "comment": "Уменьшение использования стороннего кода",
        "description": "Сторонний код может сильно замедлить загрузку страниц сайта. Рекомендуем использовать только самые необходимые сторонние ресурсы и сделать так, чтобы они загружались в последнюю очередь. [Подробнее…](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Диагностика"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_largest-contentful-paint-element",
        "comment": "Элемент \"Отрисовка самого крупного контента\"",
        "description": "Это самый большой элемент контента, отрисованный в области просмотра. [Подробнее…](https://web.dev/lighthouse-largest-contentful-paint/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Диагностика"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_layout-shift-elements",
        "comment": "Устраните большие смещения макета",
        "description": "Эти элементы DOM больше всего влияют на совокупное смещение макета страницы.",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Диагностика"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_uses-passive-event-listeners",
        "comment": "Пассивные прослушиватели событий используются для улучшения производительности при прокрутке",
        "description": "Чтобы повысить производительность при прокрутке страницы, используйте флаг `passive` для прослушивателей событий прикосновения и колеса мыши. [Подробнее…](https://web.dev/uses-passive-event-listeners/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Диагностика"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_no-document-write",
        "comment": "Метод `document.write()` не используется",
        "description": "Использование метода `document.write()` для динамической подгрузки внешних скриптов может значительно замедлять загрузку страницы для пользователей с низкой скоростью подключения. [Подробнее…](https://web.dev/no-document-write/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Диагностика"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_long-tasks",
        "comment": "Избегайте длительных задач в основном потоке",
        "description": "Для основного потока создается список самых длительных задач. Это позволяет выявлять главные факторы, которые приводят к задержкам после ввода. [Подробнее…](https://web.dev/long-tasks-devtools/)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Диагностика"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_non-composited-animations",
        "comment": "Avoid non-composited animations",
        "description": "Animations which are not composited can be janky and contribute to CLS. [Learn more](https://developers.google.com/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Диагностика"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_unsized-images",
        "comment": "Image elements have explicit `width` and `height`",
        "description": "Always include explicit width and height on image elements to reduce layout shifts and improve CLS. [Learn more](https://web.dev/optimize-cls/#images-without-dimensions)",
        "groups": [
            "# Lighthouse: Производительность",
            "Производительность: Диагностика"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_network-requests",
        "comment": "Network Requests",
        "description": "Lists the network requests that were made during page load.",
        "groups": [
            "# Lighthouse: Производительность"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_network-rtt",
        "comment": "Время прохождения сигнала сети",
        "description": "Время прохождения сигнала сети (RTT) напрямую влияет на производительность сайта. Высокое время прохождения сигнала означает, что серверы расположены слишком далеко от пользователя и сайт будет работать медленнее. [Подробнее…](https://hpbn.co/primer-on-latency-and-bandwidth/)",
        "groups": [
            "# Lighthouse: Производительность"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_network-server-latency",
        "comment": "Задержка со стороны сервера",
        "description": "Задержки со стороны сервера могут влиять на скорость загрузки страниц. Высокое время реакции сервера говорит о его перегруженности или недостаточной производительности. [Подробнее…](https://hpbn.co/primer-on-web-performance/#analyzing-the-resource-waterfall)",
        "groups": [
            "# Lighthouse: Производительность"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_main-thread-tasks",
        "comment": "Tasks",
        "description": "Lists the toplevel main thread tasks that executed during page load.",
        "groups": [
            "# Lighthouse: Производительность"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_diagnostics",
        "comment": "Diagnostics",
        "description": "Collection of useful page vitals.",
        "groups": [
            "# Lighthouse: Производительность"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_metrics",
        "comment": "Metrics",
        "description": "Collects all available metrics.",
        "groups": [
            "# Lighthouse: Производительность"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_screenshot-thumbnails",
        "comment": "Screenshot Thumbnails",
        "description": "This is what the load of your site looked like.",
        "groups": [
            "# Lighthouse: Производительность"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_final-screenshot",
        "comment": "Final Screenshot",
        "description": "The last screenshot captured of the pageload.",
        "groups": [
            "# Lighthouse: Производительность"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_accesskeys",
        "comment": "`[accesskey]`: значения уникальны",
        "description": "Ключи доступа позволяют быстро перейти к нужной части страницы. Каждый из них должен быть уникальным. [Подробнее…](https://web.dev/accesskeys/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: Навигация"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_aria-allowed-attr",
        "comment": "Атрибуты `[aria-*]` соответствуют своим ролям",
        "description": "Каждая `role` ARIA поддерживает определенный набор атрибутов `aria-*`. Неверно присвоенные атрибуты `aria-*` будут недействительны. [Подробнее…](https://web.dev/aria-allowed-attr/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: ARIA"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_aria-hidden-body",
        "comment": "Элемент `<body>` в документе не содержит атрибут `[aria-hidden=\"true\"]`",
        "description": "Программы чтения с экрана могут работать некорректно, если для элемента `<body>` в документе настроен атрибут `aria-hidden=\"true\"`. [Подробнее…](https://web.dev/aria-hidden-body/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: ARIA"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_aria-hidden-focus",
        "comment": "Элементы, к которым применен атрибут `[aria-hidden=\"true\"]`, не содержат активных дочерних элементов",
        "description": "Если к родительскому элементу применен атрибут `[aria-hidden=\"true\"]`, то все его активные дочерние элементы станут недоступны для программ чтения с экрана. [Подробнее…](https://web.dev/aria-hidden-focus/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: ARIA"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_aria-input-field-name",
        "comment": "У полей ввода ARIA есть доступные названия",
        "description": "Если у поля ввода нет названия, доступного программам чтения с экрана, пользователи услышат слово \"поле ввода\", но не поймут, для чего оно нужно. [Подробнее…](https://web.dev/aria-input-field-name/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: ARIA"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_aria-required-attr",
        "comment": "У элементов `[role]` есть все необходимые атрибуты `[aria-*]`",
        "description": "К некоторым ролям ARIA требуется добавить атрибуты, описывающие состояние элемента для программ чтения с экрана. [Подробнее…](https://web.dev/aria-required-attr/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: ARIA"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_aria-required-children",
        "comment": "В элементах с ролью ARIA `[role]` присутствуют все обязательные дочерние элементы, которые должны содержать определенный элемент `[role]`.",
        "description": "Некоторые родительские элементы с ролями ARIA должны содержать определенные дочерние роли, иначе связанные с ними функции специальных возможностей будут работать неправильно. [Подробнее…](https://web.dev/aria-required-children/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: ARIA"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_aria-required-parent",
        "comment": "Элементы с атрибутом `[role]` содержатся в своих родительских элементах",
        "description": "Некоторые дочерние элементы с ролями ARIA должны содержаться внутри определенных родительских элементов, иначе связанные с ними функции специальных возможностей будут работать неправильно. [Подробнее…](https://web.dev/aria-required-parent/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: ARIA"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_aria-roles",
        "comment": "Недействительные значения атрибутов `[role]` отсутствуют",
        "description": "Значения ролей ARIA должны быть действительными, иначе связанные с ними функции будут работать неправильно. [Подробнее…](https://web.dev/aria-roles/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: ARIA"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_aria-toggle-field-name",
        "comment": "У переключателей ARIA есть доступные названия",
        "description": "Если у переключателя нет названия, доступного программам чтения с экрана, пользователи услышат слово \"переключатель\", но не поймут, для чего он нужен. [Подробнее…](https://web.dev/aria-toggle-field-name/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: ARIA"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_aria-valid-attr-value",
        "comment": "Недействительные значения атрибутов `[aria-*]` отсутствуют",
        "description": "Программы чтения с экрана не могут распознавать атрибуты ARIA с недействительными значениями. [Подробнее…](https://web.dev/aria-valid-attr-value/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: ARIA"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_aria-valid-attr",
        "comment": "Атрибуты `[aria-*]` действительны и написаны без ошибок",
        "description": "Программы чтения с экрана не могут интерпретировать атрибуты ARIA с недействительными названиями. [Подробнее…](https://web.dev/aria-valid-attr/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: ARIA"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_button-name",
        "comment": "Названия кнопок доступны программам чтения с экрана",
        "description": "Если у кнопки нет названия, доступного программам чтения с экрана, пользователи услышат слово \"кнопка\", но не поймут, для чего она нужна. [Подробнее…](https://web.dev/button-name/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: Названия и ярлыки"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_bypass",
        "comment": "Страница содержит заголовок, ссылку для пропуска контента или указание региона",
        "description": "Чтобы пользователям было проще перемещаться по странице с помощью клавиатуры, добавьте возможность пропускать повторяющийся контент. [Подробнее…](https://web.dev/bypass/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: Навигация"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_color-contrast",
        "comment": "Цвета фона и переднего плана достаточно контрастны",
        "description": "Многие пользователи не могут разобрать или не видят текст с низкой контрастностью. [Подробнее…](https://web.dev/color-contrast/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: Контрастность"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_definition-list",
        "comment": "Элементы `<dl>` содержат только правильно размещенные группы `<dt>` и `<dd>` и элементы `<script>`, `<template>` или `<div>`.",
        "description": "Если в структуре списков определений есть ошибки, программы чтения с экрана могут неправильно их озвучивать. [Подробнее…](https://web.dev/definition-list/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: Таблицы и списки"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_dlitem",
        "comment": "Элементы списков определений расположены внутри элементов `<dl>`",
        "description": "Чтобы программы чтения с экрана правильно озвучивали элементы списков определений `<dt>` и `<dd>`, они должны располагаться внутри родительского элемента `<dl>`. [Подробнее…](https://web.dev/dlitem/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: Таблицы и списки"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_document-title",
        "comment": "В документе нет элемента `<title>`",
        "description": "Элемент title нужен для того, чтобы программы чтения с экрана могли озвучивать название страницы. Также он появляется в результатах поиска и позволяет определять, соответствует ли сайт запросу. [Подробнее…](https://web.dev/document-title/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: Названия и ярлыки"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_duplicate-id-active",
        "comment": "Атрибуты `[id]` у активных элементов уникальны",
        "description": "Чтобы сервисы специальных возможностей могли считывать все активные элементы, их атрибуты `id` должны быть уникальными. [Подробнее…](https://web.dev/duplicate-id-active/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: Навигация"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_duplicate-id-aria",
        "comment": "Идентификаторы ARIA уникальны",
        "description": "Значение идентификатора ARIA должно быть уникальным, так как программы для людей с ограниченными возможностями могут игнорировать повторяющиеся идентификаторы. [Подробнее…](https://web.dev/duplicate-id-aria/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: ARIA"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_form-field-multiple-labels",
        "comment": "В форме нет полей с несколькими ярлыками",
        "description": "Когда программам чтения с экрана встречаются поля формы с несколькими ярлыками, они озвучивают только первый, последний или все ярлыки. Это может запутать пользователей. [Подробнее…](https://web.dev/form-field-multiple-labels/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: Названия и ярлыки"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_frame-title",
        "comment": "У элементов `<frame>` и `<iframe>` есть атрибут title",
        "description": "Чтобы программы чтения с экрана могли описывать содержимое фреймов, для каждого из них должен быть указан атрибут title. [Подробнее…](https://web.dev/frame-title/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: Названия и ярлыки"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_heading-order",
        "comment": "Элементы заголовков расположены последовательно в порядке убывания",
        "description": "Когда заголовки расположены в правильном порядке и между их уровнями нет пропусков, они образуют семантическую структуру страницы. Благодаря этому навигация с помощью сервисов специальных возможностей становится проще и понятнее. [Подробнее…](https://web.dev/heading-order/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: Навигация"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_html-has-lang",
        "comment": "Для элемента `<html>` не задан атрибут `[lang]`",
        "description": "Если для страницы не указан атрибут lang, программа чтения с экрана предполагает, что текст приведен на языке по умолчанию, выбранном пользователем при установке программы. Если текст написан на другом языке, он может озвучиваться некорректно. [Подробнее…](https://web.dev/html-has-lang/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: Интернационализация и локализация"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_html-lang-valid",
        "comment": "Для элемента `<html>` указано действительное значение атрибута `[lang]`",
        "description": "Чтобы программы чтения с экрана правильно озвучивали текст, укажите действительный [языковой тег BCP 47](https://www.w3.org/International/questions/qa-choosing-language-tags#question). [Подробнее…](https://web.dev/html-lang-valid/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: Интернационализация и локализация"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_image-alt",
        "comment": "У элементов изображений есть атрибут `[alt]`",
        "description": "В информационных элементах должен содержаться короткий и ясный альтернативный текст. Если элемент декоративный, то атрибут alt для него можно оставить пустым. [Подробнее…](https://web.dev/image-alt/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: Названия и ярлыки"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_input-image-alt",
        "comment": "Элементы `<input type=\"image\">` содержат атрибут `[alt]`",
        "description": "Если в элементе `<input>` в качестве кнопки используется изображение, добавьте альтернативный текст, описывающий назначение этой кнопки для программ чтения с экрана. [Подробнее…](https://web.dev/input-image-alt/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: Названия и ярлыки"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_label",
        "comment": "Элементам формы присвоены соответствующие ярлыки",
        "description": "Ярлыки нужны для того, чтобы программы чтения с экрана могли правильно озвучивать элементы управления формой. [Подробнее…](https://web.dev/label/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: Названия и ярлыки"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_layout-table",
        "comment": "В элементах `<table>` с атрибутом role=\"presentation\" не используются элементы `<th>` и `<caption>` или атрибут `[summary]`",
        "description": "В таблице, используемой в качестве основы дизайна веб-страницы, не должны содержаться элементы данных, например th, caption или атрибут summary, так как они могут создать трудности для тех, кто использует программы чтения с экрана. [Подробнее…](https://web.dev/layout-table/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: Таблицы и списки"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_link-name",
        "comment": "Текст ссылок различим для программ чтения с экрана",
        "description": "Текст ссылок (как и альтернативный текст для изображений, используемых в качестве ссылок) должен быть уникальным, фокусируемым и доступным для программ чтения с экрана. [Подробнее…](https://web.dev/link-name/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: Названия и ярлыки"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_list",
        "comment": "В списках содержатся только элементы `<li>` и элементы поддержки скрипта (`<script>` и `<template>`)",
        "description": "Используйте правильную структуру кода при верстке списков, иначе программы чтения с экрана будут неправильно их озвучивать. [Подробнее…](https://web.dev/list/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: Таблицы и списки"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_listitem",
        "comment": "Элементы списка `<li>` расположены внутри родительских элементов `<ul>` или `<ol>`",
        "description": "Чтобы программы чтения с экрана правильно озвучивали списки, элементы `<li>` должны располагаться внутри родительских элементов `<ul>` или `<ol>`. [Подробнее…](https://web.dev/listitem/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: Таблицы и списки"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_meta-refresh",
        "comment": "В документе не используется метатег `<meta http-equiv=\"refresh\">`",
        "description": "Когда страница обновляется автоматически, фокус, используемый программами для чтения с экрана, перемещается в верхнюю часть. Это может раздражать пользователей и мешать их работе. [Подробнее…](https://web.dev/meta-refresh/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: Рекомендации"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_meta-viewport",
        "comment": "Атрибут `[user-scalable=\"no\"]` не используется в элементе `<meta name=\"viewport\">`, и значение атрибута `[maximum-scale]` больше или равно 5",
        "description": "Не отключайте масштабирование: эта функция помогает слабовидящим пользователям читать информацию на веб-страницах. [Подробнее…](https://web.dev/meta-viewport/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: Рекомендации"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_object-alt",
        "comment": "Элементы `<object>` содержат атрибут `[alt]`",
        "description": "Чтобы программы чтения с экрана могли озвучивать содержимое элементов `<object>`, добавьте к ним атрибут alt. [Подробнее…](https://web.dev/object-alt/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: Названия и ярлыки"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_tabindex",
        "comment": "Нет элементов со значением атрибута `[tabindex]` выше 0",
        "description": "Значение больше 0 подразумевает определенный порядок навигации. Это может создавать трудности для пользователей с ограниченными возможностями. [Подробнее…](https://web.dev/tabindex/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: Навигация"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_td-headers-attr",
        "comment": "Ячейки внутри элемента `<table>`, в которых используется атрибут `[headers]`, ссылаются на ячейки той же таблицы.",
        "description": "Чтобы пользователям было проще перемещаться по таблицам с помощью программ чтения с экрана, убедитесь, что ячейки в элементах `<td>` с атрибутом `[headers]` ссылаются только на другие ячейки в той же таблице. [Подробнее…](https://web.dev/td-headers-attr/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: Таблицы и списки"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_th-has-data-cells",
        "comment": "В элементах `<th>` и элементах с атрибутом `[role=\"columnheader\"/\"rowheader\"]` есть описываемые ими ячейки с данными",
        "description": "Чтобы пользователям было проще перемещаться по таблицам с помощью программ чтения с экрана, убедитесь, что все заголовки в таблицах ссылаются на определенный набор ячеек. [Подробнее…](https://web.dev/th-has-data-cells/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: Таблицы и списки"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_valid-lang",
        "comment": "Недействительные значения атрибутов `[lang]` отсутствуют",
        "description": "Чтобы программы чтения с экрана правильно озвучивали текст, укажите для элементов корректный [языковой тег BCP 47](https://www.w3.org/International/questions/qa-choosing-language-tags#question). [Подробнее…](https://web.dev/valid-lang/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: Интернационализация и локализация"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_video-caption",
        "comment": "Элементы `<video>` содержат элемент `<track>` с атрибутом `[kind=\"captions\"]`",
        "description": "Чтобы информация, озвучиваемая в видео, была доступна людям с нарушениями слуха, добавьте субтитры. [Подробнее…](https://web.dev/video-caption/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: Аудио и видео"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_video-description",
        "comment": "Элементы `<video>` содержат элемент `<track>` с атрибутом `[kind=\"description\"]`",
        "description": "Благодаря звуковым описаниям к видео слабовидящие пользователи могут узнавать, что происходит на экране в сценах без аудиосопровождения. [Подробнее…](https://web.dev/video-description/)",
        "groups": [
            "# Lighthouse: Специальные возможности",
            "Специальные возможности: Аудио и видео"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_logical-tab-order",
        "comment": "The page has a logical tab order",
        "description": "Tabbing through the page follows the visual layout. Users cannot focus elements that are offscreen. [Learn more](https://web.dev/logical-tab-order/).",
        "groups": [
            "# Lighthouse: Специальные возможности"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_focusable-controls",
        "comment": "Interactive controls are keyboard focusable",
        "description": "Custom interactive controls are keyboard focusable and display a focus indicator. [Learn more](https://web.dev/focusable-controls/).",
        "groups": [
            "# Lighthouse: Специальные возможности"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_interactive-element-affordance",
        "comment": "Interactive elements indicate their purpose and state",
        "description": "Interactive elements, such as links and buttons, should indicate their state and be distinguishable from non-interactive elements. [Learn more](https://web.dev/interactive-element-affordance/).",
        "groups": [
            "# Lighthouse: Специальные возможности"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_managed-focus",
        "comment": "The user's focus is directed to new content added to the page",
        "description": "If new content, such as a dialog, is added to the page, the user's focus is directed to it. [Learn more](https://web.dev/managed-focus/).",
        "groups": [
            "# Lighthouse: Специальные возможности"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_focus-traps",
        "comment": "User focus is not accidentally trapped in a region",
        "description": "A user can tab into and out of any control or region without accidentally trapping their focus. [Learn more](https://web.dev/focus-traps/).",
        "groups": [
            "# Lighthouse: Специальные возможности"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_custom-controls-labels",
        "comment": "Custom controls have associated labels",
        "description": "Custom interactive controls have associated labels, provided by aria-label or aria-labelledby. [Learn more](https://web.dev/custom-controls-labels/).",
        "groups": [
            "# Lighthouse: Специальные возможности"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_custom-controls-roles",
        "comment": "Custom controls have ARIA roles",
        "description": "Custom interactive controls have appropriate ARIA roles. [Learn more](https://web.dev/custom-control-roles/).",
        "groups": [
            "# Lighthouse: Специальные возможности"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_visual-order-follows-dom",
        "comment": "Visual order on the page follows DOM order",
        "description": "DOM order matches the visual order, improving navigation for assistive technology. [Learn more](https://web.dev/visual-order-follows-dom/).",
        "groups": [
            "# Lighthouse: Специальные возможности"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_offscreen-content-hidden",
        "comment": "Offscreen content is hidden from assistive technology",
        "description": "Offscreen content is hidden with display: none or aria-hidden=true. [Learn more](https://web.dev/offscreen-content-hidden/).",
        "groups": [
            "# Lighthouse: Специальные возможности"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_use-landmarks",
        "comment": "HTML5 landmark elements are used to improve navigation",
        "description": "Landmark elements (<main>, <nav>, etc.) are used to improve the keyboard navigation of the page for assistive technology. [Learn more](https://web.dev/use-landmarks/).",
        "groups": [
            "# Lighthouse: Специальные возможности"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_is-on-https",
        "comment": "Используется протокол HTTPS",
        "description": "Все сайты (даже если они не обрабатывают конфиденциальные данные) должны быть защищены протоколом HTTPS. Это в том числе означает, что не следует использовать [смешанный контент](https://developers.google.com/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content): не должно быть ситуаций, когда некоторые ресурсы загружаются по протоколу HTTP, хотя первоначальный запрос передается с применением HTTPS. Протокол HTTPS обеспечивает защиту от взлома и не позволяет посторонним узнавать, как пользователи взаимодействуют с приложением. Кроме того, использование этого протокола обязательно при работе с версией HTTP/2 и многими новыми API для веб-платформ. [Подробнее…](https://web.dev/is-on-https/)",
        "groups": [
            "# Lighthouse: Рекомендации",
            "Рекомендации: Надежность и безопасность"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_external-anchors-use-rel-noopener",
        "comment": "Ссылки на сторонние ресурсы безопасны",
        "description": "Добавьте атрибут `rel=\"noopener\"` или `rel=\"noreferrer\"` ко всем внешним ссылкам, чтобы повысить производительность и избежать уязвимостей в защите. [Подробнее…](https://web.dev/external-anchors-use-rel-noopener/)",
        "groups": [
            "# Lighthouse: Рекомендации",
            "Рекомендации: Надежность и безопасность"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_geolocation-on-start",
        "comment": "Разрешение на определение местоположения не запрашивается при загрузке страницы",
        "description": "Пользователи с подозрением относятся к сайтам, которые беспричинно запрашивают доступ к их местоположению. Мы рекомендуем связать этот запрос с определенными действиями пользователя. [Подробнее…](https://web.dev/geolocation-on-start/)",
        "groups": [
            "# Lighthouse: Рекомендации",
            "Рекомендации: Надежность и безопасность"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_notification-on-start",
        "comment": "Разрешение на отправку уведомлений не запрашивается при загрузке страницы",
        "description": "Пользователи с подозрением относятся к сайтам, которые беспричинно запрашивают разрешение на отправку уведомлений. Мы рекомендуем связать этот запрос с определенными жестами пользователя. [Подробнее…](https://web.dev/notification-on-start/)",
        "groups": [
            "# Lighthouse: Рекомендации",
            "Рекомендации: Надежность и безопасность"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_no-vulnerable-libraries",
        "comment": "Не содержит клиентские библиотеки JavaScript с известными уязвимостями",
        "description": "Некоторые сторонние скрипты содержат известные уязвимости, которые легко могут быть обнаружены и использованы злоумышленниками. [Подробнее…](https://web.dev/no-vulnerable-libraries/)",
        "groups": [
            "# Lighthouse: Рекомендации",
            "Рекомендации: Надежность и безопасность"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_password-inputs-can-be-pasted-into",
        "comment": "Вставка пароля из буфера обмена разрешена",
        "description": "Запрет на вставку пароля из буфера обмена отрицательно сказывается на безопасности пользователей. [Подробнее…](https://web.dev/password-inputs-can-be-pasted-into/)",
        "groups": [
            "# Lighthouse: Рекомендации",
            "Рекомендации: Удобство для пользователей"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_image-aspect-ratio",
        "comment": "Отсутствуют изображения с некорректным соотношением сторон",
        "description": "Размеры отображаемого изображения должны соответствовать нормальному соотношению сторон. [Подробнее…](https://web.dev/image-aspect-ratio/)",
        "groups": [
            "# Lighthouse: Рекомендации",
            "Рекомендации: Удобство для пользователей"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_image-size-responsive",
        "comment": "Изображения показываются в нужном разрешении",
        "description": "Чтобы обеспечить максимальное качество, размеры исходного изображения должны быть пропорциональны размерам при отображении на экране с учетом соотношения логических и физических пикселей. [Подробнее…](https://web.dev/serve-responsive-images/)",
        "groups": [
            "# Lighthouse: Рекомендации",
            "Рекомендации: Удобство для пользователей"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_doctype",
        "comment": "Активирован режим совместимости, так как на странице отсутствует элемент DOCTYPE",
        "description": "Если для страницы указан параметр DOCTYPE, браузер не будет переключаться в режим совместимости. [Подробнее…](https://web.dev/doctype/)",
        "groups": [
            "# Lighthouse: Рекомендации",
            "Рекомендации: Совместимость с браузерами"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_charset",
        "comment": "Объявление набора символов отсутствует или указано в неправильном месте на HTML-странице",
        "description": "Требуется задать кодировку символов. Это можно сделать с помощью тега <meta> в первых 1024 байтах HTML-страницы или в HTTP-заголовке ответа Content-Type. [Подробнее…](https://web.dev/charset/)",
        "groups": [
            "# Lighthouse: Рекомендации",
            "Рекомендации: Совместимость с браузерами"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_no-unload-listeners",
        "comment": "Не используются прослушиватели события `unload`",
        "description": "Cобытие `unload` активируется не всегда. Если ожидать его, это может привести к ошибкам средств оптимизации браузера, таких как функция Back-Forward Cache. Рекомендуем вместо него использовать событие `pagehide` или `visibilitychange`. [Подробнее…](https://developers.google.com/web/updates/2018/07/page-lifecycle-api#the-unload-event)",
        "groups": [
            "# Lighthouse: Рекомендации",
            "Рекомендации: Общие рекомендации"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_appcache-manifest",
        "comment": "Application Cache не используется",
        "description": "Application Cache больше не поддерживается. [Подробнее…](https://web.dev/appcache-manifest/)",
        "groups": [
            "# Lighthouse: Рекомендации",
            "Рекомендации: Общие рекомендации"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_js-libraries",
        "comment": "Обнаруженные библиотеки JavaScript",
        "description": "Все клиентские библиотеки JavaScript, обнаруженные на странице. [Подробнее…](https://web.dev/js-libraries/)",
        "groups": [
            "# Lighthouse: Рекомендации",
            "Рекомендации: Общие рекомендации"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_deprecations",
        "comment": "Устаревшие API не используются",
        "description": "Рано или поздно устаревшие API будут удалены из браузера. [Подробнее…](https://web.dev/deprecations/)",
        "groups": [
            "# Lighthouse: Рекомендации",
            "Рекомендации: Общие рекомендации"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_errors-in-console",
        "comment": "В журнале консоли нет ошибок браузера",
        "description": "Ошибки, записанные в журнале консоли, указывают на нерешенные проблемы. Это могут быть невыполненные сетевые запросы и другие сбои в работе браузера. [Подробнее…](https://web.dev/errors-in-console/)",
        "groups": [
            "# Lighthouse: Рекомендации",
            "Рекомендации: Общие рекомендации"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_viewport",
        "comment": "Отсутствует метатег `<meta name=\"viewport\">` со свойством `width` или `initial-scale`",
        "description": "Добавьте метатег `<meta name=\"viewport\">`, чтобы оптимизировать приложение для экранов мобильных устройств. [Подробнее…](https://web.dev/viewport/)",
        "groups": [
            "# Lighthouse: Поисковая оптимизация",
            "Поисковая оптимизация: Оптимизация для мобильных устройств"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_document-title",
        "comment": "В документе нет элемента `<title>`",
        "description": "Элемент title нужен для того, чтобы программы чтения с экрана могли озвучивать название страницы. Также он появляется в результатах поиска и позволяет определять, соответствует ли сайт запросу. [Подробнее…](https://web.dev/document-title/)",
        "groups": [
            "# Lighthouse: Поисковая оптимизация",
            "Поисковая оптимизация: Рекомендации в отношении контента"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_meta-description",
        "comment": "В документе нет метаописания",
        "description": "Метаописания содержат общие сведения о контенте страницы и могут быть показаны в результатах поиска. [Подробнее…](https://web.dev/meta-description/)",
        "groups": [
            "# Lighthouse: Поисковая оптимизация",
            "Поисковая оптимизация: Рекомендации в отношении контента"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_http-status-code",
        "comment": "Код статуса HTTP действителен",
        "description": "Индексация страниц с недействительным кодом статуса HTTP может быть нарушена. [Подробнее…](https://web.dev/http-status-code/)",
        "groups": [
            "# Lighthouse: Поисковая оптимизация",
            "Поисковая оптимизация: Сканирование и индексирование"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_link-text",
        "comment": "У ссылок есть описания",
        "description": "Добавьте к ссылкам текстовые описания, чтобы поисковые системы лучше распознавали ваш контент. [Подробнее…](https://web.dev/link-text/)",
        "groups": [
            "# Lighthouse: Поисковая оптимизация",
            "Поисковая оптимизация: Рекомендации в отношении контента"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_crawlable-anchors",
        "comment": "Ссылки можно просканировать",
        "description": "Поисковые системы при сканировании сайтов учитывают содержащиеся в ссылках атрибуты `href`. Чтобы на вашем сайте могло быть проиндексировано максимально возможное количество страниц, атрибуты `href` или анкеры должны корректно ссылаться на целевые страницы. [Подробнее…](https://support.google.com/webmasters/answer/9112205)",
        "groups": [
            "# Lighthouse: Поисковая оптимизация",
            "Поисковая оптимизация: Сканирование и индексирование"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_is-crawlable",
        "comment": "Страница недоступна для индексации",
        "description": "Поисковые системы не смогут включать ваши страницы в результаты поиска, если вы не предоставите разрешение на сканирование. [Подробнее…](https://web.dev/is-crawable/)",
        "groups": [
            "# Lighthouse: Поисковая оптимизация",
            "Поисковая оптимизация: Сканирование и индексирование"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_robots-txt",
        "comment": "Файл robots.txt действителен",
        "description": "Если файл robots.txt поврежден, поисковые роботы могут не распознать ваши инструкции по сканированию или индексации сайта. [Подробнее…](https://web.dev/robots-txt/)",
        "groups": [
            "# Lighthouse: Поисковая оптимизация",
            "Поисковая оптимизация: Сканирование и индексирование"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_image-alt",
        "comment": "У элементов изображений есть атрибут `[alt]`",
        "description": "В информационных элементах должен содержаться короткий и ясный альтернативный текст. Если элемент декоративный, то атрибут alt для него можно оставить пустым. [Подробнее…](https://web.dev/image-alt/)",
        "groups": [
            "# Lighthouse: Поисковая оптимизация",
            "Поисковая оптимизация: Рекомендации в отношении контента"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_hreflang",
        "comment": "Для документа указан действительный атрибут `hreflang`",
        "description": "Добавьте на страницу элементы link с атрибутом hreflang. Тогда в результатах поиска будут представлены те версии ваших страниц, которые лучше всего подходят для языка и региона пользователя. [Подробнее…](https://web.dev/hreflang/)",
        "groups": [
            "# Lighthouse: Поисковая оптимизация",
            "Поисковая оптимизация: Рекомендации в отношении контента"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_canonical",
        "comment": "Для документа указан действительный атрибут `rel=canonical`",
        "description": "Ссылки с атрибутом rel=\"canonical\" будут показаны в результатах поиска. [Подробнее…](https://web.dev/canonical/)",
        "groups": [
            "# Lighthouse: Поисковая оптимизация",
            "Поисковая оптимизация: Рекомендации в отношении контента"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_font-size",
        "comment": "В документе используются шрифты слишком маленького размера",
        "description": "Если вы хотите, чтобы текст легко читался, размер шрифта должен составлять не менее 12 пикс. В противном случае пользователям мобильных устройств придется масштабировать страницу для чтения. В идеале на странице должно быть более 60 % текста высотой не менее 12 пикс. [Подробнее…](https://web.dev/font-size/)",
        "groups": [
            "# Lighthouse: Поисковая оптимизация",
            "Поисковая оптимизация: Оптимизация для мобильных устройств"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_plugins",
        "comment": "В документе нет плагинов",
        "description": "Поисковые системы не могут индексировать содержимое плагинов. К тому же на многих устройствах использование плагинов ограничено или не поддерживается. [Подробнее…](https://web.dev/plugins/)",
        "groups": [
            "# Lighthouse: Поисковая оптимизация",
            "Поисковая оптимизация: Рекомендации в отношении контента"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_tap-targets",
        "comment": "Размер интерактивных элементов не оптимален",
        "description": "Интерактивные элементы, такие как кнопки и ссылки, должны быть достаточно крупными (48 x 48 пикс.) и располагаться на достаточном расстоянии друг от друга. Тогда пользователям будет удобно нажимать на них. [Подробнее…](https://web.dev/tap-targets/)",
        "groups": [
            "# Lighthouse: Поисковая оптимизация",
            "Поисковая оптимизация: Оптимизация для мобильных устройств"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_structured-data",
        "comment": "Структурированные данные действительны",
        "description": "Для тестирования структурированных данных воспользуйтесь [инструментом проверки](https://search.google.com/structured-data/testing-tool/) и [инструментом Structured Data Linter](http://linter.structured-data.org/). [Подробнее…](https://web.dev/structured-data/)",
        "groups": [
            "# Lighthouse: Поисковая оптимизация"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_load-fast-enough-for-pwa",
        "comment": "Страницы загружаются через мобильную сеть достаточно быстро",
        "description": "Если страницы будут быстро загружаться по мобильной сети, сайтом станет удобно пользоваться на телефоне или планшете. [Подробнее…](https://web.dev/load-fast-enough-for-pwa/)",
        "groups": [
            "# Lighthouse: Современное веб-приложение",
            "Современное веб-приложение: Скорость работы и надежность"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_works-offline",
        "comment": "Текущая страница не отправляет код 200 в офлайн-режиме",
        "description": "При создании современного веб-приложения используйте Service Worker, чтобы оно продолжало работу в офлайн-режиме. [Подробнее…](https://web.dev/works-offline/)",
        "groups": [
            "# Lighthouse: Современное веб-приложение",
            "Современное веб-приложение: Скорость работы и надежность"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_offline-start-url",
        "comment": "`start_url` не отправляет код 200 в офлайн-режиме",
        "description": "Service Worker обеспечивает надежную работу веб-приложения при нестабильных условиях работы сети. [Подробнее…](https://web.dev/offline-start-url/)",
        "groups": [
            "# Lighthouse: Современное веб-приложение",
            "Современное веб-приложение: Скорость работы и надежность"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_is-on-https",
        "comment": "Используется протокол HTTPS",
        "description": "Все сайты (даже если они не обрабатывают конфиденциальные данные) должны быть защищены протоколом HTTPS. Это в том числе означает, что не следует использовать [смешанный контент](https://developers.google.com/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content): не должно быть ситуаций, когда некоторые ресурсы загружаются по протоколу HTTP, хотя первоначальный запрос передается с применением HTTPS. Протокол HTTPS обеспечивает защиту от взлома и не позволяет посторонним узнавать, как пользователи взаимодействуют с приложением. Кроме того, использование этого протокола обязательно при работе с версией HTTP/2 и многими новыми API для веб-платформ. [Подробнее…](https://web.dev/is-on-https/)",
        "groups": [
            "# Lighthouse: Современное веб-приложение",
            "Современное веб-приложение: Возможность установки"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_service-worker",
        "comment": "Не регистрируется Service Worker, управляющий страницей и `start_url`",
        "description": "Service Worker — это технология, добавляющая в приложение преимущества современных веб-приложений, такие как поддержка офлайн-режима, добавления на главный экран и push-уведомлений. [Подробнее…](https://web.dev/service-worker/)",
        "groups": [
            "# Lighthouse: Современное веб-приложение",
            "Современное веб-приложение: Возможность установки"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_installable-manifest",
        "comment": "Манифест веб-приложения не соответствует условиям, необходимым для установки",
        "description": "Для увеличения частоты использования браузеры могут предлагать пользователям добавлять приложение на главный экран. [Подробнее…](https://web.dev/installable-manifest/)",
        "groups": [
            "# Lighthouse: Современное веб-приложение",
            "Современное веб-приложение: Возможность установки"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_redirects-http",
        "comment": "Не перенаправляет трафик с HTTP на HTTPS",
        "description": "Если у вас уже настроен протокол HTTPS, убедитесь, что весь трафик перенаправляется с HTTP на HTTPS, чтобы обеспечить безопасность для всех своих пользователей. [Подробнее…](https://web.dev/redirects-http/)",
        "groups": [
            "# Lighthouse: Современное веб-приложение",
            "Современное веб-приложение: Соответствие рекомендациям для PWA"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_splash-screen",
        "comment": "Собственная заставка не настроена",
        "description": "Приложение оставляет у пользователей более приятное впечатление, когда оно встречает их качественной заставкой. [Подробнее…](https://web.dev/splash-screen/)",
        "groups": [
            "# Lighthouse: Современное веб-приложение",
            "Современное веб-приложение: Соответствие рекомендациям для PWA"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_themed-omnibox",
        "comment": "Не изменяет цвет адресной строки в соответствии с темой",
        "description": "Цвет адресной строки браузера можно изменить под цвет сайта. [Подробнее…](https://web.dev/themed-omnibox/)",
        "groups": [
            "# Lighthouse: Современное веб-приложение",
            "Современное веб-приложение: Соответствие рекомендациям для PWA"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_content-width",
        "comment": "Размер контента не соответствует области просмотра",
        "description": "Приложение не оптимизировано для работы на экранах мобильных устройств, если ширина контента приложения не совпадает с шириной области просмотра. [Подробнее…](https://web.dev/content-width/)",
        "groups": [
            "# Lighthouse: Современное веб-приложение",
            "Современное веб-приложение: Соответствие рекомендациям для PWA"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_viewport",
        "comment": "Отсутствует метатег `<meta name=\"viewport\">` со свойством `width` или `initial-scale`",
        "description": "Добавьте метатег `<meta name=\"viewport\">`, чтобы оптимизировать приложение для экранов мобильных устройств. [Подробнее…](https://web.dev/viewport/)",
        "groups": [
            "# Lighthouse: Современное веб-приложение",
            "Современное веб-приложение: Соответствие рекомендациям для PWA"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_without-javascript",
        "comment": "Содержит некоторый контент при недоступности JavaScript",
        "description": "В приложении должен отображаться контент, даже если JavaScript отключен. Достаточно уведомления, что для работы приложения необходим JavaScript. [Подробнее…](https://web.dev/without-javascript/)",
        "groups": [
            "# Lighthouse: Современное веб-приложение",
            "Современное веб-приложение: Соответствие рекомендациям для PWA"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_apple-touch-icon",
        "comment": "Не содержит действительный атрибут `apple-touch-icon`",
        "description": "Чтобы современное веб-приложение лучше смотрелось на главном экране iOS, задайте значение для атрибута `apple-touch-icon`. Он должен указывать на непрозрачное квадратное PNG-изображение со стороной 192 или 180 пикселей. [Подробнее…](https://web.dev/apple-touch-icon/)",
        "groups": [
            "# Lighthouse: Современное веб-приложение",
            "Современное веб-приложение: Соответствие рекомендациям для PWA"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_maskable-icon",
        "comment": "Манифест не содержит маскируемый значок",
        "description": "Маскируемый значок позволяет убедиться в том, что при установке приложения на устройство изображение заполняет всю форму и к нему не добавляются черные полосы сверху и снизу. [Подробнее…](https://web.dev/maskable-icon-audit/)",
        "groups": [
            "# Lighthouse: Современное веб-приложение",
            "Современное веб-приложение: Соответствие рекомендациям для PWA"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_pwa-cross-browser",
        "comment": "Сайт работает в разных браузерах",
        "description": "Для максимального охвата аудитории сайт должен поддерживать все основные браузеры. [Подробнее…](https://web.dev/pwa-cross-browser/)",
        "groups": [
            "# Lighthouse: Современное веб-приложение"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_pwa-page-transitions",
        "comment": "Во время перехода между страницами нет ощущения, что они ожидают ответа от сети",
        "description": "Переходы должны создавать впечатление мгновенного отклика даже при медленной работе сети. Это имеет решающее значение для удобства работы с приложением. [Подробнее…](https://web.dev/pwa-page-transitions/)",
        "groups": [
            "# Lighthouse: Современное веб-приложение"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_pwa-each-page-has-url",
        "comment": "У каждой страницы есть URL",
        "description": "Убедитесь, что у каждой страницы есть уникальный URL, чтобы их было удобно распространять в социальных сетях. [Подробнее…](https://web.dev/pwa-each-page-has-url/)",
        "groups": [
            "# Lighthouse: Современное веб-приложение"
        ],
        "type": "integer"
    }
];

module.exports = fields