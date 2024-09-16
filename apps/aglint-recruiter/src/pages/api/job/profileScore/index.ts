/* eslint-disable security/detect-object-injection */

import { type DatabaseTable } from '@aglint/shared-types';
import { nanoid } from 'nanoid';
import { type NextApiRequest, type NextApiResponse } from 'next';
import OpenAI from 'openai';
import { type ChatCompletionMessageParam } from 'openai/resources';

import { distributeScoreWeights } from '@/job/utils';
import { supabaseAdmin } from '@/utils/supabase/supabaseAdmin';

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
  const { job_id, regenerate = false } =
    req.body as JobProfileScoreApi['request'];
  const { data: job } = await supabaseAdmin
    .from('public_jobs')
    .select('description, draft, job_title')
    .eq('id', job_id)
    .single();
  if ((job?.draft?.description ?? '').length < 100) {
    await supabaseAdmin
      .from('public_jobs')
      .update({ scoring_criteria_loading: false })
      .eq('id', job_id);
    res.status(200).send();
    return;
  }
  const timeoutPromise = new Promise((_resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Timed out'));
    }, 250000);
  });
  try {
    await supabaseAdmin
      .from('public_jobs')
      .update({ scoring_criteria_loading: true })
      .eq('id', job_id)
      .single();
    const jsonPromise = newJdJson(
      `Job role : ${job.job_title}

Job description: ${(job.draft as any).description}`,
    );
    const json = await Promise.race([jsonPromise, timeoutPromise]);
    const j: DatabaseTable['public_jobs']['jd_json'] = {
      title: job.job_title,
      level: json.jobLevel,
      rolesResponsibilities: arrItemToReactArr([
        ...json.roles,
        ...json.responsibilities,
      ]),
      skills: arrItemToReactArr([...json.skills]),
      educations: arrItemToReactArr([...json.educations]),
    };
    const weights = distributeScoreWeights(j);
    const payload = {
      jd_json: j,
      draft: { ...(job.draft as any), jd_json: j },
      scoring_criteria_loading: false,
      parameter_weights: weights,
    };
    if (regenerate) delete payload.jd_json;
    await supabaseAdmin.from('public_jobs').update(payload).eq('id', job_id);
    res.status(200).send();
    return;
  } catch (e) {
    await supabaseAdmin
      .from('public_jobs')
      .update({ scoring_criteria_loading: false })
      .eq('id', job_id);
    res.status(200).send();
    return;
  }
};

const arrItemToReactArr = (arr: any[]) => {
  const unsafeArr = arr.map((a) => ({ ...a, id: nanoid() }));
  return unsafeArr.reduce(
    (acc, curr) => {
      const field = (curr?.field ?? '').trim().toLowerCase();
      if (acc.memo.includes(field)) return acc;
      acc.arr.push(curr);
      acc.memo.push(field);
      return acc;
    },
    { arr: [], memo: [] },
  ).arr;
};

// export const jdJson = async (description: string) => {
//   const messages: any[] = [
//     {
//       role: 'system',
//       content: `
// You're an helpful assistant. You're given a job description,
// Analyze the job description provided and categorize the roles,responsibilities, requirements, skills, education into "must-have" and "preferred".

// You're given a job description, and your task is to extract and return the information in the following JSON format:

// export type JsonItemType = {
//   field: string;
//   isMustHave: boolean;  // If the field is absolutely necessary, then the value is true; otherwise, it's false.
// };

// export type JdJson = {
//   roles: JsonItemType[]; // previous roles and number of years.
//   responsibilities: JsonItemType[]; // responsibilities mentioned in job description.
//   requirements: JsonItemType[]; // requirements ( exclude degree or skill mentioned in the requirements ) .
//   jobLevel:enum // 'Fresher-level', 'Associate-level', 'Mid-level', 'Senior-level', 'Executive-level',
//   skills: JsonItemType[]; // Each Skill mentioned in roles, reponsibilities and requirements and whether they are a must-have.
//   educations: JsonItemType[]; // Each Education degree mentioned in roles, reponsibilities and requirements and whether they are a must-have .
// };
// `,
//     },
//     {
//       role: 'user',
//       content: `
// Here is the Job Description
// ${description}
// `,
//     },
//   ];

//   const result = await openai.chat.completions.create({
//     messages,
//     model: 'gpt-3.5-turbo-1106',
//     temperature: 1,
//     response_format: {
//       type: 'json_object',
//     },
//   });
//   return JSON.parse(result.choices[0].message.content);
// };

export const newJdJson = async (description: string) => {
  const prompts = GET_PROMPTS(description);
  const responses = await Promise.allSettled(prompts);
  if (responses.find((r) => r.status === 'rejected'))
    throw new Error('Failed to generate parameters');
  return responses.reduce((acc, curr) => {
    if (curr.status === 'fulfilled') return { ...acc, ...curr.value };
  }, {});
};

const GET_PROMPT = async (description: string, key: string, seed: string) => {
  const messages: ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: `You are a helpful AI assistant tasked with extracting must-have and nice-to-have requirements from the users job description.
${seed}.
Provide a response by following the JSON schema provided below:
-----
${responseSchema(key)}
-----`,
    },
    {
      role: 'user',
      content: description,
    },
  ];
  const result = await openai.chat.completions.create({
    messages,
    model: 'gpt-3.5-turbo-0125',
    seed: 777,
    temperature: 0.4,
    response_format: { type: 'json_object' },
  });
  return JSON.parse(result.choices[0].message.content);
};

const GET_LEVEL_PROMPT = async (description: string) => {
  const messages: ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: `You are a helpful AI assistant tasked with extracting the level of the job based on the job description.
Provide a response by following the JSON schema provided below:
-----
${responseLevelSchema}
-----`,
    },
    {
      role: 'user',
      content: description,
    },
  ];
  const result = await openai.chat.completions.create({
    messages,
    model: 'gpt-3.5-turbo-0125',
    seed: 777,
    temperature: 0.4,
    response_format: { type: 'json_object' },
  });
  return JSON.parse(result.choices[0].message.content);
};

const GET_PROMPTS = (description: string) => {
  return [
    GET_PROMPT(
      description,
      'roles',
      'Consider only the prior roles and durations related to those roles, as the requirement.',
    ),
    GET_PROMPT(
      description,
      'responsibilities',
      'Consider only the responsibilities that are mentioned in the job description.',
    ),
    GET_PROMPT(
      description,
      'skills',
      'Consider only the skill requirements, tools, languages, etc., that are mentioned in the job description. These must be key terms / tags, which must be one to two words only.',
    ),
    GET_PROMPT(
      description,
      'educations',
      'Consider only the education requirements that are mentioned in the job description',
    ),
    GET_LEVEL_PROMPT(description),
  ];
};

export default handler;

export type JobProfileScoreApi = {
  request: {
    job_id: string;
    regenerate?: boolean;
  };
  response: void;
};

// const responseSchema = (key: string) => `{
//   $schema: 'http://json-schema.org/draft-04/schema#',
//   type: 'object',
//   properties: {
//     ${key}: {
//       type: 'array',
//       items: [
//         {
//           type: 'object',
//           properties: {
//             field: {
//               type: 'string', // the text-field/title of the requirement
//             },
//             isMustHave: {
//               type: 'boolean', // true for a must-have requirement, false for a nice-to-have requirement
//             },
//           },
//           required: ['field', 'isMustHave'],
//         },
//       ],
//     },
//   },
//   required: ['${key}'],
// }`;

// const responseLevelSchema = `{
//   "$schema": "http://json-schema.org/draft-04/schema#",
//   "type": "object",
//   "properties": {
//     "jobLevel": {
//       "type": "string",
//       "enum": ["Fresher-level", "Associate-level", "Mid-level", "Senior-level", "Executive-level"]
//     }
//   },
//   "required": [
//     "jobLevel"
//   ]
// }`;

const responseSchema = (key: string) => `{
  ${key}: /* Array of objects*/ [{
    field: string, // the text-field/title of the requirement
    isMustHave: boolean // true for a must-have requirement, false for a nice-to-have requirement
  }]
}`;

const responseLevelSchema = `{
  jobLevel: enum("Fresher-level", "Associate-level", "Mid-level", "Senior-level", "Executive-level")
}`;
