import fs from 'fs';
import axios from 'axios';
import { getJsonName } from '../utils.js';
import config from "../config.js";

export default async (jsonPath) => {
  const data = fs.readFileSync(jsonPath, 'utf8');

  const uploadName = getJsonName(jsonPath);

  const viewerOrigin = config.viewerOrigin || ""; //'https://site-audit.viasite.ru';
  const uploadOrigin = config.uploadOrigin || `${viewerOrigin}`;
  const uploadUrl = uploadOrigin ? `${uploadOrigin}/upload/` : "";

  let uploadedUrl;

  if (uploadUrl) {
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

    uploadedUrl = res.data.url;
  }
  else {
    try {
      console.log("Uploading to cloud...");
      uploadedUrl = await uploadToCloud(jsonPath);
    } catch(e) {
      console.error('Failed to upload to cloud!');
      console.error(e);
    }
  }

  return uploadedUrl;
};

async function uploadToCloud(jsonPath) {
  const uploadUrl = config.uploadUrl;
  if (!uploadUrl) return;

  const uploadName = getJsonName(jsonPath);
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  const viewerOrigin = config.viewerOrigin || 'https://site-audit.viasite.ru';
  const uploadOrigin = config.uploadOrigin || `${viewerOrigin}`;

  const res = await axios.post(`${uploadUrl}`, {
    name: uploadName,
    data: data,
    upload_origin: uploadOrigin,
  }, {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  // console.log("res:", res);
  if (res.status !== 200 || !res.data.url) {
    console.error('Failed to upload file!');
    return jsonPath;
  }

  return res.data.url;
}
