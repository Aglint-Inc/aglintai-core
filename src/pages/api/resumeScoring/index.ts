import { promptBuilder } from './promptBuilder';
import { scoring } from './scoring';

export default async function handler(req, res) {
  const { jd_json, resume_json } = req.body;
  const results = await promptBuilder(jd_json, resume_json);
  const response = results ? scoring(results) : null;
  res.status(200).send({ response });
}
