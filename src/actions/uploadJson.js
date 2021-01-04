const fs = require('fs');
const axios = require('axios');
const {getJsonName} = require('../utils');

module.exports = async (jsonPath) => {
  const data = fs.readFileSync(jsonPath, 'utf8');
  // const raw = JSON.stringify(data);

  const uploadName = getJsonName(jsonPath);

  console.log('\nUploading to https://site-audit.viasite.ru...');
  const res = await axios.post('https://site-audit.viasite.ru/upload/', {
    name: uploadName,
    data: data,
  });

  if (res.status !== 200 || !res.data.url) {
    console.error('Failed to upload file!');
    return jsonPath;
  }
  return res.data.url;
};
