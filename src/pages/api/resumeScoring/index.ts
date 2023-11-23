import { promptBuilder } from './promptBuilder';
import { scoring } from './scoring';

export default async function handler(req, res) {
  const { job_json, resume_json } = req.body;
  const results = await promptBuilder(job_json, resume_json);
  const response = scoring(results);
  res.status(200).send({ response });
}
