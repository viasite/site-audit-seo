const fs = require('fs');
const csv = require('csvtojson');
const {fields} = require('../presets/fields');
const filters = require('../presets/filters');
const columns = require('../presets/columns');

const defaultField = 'url';

// return json object
// TODO: too much arguments

module.exports = async ({csvPath, jsonPath, lang, preset, defaultFilter, url, args, scanTime, itemsPartial = [], partNum = 0, startTime = 0}) => {
  // read csv to workbook
  const data = {};

  // items
  data.items = await csv({delimiter: ';'}).fromFile(csvPath);
  data.items = flattenItems(data.items);
  if (itemsPartial.length > 0) {
    data.items = [...itemsPartial, ...data.items];
  }

  // fields
  data.fields = buildFields(fields, data.items, lang);

  // filters
  data.filters = filters;
  if (defaultFilter) {
    const found = data.filters.find(f => f.q === defaultFilter);
    if (found) found.default = true;
    else {
      data.filters.push({
        name: defaultFilter,
        q: defaultFilter,
        default: true
      });
    }
  }

  // columns
  data.columns = buildColumns(columns, preset);

  data.scan = {
    url: url,
    args: args,
    startTime: startTime,
    version: require('../../package.json').version,
    time: scanTime,
    partNum: partNum,
  }

  // filter empty redirected items
  console.log("data.items before filter:", data.items.length);
  data.items = data.items.filter((item, i, self) => {
    const hasBetter = self.filter((t, i2) => {
      if (t.redirected_from === item.url) return true;

      if (i < i2) return false; // exclude previous items
      if (i === i2) return false; // exclude self
      if (t.url === item.url) return true;
    });
    return hasBetter.length === 0;
    // return last element of hasBetter
    /*if (hasBetter.length === 0) {
      return true;
    } else {
      const isNotEmpty = data.items.some(i => {
        return i.redirected_from === item.url
          || (i.status && i.url === item.url)
      });
      return !isNotEmpty;
    }*/
  });

  // write
  const raw = JSON.stringify(data);
  fs.writeFileSync(jsonPath, raw);

  const msg = `Saved ${data.items.length} items` + (itemsPartial.length > 0 ? `, including ${itemsPartial.length} previous items` : '');
  console.log("saveAsJson:", msg);

  return data;
};

function flattenItems(items) {
  // flatten items
  for (let i in items) {
    const item = items[i];
    for (let iName in item) {
      if (['result', 'response', 'lighthouse', 'scores'].includes(iName)) {
        for (let iName2 in item[iName]) {
          // 3rd level
          if (typeof item[iName][iName2] === 'object') {
            for (let iName3 in item[iName][iName2]) {
              const k = `${iName}_${iName2}_${iName3}`;
              item[k] = item[iName][iName2][iName3];
            }
          } else {
            const k = ['result', 'response'].includes(iName) ?
              iName2 :
              (iName + '_' + iName2);
            item[k] = item[iName][iName2];
          }
        }
        delete (item[iName]);
      }

      // value types
      for (let iName in item) {
        const fDef = fields.find(f => f.name == iName);
        if (fDef) {
          if (fDef.type === 'integer' || fDef.type === 'boolean') {
            item[iName] = parseInt(item[iName]);
          }
        }
      }

      items[i] = item;
    }
  }

  return items;
}

function buildFields(fields, items, lang) {
  // en translation
  if (lang !== 'ru') {
    for (let i in fields) {
      const field = fields[i];
      for (let fName of ['comment', 'description', 'groups']) {
        const k = `${fName}_${lang}`;
        if (!field[k]) continue;
        field[fName] = field[k];
        delete (field[k]);
      }
    }
  }

  // lighthouse validation 1/0, field values based
  for (let i in fields) {
    const field = fields[i];

    if (!field.name.includes('lighthouse_')) continue;

    const isBinValidate = field.validate && !field.validate.warning &&
      field.validate.error == '== 0';
    if (!isBinValidate) continue;

    const moreThanBin = items.filter(
      item => ![0, 1, NaN].includes(item[field.name]));
    if (moreThanBin.length === 0) continue;
    // const vals = moreThanBin.map(item => item[field.name]);

    delete (field.validate);
    fields[i] = field;
  }

  // default field in viewer
  for (let i in fields) {
    if (fields[i].name === defaultField) {
      fields[i].default = true;
    }
  }

  return fields;
}

function buildColumns(columns, preset) {
  for (let c in columns) {
    const col = columns[c];
    if (col.presets && col.presets.includes(preset)) {
      columns[c].default = true;
    }
  }
  return columns;
}
