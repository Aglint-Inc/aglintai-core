import axios from 'axios';

import { decrypt } from '../decryptApiKey';

export default function handler(req, res) {
  const apiKey = req.body.apiKey;

  const job_id = req.body.job_id;
  const page = req.body.page;
  if (job_id && page) {
    let url = `https://harvest.greenhouse.io/v1/candidates?job_id=${job_id}&per_page=500&page=${page}`;

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
    res.status(400).send('No job_id or page provided');
  }
}
