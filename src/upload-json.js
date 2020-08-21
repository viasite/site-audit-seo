const fs = require('fs');
const axios = require('axios');

module.exports = async (jsonPath, options) => {
    const data = fs.readFileSync(jsonPath, 'utf8');
    // const raw = JSON.stringify(data);

    const date = new Date().toISOString().replace('T', '-').replace('Z', '');
    // const dateStr = date.slice(0,10);
    const name = jsonPath.replace(/[^0-9a-zа-я_.]/ig, "");
    const uploadName = date + '-' + name;

    console.log('Uploading to https://site-audit.viasite.ru...');
    const res = await axios.post('https://site-audit.viasite.ru/upload/', {
        name: uploadName,
        data: data
    });

    if (res.status !== 200 || !res.data.url) {
        console.error('Failed to upload file!');
        return jsonPath;
    }
    return res.data.url;
}
