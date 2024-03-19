import axios from 'axios';
const crypto = require('crypto');

export default function handler(req, res) {
  try {
    const apiKey = req.body.apiKey;
    const page = req.body.page;
    if (!apiKey) {
      res.status(400).send('api key is needed');
    }
    let url = `https://harvest.greenhouse.io/v1/job_posts?per_page=500&page=${page}`;

    let decryptedApiKey;

    if (!req.body.isInitial) {
      decryptedApiKey = decrypt(apiKey, process.env.ENCRYPTION_KEY);
    }

    axios
      .get(url, {
        auth: {
          username: !req.body.isInitial ? decryptedApiKey : apiKey,
          password: '',
        },
      })
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((error) => {
        res.status(200).send(error);
      });
  } catch (error) {
    res.status(400).send(error);
  }
}

// Decrypt data using AES-256
function decrypt(encryptedData, encryptionKey) {
  const decipher = crypto.createDecipher('aes256', encryptionKey);
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');
  return decryptedData;
}
