import axios from 'axios';

import { decrypt } from '../decryptApiKey';

export default function handler(req, res) {
  try {
    const apiKey = req.body.apiKey;
    const page = req.body.page;
    if (!apiKey) {
      res.status(400).send('api key is needed');
    }
    let url = `https://harvest.greenhouse.io/v1/job_posts?per_page=500&page=${page}&live=true&active=true`;

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
