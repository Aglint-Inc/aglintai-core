import axios from 'axios';

import { decrypt } from '../decryptApiKey';

export default function handler(req, res) {
  try {
    const apiKey = req.body.apiKey;

    if (!apiKey) {
      res.status(400).send('api key is incorrect');
    }
    let url = `https://api.lever.co/v1/postings`;

    if (req.body.offset !== 0) {
      url = `https://api.lever.co/v1/postings?offset=${req.body.offset}`;
    }

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
