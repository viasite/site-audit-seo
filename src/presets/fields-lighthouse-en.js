const fields = [
    {
        "name": "lighthouse_first-contentful-paint",
        "comment": "First Contentful Paint",
        "description": "First Contentful Paint marks the time at which the first text or image is painted. [Learn more](https://web.dev/first-contentful-paint/).",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Metrics"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_speed-index",
        "comment": "Speed Index",
        "description": "Speed Index shows how quickly the contents of a page are visibly populated. [Learn more](https://web.dev/speed-index/).",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Metrics"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_largest-contentful-paint",
        "comment": "Largest Contentful Paint",
        "description": "Largest Contentful Paint marks the time at which the largest text or image is painted. [Learn More](https://web.dev/lighthouse-largest-contentful-paint/)",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Metrics"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_interactive",
        "comment": "Time to Interactive",
        "description": "Time to interactive is the amount of time it takes for the page to become fully interactive. [Learn more](https://web.dev/interactive/).",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Metrics"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_total-blocking-time",
        "comment": "Total Blocking Time",
        "description": "Sum of all time periods between FCP and Time to Interactive, when task length exceeded 50ms, expressed in milliseconds. [Learn more](https://web.dev/lighthouse-total-blocking-time/).",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Metrics"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_cumulative-layout-shift",
        "comment": "Cumulative Layout Shift",
        "description": "Cumulative Layout Shift measures the movement of visible elements within the viewport. [Learn more](https://web.dev/cls/).",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Metrics"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_first-cpu-idle",
        "comment": "First CPU Idle",
        "description": "First CPU Idle marks the first time at which the page's main thread is quiet enough to handle input.  [Learn more](https://web.dev/first-cpu-idle/).",
        "groups": [
            "# Lighthouse: Performance"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_max-potential-fid",
        "comment": "Max Potential First Input Delay",
        "description": "The maximum potential First Input Delay that your users could experience is the duration of the longest task. [Learn more](https://web.dev/lighthouse-max-potential-fid/).",
        "groups": [
            "# Lighthouse: Performance"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_first-meaningful-paint",
        "comment": "First Meaningful Paint",
        "description": "First Meaningful Paint measures when the primary content of a page is visible. [Learn more](https://web.dev/first-meaningful-paint/).",
        "groups": [
            "# Lighthouse: Performance"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_estimated-input-latency",
        "comment": "Estimated Input Latency",
        "description": "Estimated Input Latency is an estimate of how long your app takes to respond to user input, in milliseconds, during the busiest 5s window of page load. If your latency is higher than 50 ms, users may perceive your app as laggy. [Learn more](https://web.dev/estimated-input-latency/).",
        "groups": [
            "# Lighthouse: Performance"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_render-blocking-resources",
        "comment": "Eliminate render-blocking resources",
        "description": "Resources are blocking the first paint of your page. Consider delivering critical JS/CSS inline and deferring all non-critical JS/styles. [Learn more](https://web.dev/render-blocking-resources/).",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Opportunities"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_uses-responsive-images",
        "comment": "Properly size images",
        "description": "Serve images that are appropriately-sized to save cellular data and improve load time. [Learn more](https://web.dev/uses-responsive-images/).",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Opportunities"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_offscreen-images",
        "comment": "Defer offscreen images",
        "description": "Consider lazy-loading offscreen and hidden images after all critical resources have finished loading to lower time to interactive. [Learn more](https://web.dev/offscreen-images/).",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Opportunities"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_unminified-css",
        "comment": "Minify CSS",
        "description": "Minifying CSS files can reduce network payload sizes. [Learn more](https://web.dev/unminified-css/).",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Opportunities"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_unminified-javascript",
        "comment": "Minify JavaScript",
        "description": "Minifying JavaScript files can reduce payload sizes and script parse time. [Learn more](https://web.dev/unminified-javascript/).",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Opportunities"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_unused-css-rules",
        "comment": "Remove unused CSS",
        "description": "Remove dead rules from stylesheets and defer the loading of CSS not used for above-the-fold content to reduce unnecessary bytes consumed by network activity. [Learn more](https://web.dev/unused-css-rules/).",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Opportunities"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_unused-javascript",
        "comment": "Remove unused JavaScript",
        "description": "Remove unused JavaScript to reduce bytes consumed by network activity. [Learn more](https://web.dev/unused-javascript/).",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Opportunities"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_uses-optimized-images",
        "comment": "Efficiently encode images",
        "description": "Optimized images load faster and consume less cellular data. [Learn more](https://web.dev/uses-optimized-images/).",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Opportunities"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_uses-webp-images",
        "comment": "Serve images in next-gen formats",
        "description": "Image formats like JPEG 2000, JPEG XR, and WebP often provide better compression than PNG or JPEG, which means faster downloads and less data consumption. [Learn more](https://web.dev/uses-webp-images/).",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Opportunities"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_uses-text-compression",
        "comment": "Enable text compression",
        "description": "Text-based resources should be served with compression (gzip, deflate or brotli) to minimize total network bytes. [Learn more](https://web.dev/uses-text-compression/).",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Opportunities"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_uses-rel-preconnect",
        "comment": "Preconnect to required origins",
        "description": "Consider adding `preconnect` or `dns-prefetch` resource hints to establish early connections to important third-party origins. [Learn more](https://web.dev/uses-rel-preconnect/).",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Opportunities"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_server-response-time",
        "comment": "Initial server response time was short",
        "description": "Keep the server response time for the main document short because all other requests depend on it. [Learn more](https://web.dev/time-to-first-byte/).",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Opportunities"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_redirects",
        "comment": "Avoid multiple page redirects",
        "description": "Redirects introduce additional delays before the page can be loaded. [Learn more](https://web.dev/redirects/).",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Opportunities"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_uses-rel-preload",
        "comment": "Preload key requests",
        "description": "Consider using `<link rel=preload>` to prioritize fetching resources that are currently requested later in page load. [Learn more](https://web.dev/uses-rel-preload/).",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Opportunities"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_uses-http2",
        "comment": "Use HTTP/2",
        "description": "HTTP/2 offers many benefits over HTTP/1.1, including binary headers, multiplexing, and server push. [Learn more](https://web.dev/uses-http2/).",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Opportunities"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_efficient-animated-content",
        "comment": "Use video formats for animated content",
        "description": "Large GIFs are inefficient for delivering animated content. Consider using MPEG4/WebM videos for animations and PNG/WebP for static images instead of GIF to save network bytes. [Learn more](https://web.dev/efficient-animated-content/)",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Opportunities"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_duplicated-javascript",
        "comment": "Remove duplicate modules in JavaScript bundles",
        "description": "Remove large, duplicate JavaScript modules from bundles to reduce unnecessary bytes consumed by network activity. ",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Opportunities"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_legacy-javascript",
        "comment": "Avoid serving legacy JavaScript to modern browsers",
        "description": "Polyfills and transforms enable legacy browsers to use new JavaScript features. However, many aren't necessary for modern browsers. For your bundled JavaScript, adopt a modern script deployment strategy using module/nomodule feature detection to reduce the amount of code shipped to modern browsers, while retaining support for legacy browsers. [Learn More](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/)",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Opportunities"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_total-byte-weight",
        "comment": "Avoids enormous network payloads",
        "description": "Large network payloads cost users real money and are highly correlated with long load times. [Learn more](https://web.dev/total-byte-weight/).",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Diagnostics"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_uses-long-cache-ttl",
        "comment": "Uses efficient cache policy on static assets",
        "description": "A long cache lifetime can speed up repeat visits to your page. [Learn more](https://web.dev/uses-long-cache-ttl/).",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Diagnostics"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_dom-size",
        "comment": "Avoids an excessive DOM size",
        "description": "A large DOM will increase memory usage, cause longer [style calculations](https://developers.google.com/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations), and produce costly [layout reflows](https://developers.google.com/speed/articles/reflow). [Learn more](https://web.dev/dom-size/).",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Diagnostics"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_critical-request-chains",
        "comment": "Avoid chaining critical requests",
        "description": "The Critical Request Chains below show you what resources are loaded with a high priority. Consider reducing the length of chains, reducing the download size of resources, or deferring the download of unnecessary resources to improve page load. [Learn more](https://web.dev/critical-request-chains/).",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Diagnostics"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_user-timings",
        "comment": "User Timing marks and measures",
        "description": "Consider instrumenting your app with the User Timing API to measure your app's real-world performance during key user experiences. [Learn more](https://web.dev/user-timings/).",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Diagnostics"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_bootup-time",
        "comment": "JavaScript execution time",
        "description": "Consider reducing the time spent parsing, compiling, and executing JS. You may find delivering smaller JS payloads helps with this. [Learn more](https://web.dev/bootup-time/).",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Diagnostics"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_mainthread-work-breakdown",
        "comment": "Minimizes main-thread work",
        "description": "Consider reducing the time spent parsing, compiling and executing JS. You may find delivering smaller JS payloads helps with this. [Learn more](https://web.dev/mainthread-work-breakdown/)",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Diagnostics"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_font-display",
        "comment": "All text remains visible during webfont loads",
        "description": "Leverage the font-display CSS feature to ensure text is user-visible while webfonts are loading. [Learn more](https://web.dev/font-display/).",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Diagnostics"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_performance-budget",
        "comment": "Performance budget",
        "description": "Keep the quantity and size of network requests under the targets set by the provided performance budget. [Learn more](https://developers.google.com/web/tools/lighthouse/audits/budgets).",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Budgets"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_timing-budget",
        "comment": "Timing budget",
        "description": "Set a timing budget to help you keep an eye on the performance of your site. Performant sites load fast and respond to user input events quickly. [Learn more](https://developers.google.com/web/tools/lighthouse/audits/budgets).",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Budgets"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_resource-summary",
        "comment": "Keep request counts low and transfer sizes small",
        "description": "To set budgets for the quantity and size of page resources, add a budget.json file. [Learn more](https://web.dev/use-lighthouse-for-performance-budgets/).",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Diagnostics"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_third-party-summary",
        "comment": "Minimize third-party usage",
        "description": "Third-party code can significantly impact load performance. Limit the number of redundant third-party providers and try to load third-party code after your page has primarily finished loading. [Learn more](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/).",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Diagnostics"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_largest-contentful-paint-element",
        "comment": "Largest Contentful Paint element",
        "description": "This is the largest contentful element painted within the viewport. [Learn More](https://web.dev/lighthouse-largest-contentful-paint/)",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Diagnostics"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_layout-shift-elements",
        "comment": "Avoid large layout shifts",
        "description": "These DOM elements contribute most to the CLS of the page.",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Diagnostics"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_uses-passive-event-listeners",
        "comment": "Uses passive listeners to improve scrolling performance",
        "description": "Consider marking your touch and wheel event listeners as `passive` to improve your page's scroll performance. [Learn more](https://web.dev/uses-passive-event-listeners/).",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Diagnostics"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_no-document-write",
        "comment": "Avoids `document.write()`",
        "description": "For users on slow connections, external scripts dynamically injected via `document.write()` can delay page load by tens of seconds. [Learn more](https://web.dev/no-document-write/).",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Diagnostics"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_long-tasks",
        "comment": "Avoid long main-thread tasks",
        "description": "Lists the longest tasks on the main thread, useful for identifying worst contributors to input delay. [Learn more](https://web.dev/long-tasks-devtools/)",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Diagnostics"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_non-composited-animations",
        "comment": "Avoid non-composited animations",
        "description": "Animations which are not composited can be janky and contribute to CLS. [Learn more](https://developers.google.com/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count)",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Diagnostics"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_unsized-images",
        "comment": "Image elements have explicit `width` and `height`",
        "description": "Set an explicit width and height on image elements to reduce layout shifts and improve CLS. [Learn more](https://web.dev/optimize-cls/#images-without-dimensions)",
        "groups": [
            "# Lighthouse: Performance",
            "Performance: Diagnostics"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_network-requests",
        "comment": "Network Requests",
        "description": "Lists the network requests that were made during page load.",
        "groups": [
            "# Lighthouse: Performance"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_network-rtt",
        "comment": "Network Round Trip Times",
        "description": "Network round trip times (RTT) have a large impact on performance. If the RTT to an origin is high, it's an indication that servers closer to the user could improve performance. [Learn more](https://hpbn.co/primer-on-latency-and-bandwidth/).",
        "groups": [
            "# Lighthouse: Performance"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_network-server-latency",
        "comment": "Server Backend Latencies",
        "description": "Server latencies can impact web performance. If the server latency of an origin is high, it's an indication the server is overloaded or has poor backend performance. [Learn more](https://hpbn.co/primer-on-web-performance/#analyzing-the-resource-waterfall).",
        "groups": [
            "# Lighthouse: Performance"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_main-thread-tasks",
        "comment": "Tasks",
        "description": "Lists the toplevel main thread tasks that executed during page load.",
        "groups": [
            "# Lighthouse: Performance"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_diagnostics",
        "comment": "Diagnostics",
        "description": "Collection of useful page vitals.",
        "groups": [
            "# Lighthouse: Performance"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_metrics",
        "comment": "Metrics",
        "description": "Collects all available metrics.",
        "groups": [
            "# Lighthouse: Performance"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_screenshot-thumbnails",
        "comment": "Screenshot Thumbnails",
        "description": "This is what the load of your site looked like.",
        "groups": [
            "# Lighthouse: Performance"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_final-screenshot",
        "comment": "Final Screenshot",
        "description": "The last screenshot captured of the pageload.",
        "groups": [
            "# Lighthouse: Performance"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_accesskeys",
        "comment": "`[accesskey]` values are unique",
        "description": "Access keys let users quickly focus a part of the page. For proper navigation, each access key must be unique. [Learn more](https://web.dev/accesskeys/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: Navigation"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_aria-allowed-attr",
        "comment": "`[aria-*]` attributes match their roles",
        "description": "Each ARIA `role` supports a specific subset of `aria-*` attributes. Mismatching these invalidates the `aria-*` attributes. [Learn more](https://web.dev/aria-allowed-attr/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: ARIA"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_aria-hidden-body",
        "comment": "`[aria-hidden=\"true\"]` is not present on the document `<body>`",
        "description": "Assistive technologies, like screen readers, work inconsistently when `aria-hidden=\"true\"` is set on the document `<body>`. [Learn more](https://web.dev/aria-hidden-body/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: ARIA"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_aria-hidden-focus",
        "comment": "`[aria-hidden=\"true\"]` elements do not contain focusable descendents",
        "description": "Focusable descendents within an `[aria-hidden=\"true\"]` element prevent those interactive elements from being available to users of assistive technologies like screen readers. [Learn more](https://web.dev/aria-hidden-focus/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: ARIA"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_aria-input-field-name",
        "comment": "ARIA input fields have accessible names",
        "description": "When an input field doesn't have an accessible name, screen readers announce it with a generic name, making it unusable for users who rely on screen readers. [Learn more](https://web.dev/aria-input-field-name/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: ARIA"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_aria-required-attr",
        "comment": "`[role]`s have all required `[aria-*]` attributes",
        "description": "Some ARIA roles have required attributes that describe the state of the element to screen readers. [Learn more](https://web.dev/aria-required-attr/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: ARIA"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_aria-required-children",
        "comment": "Elements with an ARIA `[role]` that require children to contain a specific `[role]` have all required children.",
        "description": "Some ARIA parent roles must contain specific child roles to perform their intended accessibility functions. [Learn more](https://web.dev/aria-required-children/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: ARIA"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_aria-required-parent",
        "comment": "`[role]`s are contained by their required parent element",
        "description": "Some ARIA child roles must be contained by specific parent roles to properly perform their intended accessibility functions. [Learn more](https://web.dev/aria-required-parent/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: ARIA"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_aria-roles",
        "comment": "`[role]` values are valid",
        "description": "ARIA roles must have valid values in order to perform their intended accessibility functions. [Learn more](https://web.dev/aria-roles/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: ARIA"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_aria-toggle-field-name",
        "comment": "ARIA toggle fields have accessible names",
        "description": "When a toggle field doesn't have an accessible name, screen readers announce it with a generic name, making it unusable for users who rely on screen readers. [Learn more](https://web.dev/aria-toggle-field-name/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: ARIA"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_aria-valid-attr-value",
        "comment": "`[aria-*]` attributes have valid values",
        "description": "Assistive technologies, like screen readers, can't interpret ARIA attributes with invalid values. [Learn more](https://web.dev/aria-valid-attr-value/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: ARIA"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_aria-valid-attr",
        "comment": "`[aria-*]` attributes are valid and not misspelled",
        "description": "Assistive technologies, like screen readers, can't interpret ARIA attributes with invalid names. [Learn more](https://web.dev/aria-valid-attr/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: ARIA"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_button-name",
        "comment": "Buttons have an accessible name",
        "description": "When a button doesn't have an accessible name, screen readers announce it as \"button\", making it unusable for users who rely on screen readers. [Learn more](https://web.dev/button-name/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: Names and labels"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_bypass",
        "comment": "The page contains a heading, skip link, or landmark region",
        "description": "Adding ways to bypass repetitive content lets keyboard users navigate the page more efficiently. [Learn more](https://web.dev/bypass/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: Navigation"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_color-contrast",
        "comment": "Background and foreground colors have a sufficient contrast ratio",
        "description": "Low-contrast text is difficult or impossible for many users to read. [Learn more](https://web.dev/color-contrast/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: Contrast"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_definition-list",
        "comment": "`<dl>`'s contain only properly-ordered `<dt>` and `<dd>` groups, `<script>`, `<template>` or `<div>` elements.",
        "description": "When definition lists are not properly marked up, screen readers may produce confusing or inaccurate output. [Learn more](https://web.dev/definition-list/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: Tables and lists"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_dlitem",
        "comment": "Definition list items are wrapped in `<dl>` elements",
        "description": "Definition list items (`<dt>` and `<dd>`) must be wrapped in a parent `<dl>` element to ensure that screen readers can properly announce them. [Learn more](https://web.dev/dlitem/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: Tables and lists"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_document-title",
        "comment": "Document doesn't have a `<title>` element",
        "description": "The title gives screen reader users an overview of the page, and search engine users rely on it heavily to determine if a page is relevant to their search. [Learn more](https://web.dev/document-title/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: Names and labels"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_duplicate-id-active",
        "comment": "`[id]` attributes on active, focusable elements are unique",
        "description": "All focusable elements must have a unique `id` to ensure that they're visible to assistive technologies. [Learn more](https://web.dev/duplicate-id-active/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: Navigation"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_duplicate-id-aria",
        "comment": "ARIA IDs are unique",
        "description": "The value of an ARIA ID must be unique to prevent other instances from being overlooked by assistive technologies. [Learn more](https://web.dev/duplicate-id-aria/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: ARIA"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_form-field-multiple-labels",
        "comment": "No form fields have multiple labels",
        "description": "Form fields with multiple labels can be confusingly announced by assistive technologies like screen readers which use either the first, the last, or all of the labels. [Learn more](https://web.dev/form-field-multiple-labels/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: Names and labels"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_frame-title",
        "comment": "`<frame>` or `<iframe>` elements have a title",
        "description": "Screen reader users rely on frame titles to describe the contents of frames. [Learn more](https://web.dev/frame-title/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: Names and labels"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_heading-order",
        "comment": "Heading elements appear in a sequentially-descending order",
        "description": "Properly ordered headings that do not skip levels convey the semantic structure of the page, making it easier to navigate and understand when using assistive technologies. [Learn more](https://web.dev/heading-order/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: Navigation"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_html-has-lang",
        "comment": "`<html>` element does not have a `[lang]` attribute",
        "description": "If a page doesn't specify a lang attribute, a screen reader assumes that the page is in the default language that the user chose when setting up the screen reader. If the page isn't actually in the default language, then the screen reader might not announce the page's text correctly. [Learn more](https://web.dev/html-has-lang/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: Internationalization and localization"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_html-lang-valid",
        "comment": "`<html>` element has a valid value for its `[lang]` attribute",
        "description": "Specifying a valid [BCP 47 language](https://www.w3.org/International/questions/qa-choosing-language-tags#question) helps screen readers announce text properly. [Learn more](https://web.dev/html-lang-valid/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: Internationalization and localization"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_image-alt",
        "comment": "Image elements have `[alt]` attributes",
        "description": "Informative elements should aim for short, descriptive alternate text. Decorative elements can be ignored with an empty alt attribute. [Learn more](https://web.dev/image-alt/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: Names and labels"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_input-image-alt",
        "comment": "`<input type=\"image\">` elements have `[alt]` text",
        "description": "When an image is being used as an `<input>` button, providing alternative text can help screen reader users understand the purpose of the button. [Learn more](https://web.dev/input-image-alt/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: Names and labels"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_label",
        "comment": "Form elements have associated labels",
        "description": "Labels ensure that form controls are announced properly by assistive technologies, like screen readers. [Learn more](https://web.dev/label/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: Names and labels"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_layout-table",
        "comment": "Presentational `<table>` elements avoid using `<th>`, `<caption>` or the `[summary]` attribute.",
        "description": "A table being used for layout purposes should not include data elements, such as the th or caption elements or the summary attribute, because this can create a confusing experience for screen reader users. [Learn more](https://web.dev/layout-table/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: Tables and lists"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_link-name",
        "comment": "Links have a discernible name",
        "description": "Link text (and alternate text for images, when used as links) that is discernible, unique, and focusable improves the navigation experience for screen reader users. [Learn more](https://web.dev/link-name/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: Names and labels"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_list",
        "comment": "Lists contain only `<li>` elements and script supporting elements (`<script>` and `<template>`).",
        "description": "Screen readers have a specific way of announcing lists. Ensuring proper list structure aids screen reader output. [Learn more](https://web.dev/list/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: Tables and lists"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_listitem",
        "comment": "List items (`<li>`) are contained within `<ul>` or `<ol>` parent elements",
        "description": "Screen readers require list items (`<li>`) to be contained within a parent `<ul>` or `<ol>` to be announced properly. [Learn more](https://web.dev/listitem/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: Tables and lists"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_meta-refresh",
        "comment": "The document does not use `<meta http-equiv=\"refresh\">`",
        "description": "Users do not expect a page to refresh automatically, and doing so will move focus back to the top of the page. This may create a frustrating or confusing experience. [Learn more](https://web.dev/meta-refresh/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: Best practices"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_meta-viewport",
        "comment": "`[user-scalable=\"no\"]` is not used in the `<meta name=\"viewport\">` element and the `[maximum-scale]` attribute is not less than 5.",
        "description": "Disabling zooming is problematic for users with low vision who rely on screen magnification to properly see the contents of a web page. [Learn more](https://web.dev/meta-viewport/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: Best practices"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_object-alt",
        "comment": "`<object>` elements have `[alt]` text",
        "description": "Screen readers cannot translate non-text content. Adding alt text to `<object>` elements helps screen readers convey meaning to users. [Learn more](https://web.dev/object-alt/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: Names and labels"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_tabindex",
        "comment": "No element has a `[tabindex]` value greater than 0",
        "description": "A value greater than 0 implies an explicit navigation ordering. Although technically valid, this often creates frustrating experiences for users who rely on assistive technologies. [Learn more](https://web.dev/tabindex/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: Navigation"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_td-headers-attr",
        "comment": "Cells in a `<table>` element that use the `[headers]` attribute refer to table cells within the same table.",
        "description": "Screen readers have features to make navigating tables easier. Ensuring `<td>` cells using the `[headers]` attribute only refer to other cells in the same table may improve the experience for screen reader users. [Learn more](https://web.dev/td-headers-attr/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: Tables and lists"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_th-has-data-cells",
        "comment": "`<th>` elements and elements with `[role=\"columnheader\"/\"rowheader\"]` have data cells they describe.",
        "description": "Screen readers have features to make navigating tables easier. Ensuring table headers always refer to some set of cells may improve the experience for screen reader users. [Learn more](https://web.dev/th-has-data-cells/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: Tables and lists"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_valid-lang",
        "comment": "`[lang]` attributes have a valid value",
        "description": "Specifying a valid [BCP 47 language](https://www.w3.org/International/questions/qa-choosing-language-tags#question) on elements helps ensure that text is pronounced correctly by a screen reader. [Learn more](https://web.dev/valid-lang/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: Internationalization and localization"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_video-caption",
        "comment": "`<video>` elements contain a `<track>` element with `[kind=\"captions\"]`",
        "description": "When a video provides a caption it is easier for deaf and hearing impaired users to access its information. [Learn more](https://web.dev/video-caption/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: Audio and video"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_video-description",
        "comment": "`<video>` elements contain a `<track>` element with `[kind=\"description\"]`",
        "description": "Audio descriptions provide relevant information for videos that dialogue cannot, such as facial expressions and scenes. [Learn more](https://web.dev/video-description/).",
        "groups": [
            "# Lighthouse: Accessibility",
            "Accessibility: Audio and video"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_logical-tab-order",
        "comment": "The page has a logical tab order",
        "description": "Tabbing through the page follows the visual layout. Users cannot focus elements that are offscreen. [Learn more](https://web.dev/logical-tab-order/).",
        "groups": [
            "# Lighthouse: Accessibility"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_focusable-controls",
        "comment": "Interactive controls are keyboard focusable",
        "description": "Custom interactive controls are keyboard focusable and display a focus indicator. [Learn more](https://web.dev/focusable-controls/).",
        "groups": [
            "# Lighthouse: Accessibility"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_interactive-element-affordance",
        "comment": "Interactive elements indicate their purpose and state",
        "description": "Interactive elements, such as links and buttons, should indicate their state and be distinguishable from non-interactive elements. [Learn more](https://web.dev/interactive-element-affordance/).",
        "groups": [
            "# Lighthouse: Accessibility"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_managed-focus",
        "comment": "The user's focus is directed to new content added to the page",
        "description": "If new content, such as a dialog, is added to the page, the user's focus is directed to it. [Learn more](https://web.dev/managed-focus/).",
        "groups": [
            "# Lighthouse: Accessibility"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_focus-traps",
        "comment": "User focus is not accidentally trapped in a region",
        "description": "A user can tab into and out of any control or region without accidentally trapping their focus. [Learn more](https://web.dev/focus-traps/).",
        "groups": [
            "# Lighthouse: Accessibility"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_custom-controls-labels",
        "comment": "Custom controls have associated labels",
        "description": "Custom interactive controls have associated labels, provided by aria-label or aria-labelledby. [Learn more](https://web.dev/custom-controls-labels/).",
        "groups": [
            "# Lighthouse: Accessibility"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_custom-controls-roles",
        "comment": "Custom controls have ARIA roles",
        "description": "Custom interactive controls have appropriate ARIA roles. [Learn more](https://web.dev/custom-control-roles/).",
        "groups": [
            "# Lighthouse: Accessibility"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_visual-order-follows-dom",
        "comment": "Visual order on the page follows DOM order",
        "description": "DOM order matches the visual order, improving navigation for assistive technology. [Learn more](https://web.dev/visual-order-follows-dom/).",
        "groups": [
            "# Lighthouse: Accessibility"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_offscreen-content-hidden",
        "comment": "Offscreen content is hidden from assistive technology",
        "description": "Offscreen content is hidden with display: none or aria-hidden=true. [Learn more](https://web.dev/offscreen-content-hidden/).",
        "groups": [
            "# Lighthouse: Accessibility"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_use-landmarks",
        "comment": "HTML5 landmark elements are used to improve navigation",
        "description": "Landmark elements (<main>, <nav>, etc.) are used to improve the keyboard navigation of the page for assistive technology. [Learn more](https://web.dev/use-landmarks/).",
        "groups": [
            "# Lighthouse: Accessibility"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_is-on-https",
        "comment": "Uses HTTPS",
        "description": "All sites should be protected with HTTPS, even ones that don't handle sensitive data. This includes avoiding [mixed content](https://developers.google.com/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content), where some resources are loaded over HTTP despite the initial request being servedover HTTPS. HTTPS prevents intruders from tampering with or passively listening in on the communications between your app and your users, and is a prerequisite for HTTP/2 and many new web platform APIs. [Learn more](https://web.dev/is-on-https/).",
        "groups": [
            "# Lighthouse: Best Practices",
            "Best Practices: Trust and Safety"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_external-anchors-use-rel-noopener",
        "comment": "Links to cross-origin destinations are safe",
        "description": "Add `rel=\"noopener\"` or `rel=\"noreferrer\"` to any external links to improve performance and prevent security vulnerabilities. [Learn more](https://web.dev/external-anchors-use-rel-noopener/).",
        "groups": [
            "# Lighthouse: Best Practices",
            "Best Practices: Trust and Safety"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_geolocation-on-start",
        "comment": "Avoids requesting the geolocation permission on page load",
        "description": "Users are mistrustful of or confused by sites that request their location without context. Consider tying the request to a user action instead. [Learn more](https://web.dev/geolocation-on-start/).",
        "groups": [
            "# Lighthouse: Best Practices",
            "Best Practices: Trust and Safety"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_notification-on-start",
        "comment": "Avoids requesting the notification permission on page load",
        "description": "Users are mistrustful of or confused by sites that request to send notifications without context. Consider tying the request to user gestures instead. [Learn more](https://web.dev/notification-on-start/).",
        "groups": [
            "# Lighthouse: Best Practices",
            "Best Practices: Trust and Safety"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_no-vulnerable-libraries",
        "comment": "Avoids front-end JavaScript libraries with known security vulnerabilities",
        "description": "Some third-party scripts may contain known security vulnerabilities that are easily identified and exploited by attackers. [Learn more](https://web.dev/no-vulnerable-libraries/).",
        "groups": [
            "# Lighthouse: Best Practices",
            "Best Practices: Trust and Safety"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_password-inputs-can-be-pasted-into",
        "comment": "Allows users to paste into password fields",
        "description": "Preventing password pasting undermines good security policy. [Learn more](https://web.dev/password-inputs-can-be-pasted-into/).",
        "groups": [
            "# Lighthouse: Best Practices",
            "Best Practices: User Experience"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_image-aspect-ratio",
        "comment": "Displays images with correct aspect ratio",
        "description": "Image display dimensions should match natural aspect ratio. [Learn more](https://web.dev/image-aspect-ratio/).",
        "groups": [
            "# Lighthouse: Best Practices",
            "Best Practices: User Experience"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_image-size-responsive",
        "comment": "Serves images with appropriate resolution",
        "description": "Image natural dimensions should be proportional to the display size and the pixel ratio to maximize image clarity. [Learn more](https://web.dev/serve-responsive-images/).",
        "groups": [
            "# Lighthouse: Best Practices",
            "Best Practices: User Experience"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_doctype",
        "comment": "Page lacks the HTML doctype, thus triggering quirks-mode",
        "description": "Specifying a doctype prevents the browser from switching to quirks-mode. [Learn more](https://web.dev/doctype/).",
        "groups": [
            "# Lighthouse: Best Practices",
            "Best Practices: Browser Compatibility"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_charset",
        "comment": "Charset declaration is missing or occurs too late in the HTML",
        "description": "A character encoding declaration is required. It can be done with a <meta> tag in the first 1024 bytes of the HTML or in the Content-Type HTTP response header. [Learn more](https://web.dev/charset/).",
        "groups": [
            "# Lighthouse: Best Practices",
            "Best Practices: Browser Compatibility"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_no-unload-listeners",
        "comment": "Avoids `unload` event listeners",
        "description": "The `unload` event does not fire reliably and listening for it can prevent browser optimizations like the Back-Forward Cache. Consider using the `pagehide` or `visibilitychange` events instead. [Learn More](https://developers.google.com/web/updates/2018/07/page-lifecycle-api#the-unload-event)",
        "groups": [
            "# Lighthouse: Best Practices",
            "Best Practices: General"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_appcache-manifest",
        "comment": "Avoids Application Cache",
        "description": "Application Cache is deprecated. [Learn more](https://web.dev/appcache-manifest/).",
        "groups": [
            "# Lighthouse: Best Practices",
            "Best Practices: General"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_js-libraries",
        "comment": "Detected JavaScript libraries",
        "description": "All front-end JavaScript libraries detected on the page. [Learn more](https://web.dev/js-libraries/).",
        "groups": [
            "# Lighthouse: Best Practices",
            "Best Practices: General"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_deprecations",
        "comment": "Avoids deprecated APIs",
        "description": "Deprecated APIs will eventually be removed from the browser. [Learn more](https://web.dev/deprecations/).",
        "groups": [
            "# Lighthouse: Best Practices",
            "Best Practices: General"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_errors-in-console",
        "comment": "No browser errors logged to the console",
        "description": "Errors logged to the console indicate unresolved problems. They can come from network request failures and other browser concerns. [Learn more](https://web.dev/errors-in-console/)",
        "groups": [
            "# Lighthouse: Best Practices",
            "Best Practices: General"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_viewport",
        "comment": "Does not have a `<meta name=\"viewport\">` tag with `width` or `initial-scale`",
        "description": "Add a `<meta name=\"viewport\">` tag to optimize your app for mobile screens. [Learn more](https://web.dev/viewport/).",
        "groups": [
            "# Lighthouse: SEO",
            "SEO: Mobile Friendly"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_document-title",
        "comment": "Document doesn't have a `<title>` element",
        "description": "The title gives screen reader users an overview of the page, and search engine users rely on it heavily to determine if a page is relevant to their search. [Learn more](https://web.dev/document-title/).",
        "groups": [
            "# Lighthouse: SEO",
            "SEO: Content Best Practices"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_meta-description",
        "comment": "Document does not have a meta description",
        "description": "Meta descriptions may be included in search results to concisely summarize page content. [Learn more](https://web.dev/meta-description/).",
        "groups": [
            "# Lighthouse: SEO",
            "SEO: Content Best Practices"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_http-status-code",
        "comment": "Page has successful HTTP status code",
        "description": "Pages with unsuccessful HTTP status codes may not be indexed properly. [Learn more](https://web.dev/http-status-code/).",
        "groups": [
            "# Lighthouse: SEO",
            "SEO: Crawling and Indexing"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_link-text",
        "comment": "Links have descriptive text",
        "description": "Descriptive link text helps search engines understand your content. [Learn more](https://web.dev/link-text/).",
        "groups": [
            "# Lighthouse: SEO",
            "SEO: Content Best Practices"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_crawlable-anchors",
        "comment": "Links are crawlable",
        "description": "Search engines may use `href` attributes on links to crawl websites. Ensure that the `href` attribute of anchor elements links to an appropriate destination, so more pages of the site can be discovered. [Learn More](https://support.google.com/webmasters/answer/9112205)",
        "groups": [
            "# Lighthouse: SEO",
            "SEO: Crawling and Indexing"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_is-crawlable",
        "comment": "Page is blocked from indexing",
        "description": "Search engines are unable to include your pages in search results if they don't have permission to crawl them. [Learn more](https://web.dev/is-crawable/).",
        "groups": [
            "# Lighthouse: SEO",
            "SEO: Crawling and Indexing"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_robots-txt",
        "comment": "robots.txt is valid",
        "description": "If your robots.txt file is malformed, crawlers may not be able to understand how you want your website to be crawled or indexed. [Learn more](https://web.dev/robots-txt/).",
        "groups": [
            "# Lighthouse: SEO",
            "SEO: Crawling and Indexing"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_image-alt",
        "comment": "Image elements have `[alt]` attributes",
        "description": "Informative elements should aim for short, descriptive alternate text. Decorative elements can be ignored with an empty alt attribute. [Learn more](https://web.dev/image-alt/).",
        "groups": [
            "# Lighthouse: SEO",
            "SEO: Content Best Practices"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_hreflang",
        "comment": "Document has a valid `hreflang`",
        "description": "hreflang links tell search engines what version of a page they should list in search results for a given language or region. [Learn more](https://web.dev/hreflang/).",
        "groups": [
            "# Lighthouse: SEO",
            "SEO: Content Best Practices"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_canonical",
        "comment": "Document has a valid `rel=canonical`",
        "description": "Canonical links suggest which URL to show in search results. [Learn more](https://web.dev/canonical/).",
        "groups": [
            "# Lighthouse: SEO",
            "SEO: Content Best Practices"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_font-size",
        "comment": "Document doesn't use legible font sizes",
        "description": "Font sizes less than 12px are too small to be legible and require mobile visitors to “pinch to zoom” in order to read. Strive to have >60% of page text ≥12px. [Learn more](https://web.dev/font-size/).",
        "groups": [
            "# Lighthouse: SEO",
            "SEO: Mobile Friendly"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_plugins",
        "comment": "Document avoids plugins",
        "description": "Search engines can't index plugin content, and many devices restrict plugins or don't support them. [Learn more](https://web.dev/plugins/).",
        "groups": [
            "# Lighthouse: SEO",
            "SEO: Content Best Practices"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_tap-targets",
        "comment": "Tap targets are not sized appropriately",
        "description": "Interactive elements like buttons and links should be large enough (48x48px), and have enough space around them, to be easy enough to tap without overlapping onto other elements. [Learn more](https://web.dev/tap-targets/).",
        "groups": [
            "# Lighthouse: SEO",
            "SEO: Mobile Friendly"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_structured-data",
        "comment": "Structured data is valid",
        "description": "Run the [Structured Data Testing Tool](https://search.google.com/structured-data/testing-tool/) and the [Structured Data Linter](http://linter.structured-data.org/) to validate structured data. [Learn more](https://web.dev/structured-data/).",
        "groups": [
            "# Lighthouse: SEO"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_load-fast-enough-for-pwa",
        "comment": "Page load is fast enough on mobile networks",
        "description": "A fast page load over a cellular network ensures a good mobile user experience. [Learn more](https://web.dev/load-fast-enough-for-pwa/).",
        "groups": [
            "# Lighthouse: Progressive Web App",
            "Progressive Web App: Fast and reliable"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_works-offline",
        "comment": "Current page does not respond with a 200 when offline",
        "description": "If you're building a Progressive Web App, consider using a service worker so that your app can work offline. [Learn more](https://web.dev/works-offline/).",
        "groups": [
            "# Lighthouse: Progressive Web App",
            "Progressive Web App: Fast and reliable"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_offline-start-url",
        "comment": "`start_url` does not respond with a 200 when offline",
        "description": "A service worker enables your web app to be reliable in unpredictable network conditions. [Learn more](https://web.dev/offline-start-url/).",
        "groups": [
            "# Lighthouse: Progressive Web App",
            "Progressive Web App: Fast and reliable"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_is-on-https",
        "comment": "Uses HTTPS",
        "description": "All sites should be protected with HTTPS, even ones that don't handle sensitive data. This includes avoiding [mixed content](https://developers.google.com/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content), where some resources are loaded over HTTP despite the initial request being servedover HTTPS. HTTPS prevents intruders from tampering with or passively listening in on the communications between your app and your users, and is a prerequisite for HTTP/2 and many new web platform APIs. [Learn more](https://web.dev/is-on-https/).",
        "groups": [
            "# Lighthouse: Progressive Web App",
            "Progressive Web App: Installable"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_service-worker",
        "comment": "Does not register a service worker that controls page and `start_url`",
        "description": "The service worker is the technology that enables your app to use many Progressive Web App features, such as offline, add to homescreen, and push notifications. [Learn more](https://web.dev/service-worker/).",
        "groups": [
            "# Lighthouse: Progressive Web App",
            "Progressive Web App: Installable"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_installable-manifest",
        "comment": "Web app manifest does not meet the installability requirements",
        "description": "Browsers can proactively prompt users to add your app to their homescreen, which can lead to higher engagement. [Learn more](https://web.dev/installable-manifest/).",
        "groups": [
            "# Lighthouse: Progressive Web App",
            "Progressive Web App: Installable"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_redirects-http",
        "comment": "Does not redirect HTTP traffic to HTTPS",
        "description": "If you've already set up HTTPS, make sure that you redirect all HTTP traffic to HTTPS in order to enable secure web features for all your users. [Learn more](https://web.dev/redirects-http/).",
        "groups": [
            "# Lighthouse: Progressive Web App",
            "Progressive Web App: PWA Optimized"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_splash-screen",
        "comment": "Is not configured for a custom splash screen",
        "description": "A themed splash screen ensures a high-quality experience when users launch your app from their homescreens. [Learn more](https://web.dev/splash-screen/).",
        "groups": [
            "# Lighthouse: Progressive Web App",
            "Progressive Web App: PWA Optimized"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_themed-omnibox",
        "comment": "Does not set a theme color for the address bar.",
        "description": "The browser address bar can be themed to match your site. [Learn more](https://web.dev/themed-omnibox/).",
        "groups": [
            "# Lighthouse: Progressive Web App",
            "Progressive Web App: PWA Optimized"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_content-width",
        "comment": "Content is not sized correctly for the viewport",
        "description": "If the width of your app's content doesn't match the width of the viewport, your app might not be optimized for mobile screens. [Learn more](https://web.dev/content-width/).",
        "groups": [
            "# Lighthouse: Progressive Web App",
            "Progressive Web App: PWA Optimized"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_viewport",
        "comment": "Does not have a `<meta name=\"viewport\">` tag with `width` or `initial-scale`",
        "description": "Add a `<meta name=\"viewport\">` tag to optimize your app for mobile screens. [Learn more](https://web.dev/viewport/).",
        "groups": [
            "# Lighthouse: Progressive Web App",
            "Progressive Web App: PWA Optimized"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_without-javascript",
        "comment": "Contains some content when JavaScript is not available",
        "description": "Your app should display some content when JavaScript is disabled, even if it's just a warning to the user that JavaScript is required to use the app. [Learn more](https://web.dev/without-javascript/).",
        "groups": [
            "# Lighthouse: Progressive Web App",
            "Progressive Web App: PWA Optimized"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_apple-touch-icon",
        "comment": "Does not provide a valid `apple-touch-icon`",
        "description": "For ideal appearance on iOS when users add a progressive web app to the home screen, define an `apple-touch-icon`. It must point to a non-transparent 192px (or 180px) square PNG. [Learn More](https://web.dev/apple-touch-icon/).",
        "groups": [
            "# Lighthouse: Progressive Web App",
            "Progressive Web App: PWA Optimized"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_maskable-icon",
        "comment": "Manifest doesn't have a maskable icon",
        "description": "A maskable icon ensures that the image fills the entire shape without being letterboxed when installing the app on a device. [Learn more](https://web.dev/maskable-icon-audit/).",
        "groups": [
            "# Lighthouse: Progressive Web App",
            "Progressive Web App: PWA Optimized"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_pwa-cross-browser",
        "comment": "Site works cross-browser",
        "description": "To reach the most number of users, sites should work across every major browser. [Learn more](https://web.dev/pwa-cross-browser/).",
        "groups": [
            "# Lighthouse: Progressive Web App"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_pwa-page-transitions",
        "comment": "Page transitions don't feel like they block on the network",
        "description": "Transitions should feel snappy as you tap around, even on a slow network. This experience is key to a user's perception of performance. [Learn more](https://web.dev/pwa-page-transitions/).",
        "groups": [
            "# Lighthouse: Progressive Web App"
        ],
        "type": "integer"
    },
    {
        "name": "lighthouse_pwa-each-page-has-url",
        "comment": "Each page has a URL",
        "description": "Ensure individual pages are deep linkable via URL and that URLs are unique for the purpose of shareability on social media. [Learn more](https://web.dev/pwa-each-page-has-url/).",
        "groups": [
            "# Lighthouse: Progressive Web App"
        ],
        "type": "integer"
    }
];

module.exports = fields