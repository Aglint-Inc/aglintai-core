/* eslint-disable no-console */
import { type DB } from '@aglint/shared-types';
import { createClient } from '@supabase/supabase-js';
import { type NextApiRequest, type NextApiResponse } from 'next';
import OpenAI from 'openai';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const resume_json = req.body.application.resume_json;

    const parsedResume = {
      basics: {
        ...resume_json.basics,
        totalExperienceInYears: resume_json.basics.totalExperienceInMonths
          ? resume_json.basics.totalExperienceInMonths / 12
          : null,
      },
      skills: resume_json.skills,
    };
    if (!parsedResume.basics || !parsedResume.skills) {
      console.log('required fields missing');
      return res.status(200).send('required fields missing');
    }

    console.log('openai');

    const result = await openAiHandler(parsedResume);

    if (result) {
      await supabase
        .from('candidate_files')
        .update({
          resume_json: { ...resume_json, overview: result },
        })
        .eq('id', req.body.application.file_id);
    }
    console.log(result, req.body.application.file_id);
    return res.status(200).send(result);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

export default handler;

const openAiHandler = async (resume) => {
  const response = openai.chat.completions.create({
    model: 'gpt-3.5-turbo-1106',
    messages: [
      {
        role: 'system',
        content: `Here is resume_json : '''${JSON.stringify(
          resume,
        )}'''. Generate a resume overview of 2 to 3 line based on the provided resume JSON. The overview should encompass current job title, and mention 2 to 3 skills from resume json. Dont unnecessary mention years of experience, or any other information in their overview. The overview should be in third person.`,
      },
    ],
    temperature: 0.8,
    top_p: 0.8,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  const responseB = await response;
  return responseB.choices[0].message.content;
};
