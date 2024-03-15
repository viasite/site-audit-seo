import fs from 'fs';
import axios from 'axios';
import { getJsonName } from '../utils.js';
import config from "../config.js";

export default async (jsonPath) => {
  const data = fs.readFileSync(jsonPath, 'utf8');

  const uploadName = getJsonName(jsonPath);

  const viewerOrigin = config.viewerOrigin || 'https://site-audit.viasite.ru';
  const uploadOrigin = config.uploadOrigin || `${viewerOrigin}`;
  const uploadUrl = `${uploadOrigin}/upload/`;

  console.log(`Uploading to ${uploadUrl}...`);
  const res = await axios.post(`${uploadUrl}`, {
    name: uploadName,
    data: data,
    upload_origin: uploadOrigin,
  });

  if (res.status !== 200 || !res.data.url) {
    console.error('Failed to upload file!');
    return jsonPath;
  }
  return res.data.url;
};
