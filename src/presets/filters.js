module.exports = [
  {
    name: 'PageSpeed < 90%',
    q: 'lighthouse_scores_performance<90',
    groups: ['main', 'perf', 'lighthouse'],
  },
  {
    name: 'Request time > 1000',
    q: 'request_time>1000',
    groups: ['main', 'perf'],
  },
  {
    name: 'H1 != 1',
    q: 'h1_count!=1',
    groups: ['seo'],
  },
];
