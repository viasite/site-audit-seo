const fs = require('fs');
const xlsx = require('@popstas/xlsx-style');
const xlsxOrig = require('xlsx');

module.exports = (csvPath, xlsxPath) => {
  // validation functions for fields for xlsx
  const colsValidate = {
    mixed_content: {
      error: (v) => !!v
    },
    is_canonical: {
      error: (v) => v == 0
    },
    request_time: {
      warning: (v) => v > 500,
      error: (v) => v > 1000
    },
    status: {
      error: (v) => v != 200
    },
    description: {
      warning: (v) => v.length > 256
    },
    h1_count: {
      warning: (v) => v == 0,
      error: (v) => v > 1
    },
    dom_size: {
      warning: (v) => v > 1500,
      error: (v) => v > 3000
    },
    html_size: {
      warning: (v) => v > 1000000
    }
  }

  // limit max column width
  const colWidths = {
    url: 60,
    h1: 100,
    title: 100,
    description: 100,
    keywords: 60,
    og_title: 100,
  }

  // styles presets for validation
  const styles = {
    warning: {
      font: {
        color: { rgb: "FFA09600" }
      }
    },
    error: {
      font: {
        color: { rgb: "FFFF0000" }
      }
    }
  }

  // styles presets for columns
  const colStyles = {
    title: {
      alignment: {
        horizontal: 'right'
      }
    },
    description: {
      alignment: {
        wrapText: true,
        indent: true
      }
    },
    keywords: {
      alignment: {
        wrapText: true,
        indent: true
      }
    }
  }

  const colNames = {};

  // read csv to workbook
  const csvRaw = fs.readFileSync(csvPath, 'utf-8');
  // xlsx-style cannot read csv
  const wb = xlsxOrig.read(csvRaw, {type: 'string'});
  const ws = wb.Sheets[wb.SheetNames[0]];

  const range = xlsx.utils.decode_range(ws['!ref']);
  const cols = [];

  // iterate rows
  for(let r = 0; r <= range.e.r; r++){
    // iterate cols
    for(let c = 0; c <= range.e.c; c++) {
      const addr = xlsx.utils.encode_cell({r:r, c:c});
      if(!ws[addr]) continue;
      const colVal = ws[addr].v

      // header
      if(r === 0) {
        const colName = colVal.replace('result.', '').replace('response.', '');
        ws[addr].v = colName
        if(colName) {
          cols[c] = colName.length;
          colNames[c] = colName;
        }
      }

      // columns width
      const length = Object.values(colVal).length;
      if(!cols[c]) cols[c] = length;
      else cols[c] = Math.max(cols[c], length);

      // not applicable to first row
      if(r === 0) continue;

      const colName = colNames[c];

      // limit width
      if(colWidths[colName]) cols[c] = Math.min(colWidths[colName], cols[c]);

      // cell style
      if(colStyles[colName]) ws[addr].s = colStyles[colName];

      // url
      // if(colName == 'url')  ws[addr].l = colVal;

      // validation
      if(r > 0){
        if(colsValidate[colName]){
          if(colsValidate[colName].warning && colsValidate[colName].warning(colVal)) ws[addr].s = styles.warning;
          if(colsValidate[colName].error && colsValidate[colName].error(colVal)) ws[addr].s = styles.error;
        }
      }
    }
  }
  const colsObj = cols.map(length => { return {wch: length} });
  ws['!cols'] = colsObj;

  // fix first row and first column
  ws['!freeze'] = { xSplit: "1", ySplit: "1", topLeftCell: "B2", activePane: "bottomRight", state: "frozen" };
  
  // work only on official sheetjs (without styles) and only in MS Office
  // ws['!autofilter'] = { ref: ws['!ref'] };

  xlsx.writeFile(wb, xlsxPath);
}