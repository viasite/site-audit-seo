const {at} = require('lodash');

const colsValidate = {
  mixed_content: {
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
  description: {
    warning: (v) => v.length > 256,
    warningMsg: (v) => v.length
  },
  h1_count: {
    warning: (v) => v == 0,
    error: (v) => v > 1,
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
};

exports.colsValidate = colsValidate;

exports.validateResults = (results, fields) => {
  const validate = {};
  for(let fName of fields) {
    // get value
    const colVal = at(results, fName)[0];
    const colName = fName.replace('result.', '').replace('response.', '');
    let msg;

    // validate
    if(colsValidate[colName]){
      if(colsValidate[colName].warning && colsValidate[colName].warning(colVal)){
        msg = colsValidate[colName].warningMsg ? colsValidate[colName].warningMsg(colVal) : colVal;
        validate[colName] = { type: 'warning', msg: msg };
      }
      if(colsValidate[colName].error && colsValidate[colName].error(colVal)){
        msg = colsValidate[colName].errorMsg ? colsValidate[colName].errorMsg(colVal) : colVal;
        validate[colName] = { type: 'error', msg: msg };
      }
    }
  }
  return validate;
};
