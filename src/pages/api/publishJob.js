import axios from 'axios';
import { htmlToText } from 'html-to-text';

export default async function handler(req, res) {
  const jobFormData = req.body.data;
  const jd_text = htmlToText(jobFormData.job_description);
  await axios.post(
    'https://northamerica-northeast2-aglint-cloud-381414.cloudfunctions.net/jd-to-json-parser',
    {
      job_title: jobFormData.job_title,
      job_description: jd_text,
      skills: jobFormData.skills,
      job_id: jobFormData.job_id,
      retry: 5,
      test: false,
    },
  );

  return res.status(200).json('success');
}
