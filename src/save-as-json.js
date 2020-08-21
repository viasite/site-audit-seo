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

            // value types
            for (let iName in item) {
                const fDef = fields.find(f => f.name == iName);
                if (fDef) {
                    if(fDef.type === 'integer' || fDef.type === 'boolean') {
                        item[iName] = parseInt(item[iName]);
                    }
                }
            }

            data.items[i] = item;
        }
    }

    data.fields = fields;

    // lighthouse validation 1/0, field values based
    for (let i in data.fields) {
        const field = data.fields[i];

        if (!field.name.includes('lighthouse_')) continue;

        const isBinValidate = field.validate && !field.validate.warning && field.validate.error == '== 0';
        if (!isBinValidate) continue;

        const moreThanBin = data.items.filter(item => ![0, 1, NaN].includes(item[field.name]) );
        if (moreThanBin.length === 0) continue;
        const vals = moreThanBin.map(item => item[field.name]);

        delete(field.validate);
        data.fields[i] = field;
    }

    const raw = JSON.stringify(data);
    fs.writeFileSync(jsonPath, raw);
    console.log('Saved to ' + jsonPath);
}