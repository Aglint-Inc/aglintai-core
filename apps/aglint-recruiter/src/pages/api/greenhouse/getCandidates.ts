import axios from 'axios';

import { decrypt } from '../decryptApiKey';

export default function handler(req, res) {
  const apiKey = req.body.apiKey;

  const job_id = req.body.job_id;
  const page = req.body.page;
  if (job_id && page) {
    getGreenhouseCandidates(decrypt(apiKey, process.env.ENCRYPTION_KEY), {
      ats_job_id: job_id,
      page,
    })
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((error) => {
        res.status(400).send(String(error));
      });
  } else {
    res.status(400).send('No job_id or page provided');
  }
}

export async function getGreenhouseCandidates(
  key: string,
  data: { ats_job_id: number; page: number },
) {
  let url = `https://harvest.greenhouse.io/v1/candidates?job_id=${data.ats_job_id}&per_page=500&page=${data.page}`;
  const res = await axios.get(url, {
    auth: {
      username: key,
      password: '',
    },
  });
  if (res.status !== 200) {
    throw new Error(res.data?.message || 'Greenhouse Candidate API Failed!');
  }
  return res.data as any[];
}
