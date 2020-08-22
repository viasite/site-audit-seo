const fs = require('fs');
const xlsx = require('@popstas/xlsx-style');
const xlsxOrig = require('xlsx');
const {colsValidate} = require('../validate');
const color = require('../color');

module.exports = (csvPath, xlsxPath) => {
  // validation functions for fields for xlsx

  // limit max column width
  const colWidths = {
    url: 60,
    h1: 100,
    title: 100,
    description: 100,
    keywords: 60,
    og_title: 100,
  };

  // styles presets for validation
  const styles = {
    success: {
      fill: {
        fgColor: {rgb: 'FFA4F79A'},
      },
    },
    warning: {
      fill: {
        fgColor: {rgb: 'FFFFDAA2'},
      },
    },
    error: {
      fill: {
        fgColor: {rgb: 'FFF7A19A'},
      },
    },
  };

  // styles presets for columns
  const colStyles = {
    title: {
      alignment: {
        horizontal: 'right',
      },
    },
    description: {
      alignment: {
        wrapText: true,
        indent: true,
      },
    },
    keywords: {
      alignment: {
        wrapText: true,
        indent: true,
      },
    },
  };

  const colNames = {};

  // read csv to workbook
  const csvRaw = fs.readFileSync(csvPath, 'utf-8');
  // xlsx-style cannot read csv
  const wb = xlsxOrig.read(csvRaw, {type: 'string'});
  const ws = wb.Sheets[wb.SheetNames[0]];

  const range = xlsx.utils.decode_range(ws['!ref']);
  const cols = [];

  // iterate rows
  for (let r = 0; r <= range.e.r; r++) {
    // iterate cols
    for (let c = 0; c <= range.e.c; c++) {
      const addr = xlsx.utils.encode_cell({r: r, c: c});
      if (!ws[addr]) continue;
      const colVal = ws[addr].v;

      // header
      if (r === 0) {
        const colName = colVal.
          replace('result.', '').
          replace('response.', '').
          replace('lighthouse.', '');
        ws[addr].v = colName;
        if (colName) {
          cols[c] = colName.length;
          colNames[c] = colName;
        }
      }

      // columns width
      const length = Object.values(colVal).length;
      if (!cols[c]) cols[c] = length;
      else cols[c] = Math.max(cols[c], length);

      // not applicable to first row
      if (r === 0) continue;

      const colName = colNames[c];

      // limit width
      if (colWidths[colName]) cols[c] = Math.min(colWidths[colName], cols[c]);

      // cell style
      if (colStyles[colName]) ws[addr].s = colStyles[colName];

      // url
      // if(colName == 'url')  ws[addr].l = colVal;

      // validation
      if (r > 0) {
        if (colsValidate[colName]) {
          for (let errType of ['warning', 'error', 'success']) {
            if (colsValidate[colName][errType] &&
              colsValidate[colName][errType](colVal)) {
              ws[addr].s = styles[errType];
            }
          }
        }
      }
    }
  }
  // width magic numbers for better fitting
  const colsObj = cols.map(length => {
    return {
      wch: length > 30 ? length - 4 : (length <= 5
        ? 5
        : length - 7),
    };
  });
  ws['!cols'] = colsObj;

  // fix first row and first column
  ws['!freeze'] = {
    xSplit: '1',
    ySplit: '1',
    topLeftCell: 'B2',
    activePane: 'bottomRight',
    state: 'frozen',
  };

  // work only on official sheetjs (without styles) and only in MS Office
  // ws['!autofilter'] = { ref: ws['!ref'] };

  xlsx.writeFile(wb, xlsxPath);

  console.log(`${color.yellow}${xlsxPath} saved${color.reset}`);
};
