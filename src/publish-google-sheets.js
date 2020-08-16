const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const path = require('path');
const color = require('./color');

// If modifying these scopes, delete token.json.
const SCOPES = [
    'https://www.googleapis.com/auth/drive.metadata.readonly',
    'https://www.googleapis.com/auth/drive.file',
];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const homedir = require('os').homedir();
const TOKEN_PATH = `${homedir}/.site-audit-seo-gdrive-token.json`;
const folderName = 'site-audit-seo';


module.exports = async (xlsxPath) => {
  // Load client secrets from a local file.
  /*fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content), async (auth) => {
      // listFiles(auth);
      await uploadReport(auth, xlsxPath)
    });
  });*/

  const authOptions = {
    "installed": {
      "client_id": "416232515295-pb3mu9k72vct3ib0convsunvkqjfhsdo.apps.googleusercontent.com",
      "project_id": "site-audit-seo-1597591908441",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_secret": "3blHzzKvwIiK0r81h-s6wnhR",
      "redirect_uris": ["urn:ietf:wg:oauth:2.0:oob", "http://localhost"]
    }
  }

  authorize(authOptions, async (auth) => {
    // listFiles(auth);
    await uploadReport(auth, xlsxPath)
  });
}

async function uploadReport(auth, xlsxPath) {
  const drive = google.drive({version: 'v3', auth});

  const filename = new Date().toLocaleString() + ' ' + path.basename(xlsxPath);

  let folderId;

  // get gdrive folder
  const folders = await drive.files.list({
    pageSize: 100,
    fields: 'nextPageToken, files(id, name, webViewLink)',
    q: "mimeType='application/vnd.google-apps.folder' and name='"+folderName+"' and trashed=false"
  });
  if (folders.data && folders.data.files.length >= 1) {
    // use existing folder
    folderId = folders.data.files[0].id;
  } else {
    // create folder
    const folder = await drive.files.create({
      resource: {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder'
      },
      fields: ['id']
    });
    folderId = folder.data.id;
  }
  if (!folderId) {
    console.log(`Error creating folder ${folderName}`);
  }

  // upload file
  const res = await drive.files.create({
    requestBody: {
      name: filename,
      mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      parents: [ folderId ]
    },
    media: {
      body: fs.createReadStream(xlsxPath),
    },
    fields: 'webViewLink'
  });

  console.log(`\n${color.yellow}Google Drive:${color.reset}`);
  console.log(`Saved to: ${folderName}/${filename}`);
  console.log('URL:      ' + res.data.webViewLink);
  // console.log(res.data);
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('\nAuthorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('\nEnter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}
