const fs = require('fs');
const csv = require('csvtojson');
const { fields } = require('./presets/fields');

module.exports = async (csvPath, jsonPath) => {
    // read csv to workbook
    const data = {};
    data.items = await csv({delimiter: ';'}).fromFile(csvPath);

    // flatten items
    for (let i in data.items) {
        const item = data.items[i];
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
                        const k = ['result', 'response'].includes(iName) ? iName2 : iName + '_' + iName2;
                        item[k] = item[iName][iName2];
                    }
                }
                delete(item[iName]);
            }
        }
        data.items[i] = item;
    }

    data.fields = fields;

    const raw = JSON.stringify(data);
    fs.writeFileSync(jsonPath, raw);
    console.log('Saved to ' + jsonPath);
}