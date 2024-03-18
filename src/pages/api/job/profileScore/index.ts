/* eslint-disable security/detect-object-injection */
import {
  type CookieOptions,
  createServerClient,
  serialize,
} from '@supabase/ssr';
import { PostgrestError } from '@supabase/supabase-js';
import { nanoid } from 'nanoid';
import { NextApiRequest, NextApiResponse } from 'next';

import { JdJsonType } from '@/src/components/JobsDashboard/JobPostCreateUpdate/JobPostFormProvider';
import { Database } from '@/src/types/schema';

import { jdJson } from './utils';

export const config = {
  maxDuration: 250,
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
    res.status(200).send({
      data: null,
      error: {
        message: 'No description provided',
        code: '400',
        details: null,
        hint: null,
      },
    });
    return;
  }
  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Timed out'));
    }, 200000);
  });
  try {
    await supabase
      .from('public_jobs')
      .update({ scoring_param_status: 'loading' })
      .eq('id', job_id);
    res.status(200).send({ data: 'started', error: null });
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
  } catch (e) {
    await supabase
      .from('public_jobs')
      .update({ scoring_param_status: null })
      .eq('id', job_id);
  }
  return;
};

const arrItemToReactArr = (arr: any[]) => {
  return arr.map((a) => ({ ...a, id: nanoid() }));
};

export default handler;

export type JobProfileScoreApi = {
  request: {
    job_id: string;
  };
  response: {
    data: ResponseDataPayload;
    error: PostgrestError;
  };
};

type ResponseDataPayload = 'started';
