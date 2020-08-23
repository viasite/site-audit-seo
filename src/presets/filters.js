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
  {
    name: 'Status != 200',
    q: 'status!=200',
    groups: ['seo'],
  },
  {
    name: 'Not canonical',
    q: 'is_canonical=0',
    groups: ['seo'],
  },
  {
    name: 'DOM > 1500',
    q: 'dom_size>1500',
    groups: ['perf'],
  },
  {
    name: 'Images outer > 0',
    q: 'images_outer>0',
    groups: ['perf'],
  },
];
