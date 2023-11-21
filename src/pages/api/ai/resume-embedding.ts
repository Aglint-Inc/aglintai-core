/* eslint-disable security/detect-object-injection */
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
      await supabase
        .from('job_applications')
        .update({
          is_embedding: true,
        })
        .eq('application_id', req.body.application_id);

      const resumeSections = convertJsonToText(req.body.resume_json);

      // Create embeddings for each section
      const embeddings = await Promise.all(
        ['education', 'experience', 'skills', 'resume'].map(async (section) => {
          if (resumeSections[section]) {
            const response = await openai.embeddings.create({
              model: 'text-embedding-ada-002',
              input: resumeSections[section],
            });
            return { section, embedding: response.data[0].embedding };
          } else {
            return { section, embedding: null };
          }
        }),
      );

      const { error } = await supabase
        .from('job_applications')
        .update({
          resume_embedding: embeddings.filter(
            (emb) => emb.section == 'resume',
          )[0].embedding,
          skills_embedding: embeddings.filter(
            (emb) => emb.section == 'skills',
          )[0].embedding,
          education_embedding: embeddings.filter(
            (emb) => emb.section == 'education',
          )[0].embedding,
          experience_embedding: embeddings.filter(
            (emb) => emb.section == 'experience',
          )[0].embedding,
        })
        .eq('application_id', req.body.application_id);

      if (error) {
        console.log(error, req.body.application_id);
        res.status(400).send(error.message);
      } else {
        console.log('embedding updated', req.body.application_id);
        res.status(200).send('embedding updated');
        // return res.status(200).json(response.data[0].embedding);
      }
    } else {
      console.log('missing parameters', req.body.application_id);
      res.status(400).send('No text provided');
    }
  } catch (error) {
    console.log(error, req.body.application_id);
    res.status(500).send(error.message);
  }
};

export default handler;

function convertJsonToText(resume_json: any) {
  let work =
    resume_json.positions &&
    Array.isArray(resume_json.positions) &&
    resume_json.positions
      .map((rec) => {
        return `${rec.title ? rec.title : ''} ${rec.org ? rec.org : ''} ${
          rec.summary ? rec.summary : ''
        } ${rec.location && rec.location != 'N/A' ? rec.location : ''}`;
      })
      .join(' ');

  let education =
    resume_json.schools &&
    Array.isArray(resume_json.schools) &&
    resume_json.schools
      .map((rec) => {
        return `${rec.institution ? rec.institution : ''} ${
          rec.degree && rec.degree != 'N/A' ? rec.degree : ''
        } ${rec.field && rec.field != 'N/A' ? rec.field : ''} ${
          rec.gpa && rec.gpa != 'N/A' ? rec.gpa : ''
        } `;
      })
      .join(' ');

  let overview = resume_json.overview ? resume_json.overview : '';
  let skills = Array.isArray(resume_json.skills)
    ? resume_json.skills.join(' ')
    : '';

  console.log(skills);

  let certificates =
    Array.isArray(resume_json.certificates) &&
    resume_json.certificates
      .map((rec) => {
        return `${rec.name ? rec.name : ''} ${rec.issuer ? rec.issuer : ''}`;
      })
      .join(' ');

  let basics = '';
  if (resume_json.basics) {
    basics = `${
      resume_json.basics.currentCompany ? resume_json.basics.currentCompany : ''
    } ${
      resume_json.basics.currentJobTitle
        ? resume_json.basics.currentJobTitle
        : ''
    } ${resume_json.basics.location ? resume_json.basics.location : ''}`;
  }

  let languages =
    resume_json.languages &&
    Array.isArray(resume_json.languages) &&
    resume_json.languages
      .map((rec) => {
        return `${rec.language}`;
      })
      .join(' ');

  let projects =
    resume_json.projects &&
    Array.isArray(resume_json.projects) &&
    resume_json.projects
      .map((rec) => {
        return `${rec.title ? rec.title : ''} ${
          rec.summary ? rec.summary : ''
        } `;
      })
      .join(' ');

  return {
    resume: [
      basics +
        work +
        education +
        overview +
        skills +
        certificates +
        projects +
        languages,
    ].join(' '),
    education: education,
    experience: work,
    skills: skills,
  };
}
