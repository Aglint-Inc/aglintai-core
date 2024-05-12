import axios from 'axios';
const crypto = require('crypto');

export default function handler(req, res) {
  const apiKey = req.body.apiKey;

  const postingId = req.body.posting_id;
  if (postingId) {
    let url = `https://api.lever.co/v1/opportunities?posting_id=${postingId}`;

    if (req.body.offset !== 0) {
      url = `https://api.lever.co/v1/opportunities?posting_id=${postingId}&offset=${req.body.offset}`;
    }

    axios
      .get(url, {
        auth: {
          username: decrypt(apiKey, process.env.ENCRYPTION_KEY),
          password: '',
        },
      })
      .then((response) => {
        res.status(200).send(response.data);
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  } else {
    res.status(400).send('No posting_id provided');
  }
}

// Decrypt data using AES-256
function decrypt(encryptedData, encryptionKey) {
  const decipher = crypto.createDecipher('aes256', encryptionKey);
  let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
  decryptedData += decipher.final('utf8');
  return decryptedData;
}
