// module.exports.handler = async function (event, context) {
//     return {
//         statusCode: 200,
//         body: 'Hello World!',
//     };
// };

const AWS = require('aws-sdk');
const { parse } = require('querystring');

// Configure the AWS SDK to use Yandex Object Storage
AWS.config.update({
  endpoint: 'https://storage.yandexcloud.net',
  accessKeyId: process.env.ACCESS_KEY_ID, // Set these in your environment variables
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: 'us-east-1' // This can be any dummy region, as it's required by AWS SDK
});

const s3 = new AWS.S3();


// generate 4 hex symbols
function getHash() {
  const symbols = '0123456789abcdef';
  let hash = '';
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * symbols.length);
    hash += symbols[randomIndex];
  }
  return hash;
}

exports.handler = async function(event, context) {
  // Assuming the event is the HTTP request
  const { httpMethod, body } = event;

  if (httpMethod !== 'POST' || !body) {
    return { statusCode: 400, body: 'Invalid request' };
  }

  // Parse the JSON body
  const { name, data } = JSON.parse(body);
  if (!name || !data) {
    return { statusCode: 400, body: 'Missing name or data' };
  }
  if (!name.match(/\.json$/)) {
    return { statusCode: 400, body: 'Only .json names are allowed' };
  }

  // prepend yyyy-mm-dd__h-i-s__ to name
  const prefix = new Date().toISOString().replace(/[-:.]/g, '_');
  let filename = `${prefix}__${getHash()}-${name}`;
  if (name.match(/^\d/)) filename = name;

  // Convert data to a buffer or string as needed
  const fileContent = Buffer.from(JSON.stringify(data));

  // Define the file to be saved in Object Storage
  const params = {
    Bucket: process.env.BUCKET_NAME, // Set in your environment variables
    Key: filename, // Use the name from the JSON as the file name
    Body: fileContent,
    ContentType: 'application/json'
  };

  try {
    // Upload the file to Object Storage
    await s3.putObject(params).promise();

    // Generate the URL to access the file
    const fileUrl = `https://${params.Bucket}.storage.yandexcloud.net/${params.Key}`;

    return {
      statusCode: 200,
      body: JSON.stringify({ url: fileUrl })
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { statusCode: 500, body: 'Error uploading file' };
  }
};