/* eslint-disable no-console */
import { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/src/utils/supabaseClient';

const { TextServiceClient } = require('@google-ai/generativelanguage');
const { GoogleAuth } = require('google-auth-library');

const MODEL_NAME = 'models/text-bison-001';
const API_KEY = 'AIzaSyAn6lmvXMuUJr_uGWqTT84o4oMyWF84iwc';

const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const resume_json = req.body.application.json_resume;

    const input = `Here is resume_json : ${JSON.stringify(resume_json)} .
                    Generate a 2 line overview of this resume provide above. Try to mention current job title, years of experience and some skills`;
    const promptString = `${input}`;
    const stopSequences = [];

    client
      .generateText({
        // required, which model to use to generate the result
        model: MODEL_NAME,
        // optional, 0.0 always uses the highest-probability result
        temperature: 0.25,
        // optional, how many candidate results to generate
        candidateCount: 1,
        // optional, number of most probable tokens to consider for generation
        top_k: 40,
        // optional, for nucleus sampling decoding strategy
        top_p: 0.95,
        // optional, maximum number of output tokens to generate
        max_output_tokens: 1024,
        // optional, sequences at which to stop model generation
        stop_sequences: stopSequences,
        // optional, safety settings
        safety_settings: [
          { category: 'HARM_CATEGORY_DEROGATORY', threshold: 1 },
          { category: 'HARM_CATEGORY_TOXICITY', threshold: 1 },
          { category: 'HARM_CATEGORY_VIOLENCE', threshold: 2 },
          { category: 'HARM_CATEGORY_SEXUAL', threshold: 2 },
          { category: 'HARM_CATEGORY_MEDICAL', threshold: 2 },
          { category: 'HARM_CATEGORY_DANGEROUS', threshold: 2 },
        ],
        prompt: {
          text: promptString,
        },
      })
      .then(async (result) => {
        const overview = result[0].candidates[0].output;
        // eslint-disable-next-line no-console
        if (overview) {
          const { error } = await supabase
            .from('job_applications')
            .update({ json_resume: { ...resume_json, overview: overview } })
            .eq('application_id', req.body.application.application_id);
          if (!error) {
            console.log(overview, req.body.application.application_id);
            return res.status(200).json(overview);
          } else {
            console.log(error, req.body.application.application_id);
            return res.status(200).send(error.message);
          }
        }
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default handler;
