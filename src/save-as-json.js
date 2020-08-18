const fs = require('fs');
const csv = require('csvtojson');

module.exports = async (csvPath, jsonPath) => {
    // read csv to workbook
    const data = {};
    data.items = await csv({delimiter: ';'}).fromFile(csvPath);
    // console.log(data);
    data.fields = [];
    const raw = JSON.stringify(data);
    fs.writeFileSync(jsonPath, raw);
    console.log('Saved to ' + jsonPath);
}