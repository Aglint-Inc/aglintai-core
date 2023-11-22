import { NextApiRequest, NextApiResponse } from 'next';

const { TextServiceClient } = require('@google-ai/generativelanguage');
const MODEL_NAME = 'tunedModels/parser-imv5crzkxdlm';
const client = new TextServiceClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const Text_Input = req.body.text;

    const promptString = `Given INPUT is a Resume in Text format, parse the INPUT and give output using the Schema
    Text_Input ${Text_Input}
    Schema ${JSON.stringify(Schema)}
    JSON_Output`;
    const stopSequences = [];

    client
      .generateText({
        // required, which model to use to generate the result
        model: MODEL_NAME,
        // optional, 0.0 always uses the highest-probability result
        temperature: 0,
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
      .then((result) => {
        if (result[0]?.candidates[0]?.output) {
          const parsed_json = JSON.parse(result[0].candidates[0].output);
          res.status(200).json(parsed_json);
        } else {
          res.status(200).json('output is no json');
        }
      });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default handler;

const Schema = {
  basics: {
    email: '',
    phone: '',
    social: [''],
    lastName: '',
    linkedIn: '',
    location: '',
    firstName: '',
    currentCompany: '',
    currentJobTitle: '',
  },
  skills: [],
  schools: [
    {
      end: {
        year: 0,
        month: 0,
      },
      gpa: 0,
      field: '',
      start: {
        year: 0,
        month: 0,
      },
      degree: '',
      institution: '',
    },
  ],
  overview: '',
  projects: [
    {
      title: '',
    },
  ],
  languages: [],
  positions: [
    {
      end: {
        year: 0,
        month: 0,
      },
      org: '',
      start: {
        year: 0,
        month: 0,
      },
      title: '',
      summary: '',
      location: '',
    },
  ],
  certificates: [],
};
