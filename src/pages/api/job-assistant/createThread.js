// This code is for v4 of the openai package: npmjs.com/package/openai
// import axios from 'axios';
// export default async function handler(req, res) {
//   let { job_id } = req.body;
//   try {
//     const { data } = await axios.get('https://asia-south1-aglint-cloud-381414.cloudfunctions.net/job_assistant_v1', {
//       params: {
//         job_id,
//       }
//     });
//     res.status(200).send(data);
//   } catch (error) {
//     // console.log(error);
//     return error
//   }
// }

// thread_1qI6uKHyUMu5Uniyjbt0Mx9D

// This code is for v4 of the openai package: npmjs.com/package/openai
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

async function getRunAgain(emptyThread, run_id) {
  const run = await openai.beta.threads.runs.retrieve(
    emptyThread.id,
    run_id,
  );

  return run
}
export default async function handler(req, res) {

  let { job_descriptions } = req.body;
  try {
    const emptyThread = await openai.beta.threads.create({
      messages: [
        {
          role: 'user',
          content: `
          This is Job descriptions 
          ${job_descriptions}
          don't do any function call or requires_action just give short descriptions of the JD.
          `
        }
      ]
    });

    let runData = await openai.beta.threads.runs.create(emptyThread.id, {
      assistant_id: 'asst_27h3RtPzVREMYuLNPykmrivi',
    });


    runData = await getRunAgain(emptyThread, runData.id);

    do {
      runData = await getRunAgain(emptyThread, runData.id)
      if (runData.status === 'completed')
        res.status(200).send(emptyThread);
    } while (runData.status !== 'completed' || runData.status !== 'expired')



  } catch (error) {
    // console.log(error);
    return error;
  }
}

// thread_1qI6uKHyUMu5Uniyjbt0Mx9D
