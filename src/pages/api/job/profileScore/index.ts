/* eslint-disable security/detect-object-injection */

import {
  type CookieOptions,
  createServerClient,
  serialize,
} from '@supabase/ssr';
import { nanoid } from 'nanoid';
import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

import { JdJsonType } from '@/src/components/JobsDashboard/JobPostCreateUpdate/JobPostFormProvider';
import { Database } from '@/src/types/schema';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export type OpenAi = typeof openai.chat.completions.create;

export const config = {
  maxDuration: 300,
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<JobProfileScoreApi['response']>,
) => {
  // eslint-disable-next-line no-unused-vars
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies[name];
        },
        set(name: string, value: string, options: CookieOptions) {
          res.setHeader('Set-Cookie', serialize(name, value, options));
        },
        remove(name: string, options: CookieOptions) {
          res.setHeader('Set-Cookie', serialize(name, '', options));
        },
      },
    },
  );
  const { job_id } = req.body as JobProfileScoreApi['request'];
  const { data } = await supabase
    .from('public_jobs')
    .select('description, draft, job_title')
    .eq('id', job_id);
  if (
    !(
      data &&
      data[0] &&
      data[0]?.description &&
      data[0]?.description.length > 100
    )
  ) {
    await supabase
      .from('public_jobs')
      .update({ scoring_param_status: null })
      .eq('id', job_id);
    res.status(200).send();
    return;
  }
  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Timed out'));
    }, 250000);
  });
  try {
    await supabase
      .from('public_jobs')
      .update({ scoring_param_status: 'loading' })
      .eq('id', job_id);
    const job = data[0];
    const jsonPromise = jdJson(
      `Job Role : ${job.job_title}

${job.description}
`,
    );
    const json = await Promise.race([jsonPromise, timeoutPromise]);
    const j: JdJsonType = {
      title: job.job_title,
      level: json.jobLevel,
      rolesResponsibilities: arrItemToReactArr([
        ...json.roles,
        ...json.responsibilities,
        ...json.requirements,
      ]),
      skills: arrItemToReactArr([...json.skills]),
      educations: arrItemToReactArr([...json.educations]),
    };
    await supabase
      .from('public_jobs')
      .update({
        jd_json: j,
        draft: { ...(job.draft as any), jd_json: j },
        scoring_param_status: 'success',
      })
      .eq('id', job_id);
    res.status(200).send();
    return;
  } catch (e) {
    await supabase
      .from('public_jobs')
      .update({ scoring_param_status: null })
      .eq('id', job_id);
    res.status(200).send();
    return;
  }
};

const arrItemToReactArr = (arr: any[]) => {
  return arr.map((a) => ({ ...a, id: nanoid() }));
};

export const jdJson = async (description: string) => {
  const messages: any[] = [
    {
      role: 'system',
      content: `
You're an helpful assistant. You're given a job description, 
Analyze the job description provided and categorize the roles,responsibilities, requirements, skills, education into "must-have" and "preferred".

You're given a job description, and your task is to extract and return the information in the following JSON format:

export type JsonItemType = {
  field: string;
  isMustHave: boolean;  // If the field is absolutely necessary, then the value is true; otherwise, it's false.
};

export type JdJson = {
  roles: JsonItemType[]; // previous roles and number of years.
  responsibilities: JsonItemType[]; // responsibilities mentioned in job description.
  requirements: JsonItemType[]; // requirements ( exclude degree or skill mentioned in the requirements ) .
  jobLevel:enum // 'Fresher-level', 'Associate-level', 'Mid-level', 'Senior-level', 'Executive-level',
  skills: JsonItemType[]; // Each Skill mentioned in roles, reponsibilities and requirements and whether they are a must-have.
  educations: JsonItemType[]; // Each Education degree mentioned in roles, reponsibilities and requirements and whether they are a must-have .
};
`,
    },
    {
      role: 'user',
      content: `
Here is the Job Description
${description}
`,
    },
  ];

  const result = await openai.chat.completions.create({
    messages,
    model: 'gpt-3.5-turbo-1106',
    temperature: 1,
    response_format: {
      type: 'json_object',
    },
  });
  return JSON.parse(result.choices[0].message.content);
};

export default handler;

export type JobProfileScoreApi = {
  request: {
    job_id: string;
  };
  response: void;
};
