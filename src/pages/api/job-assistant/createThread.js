// This code is for v4 of the openai package: npmjs.com/package/openai
import axios from 'axios';
export default async function handler(req, res) {
  let { job_id } = req.body;
  try {
    const { data } = await axios.get('https://asia-south1-aglint-cloud-381414.cloudfunctions.net/job_assistant_v1', {
      params: {
        job_id,
      }
    });
    res.status(200).send(data);
  } catch (error) {
    // console.log(error);
    return error
  }
}

// thread_1qI6uKHyUMu5Uniyjbt0Mx9D
