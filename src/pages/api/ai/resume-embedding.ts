/* eslint-disable no-console */
import { createClient } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.body.application_id && req.body.resume_json) {
      const resume_text = convertJsonToText(req.body.resume_json);
      const response = await openai.embeddings.create({
        model: 'text-embedding-ada-002',
        input: resume_text,
      });

      const { error } = await supabase
        .from('job_applications')
        .update({ resume_embedding: response.data[0].embedding })
        .eq('application_id', req.body.application_id);

      if (error) {
        console.log(error);
        res.status(400).send(error.message);
      } else {
        console.log('embedding updated');
        return res.status(200).json(response.data[0].embedding);
      }
    } else {
      res.status(400).send('No text provided');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default handler;

function convertJsonToText(resume_json: any) {
  let work =
    Array.isArray(resume_json.work) &&
    resume_json.work
      .map((rec) => {
        return `${rec.name ? rec.name : ''} ${
          rec.position ? rec.position : ''
        } ${rec.startDate ? rec.startDate : ''} ${
          rec.endDate ? rec.endDate : ''
        } ${rec.summary ? rec.summary : ''} ${
          rec.highlights ? rec.highlights.join(' ') : ''
        } ${rec.skills_used ? rec.skills_used.join(' ') : ''}`;
      })
      .join(' ');

  let education =
    Array.isArray(resume_json.education) &&
    resume_json.education
      .map((rec) => {
        return `${rec.institution ? rec.institution : ''} ${
          rec.studyType ? rec.studyType : ''
        } ${rec.startDate ? rec.startDate : ''} ${
          rec.endDate ? rec.endDate : ''
        } ${rec.area ? rec.area : ''}`;
      })
      .join(' ');

  let strength = resume_json.strength ? resume_json.strength : '';
  let weakness = resume_json.weakness ? resume_json.weakness : '';
  let overview = resume_json.overview ? resume_json.overview : '';
  let skills = resume_json.skills.join(' ');
  let certificates =
    Array.isArray(resume_json.certificates) &&
    resume_json.certificates
      .map((rec) => {
        return `${rec.name ? rec.name : ''} ${rec.issuer ? rec.issuer : ''}`;
      })
      .join(' ');

  let basics = `${resume_json.basics.email ? resume_json.basics.email : ''} ${
    resume_json.basics.phone ? resume_json.basics.phone : ''
  } ${resume_json.basics.lastName ? resume_json.basics.lastName : ''} ${
    resume_json.basics.firstName ? resume_json.basics.firstName : ''
  } ${
    resume_json.basics.location.city ? resume_json.basics.location.city : ''
  } ${
    resume_json.basics.location.region ? resume_json.basics.location.region : ''
  } ${
    resume_json.basics.location.address
      ? resume_json.basics.location.address
      : ''
  } ${
    resume_json.basics.location.country
      ? resume_json.basics.location.country
      : ''
  } ${
    resume_json.basics.location.postalCode
      ? resume_json.basics.location.postalCode
      : ''
  }`;

  let languages =
    Array.isArray(resume_json.languages) &&
    resume_json.languages
      .map((rec) => {
        return `${rec.language}`;
      })
      .join(' ');

  let projects =
    Array.isArray(resume_json.projects) &&
    resume_json.projects
      .map((rec) => {
        return `${rec.name ? rec.name : ''} ${
          rec.highlights.join(' ') ? rec.highlights.join(' ') : ''
        } ${rec.description ? rec.description : ''} `;
      })
      .join(' ');

  return [
    basics +
      work +
      education +
      strength +
      weakness +
      overview +
      skills +
      certificates +
      projects +
      languages,
  ].join(' ');
}
