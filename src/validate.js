import _ from 'lodash';

const lighthouseValidateScore = {
  success: (v) => v >= 90,
  warning: (v) => v < 90,
  error: (v) => v < 50,
};

const warnErrorThresholds = (warn, error, isSuccess = true) => {
  const rules = {
    warning: (v) => v > warn,
    error: (v) => v > error,
  };
  if (isSuccess) {
    rules.success = (v) => v <= warn;
  }
  return rules;
};

export const colsValidate = {
  mixed_content_url: {
    error: (v) => !!v,
  },
  is_canonical: {
    error: (v) => v === 0 || v === '0',
  },
  request_time: {
    warning: (v) => v > 500,
    error: (v) => v > 1000,
  },
  status: {
    error: (v) => v != 200,
  },
  title: {
    error: (v) => v?.length === 0,
    errorMsg: (v) => v.length,
  },
  description: {
    warning: (v) => v?.length > 256,
    warningMsg: (v) => v.length,
  },
  h1_count: {
    warning: (v) => v == 0,
    error: (v) => v > 1,
  },
  canonical_count: {
    warning: (v) => v > 1,
  },
  dom_size: {
    warning: (v) => v > 1500,
    error: (v) => v > 3000,
  },
  text_ratio: {
    warning: (v) => v < 10,
  },
  html_size: {
    warning: (v) => v > 1000000,
  },

  'scores.performance': lighthouseValidateScore,
  'scores.pwa': lighthouseValidateScore,
  'scores.accessibility': lighthouseValidateScore,
  'scores.best-practices': lighthouseValidateScore,
  'scores.seo': lighthouseValidateScore,

  // https://web.dev/lighthouse-performance/
  'first-contentful-paint': warnErrorThresholds(2000, 4000),
  'speed-index': warnErrorThresholds(4300, 5800),
  'largest-contentful-paint': warnErrorThresholds(2500, 4000),
  'interactive': warnErrorThresholds(3800, 7300),
  'total-blocking-time': warnErrorThresholds(300, 600),
  'cumulative-layout-shift': warnErrorThresholds(100, 250),
};

const validationSum = {};

export const validateResults = (results, fields) => {
  const validate = {};
  for (let fName of fields) {
    // get value
    const wrapper = _.at(results, fName);
    const colVal = _.first(wrapper);
    const colName = fName.replace('result.', '').replace('response.', '');
    let msg;

    // validate
    if (!colsValidate[colName]) continue;

    for (let type of ['error', 'warning']) {
      const test = colsValidate[colName][type];
      if (!test) continue;

      const invalid = test(colVal);
      if (!invalid) continue;

      const msgRender = colsValidate[colName][`${type}Msg`]; // warningMsg
      msg = msgRender ? msgRender(colVal) : colVal;

      validate[colName] = {type, msg};

      if (!validationSum[colName]) validationSum[colName] = [];
      validationSum[colName].push({type, msg, url: results.response.url});

      break;
    }
  }
  return validate;
};

export const getValidationSum = () => validationSum;
