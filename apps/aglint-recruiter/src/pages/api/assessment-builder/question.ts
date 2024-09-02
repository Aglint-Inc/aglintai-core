/* eslint-disable security/detect-object-injection */
import { type JobTypeDB } from '@aglint/shared-types';
import { type DB } from '@aglint/shared-types';
import { createServerClient } from '@supabase/ssr';
import { type PostgrestError } from '@supabase/supabase-js';
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const config = {
  runtime: 'edge',
};

const requestSchema = z.object({
  job_id: z.string().nonempty().uuid(),
});

export type AssessmentBuilderQuestionApi = {
  request: z.infer<typeof requestSchema>;
  response: {
    data: JobTypeDB;
    error: PostgrestError;
  };
};

type Supabase = ReturnType<typeof createServerClient<DB>>;

export default async function handler(req: NextRequest) {
  try {
    const request: AssessmentBuilderQuestionApi['request'] = await req.json();
    requestSchema.parse(request);
    const { job_id } = request;
    const supabase = createServerClient<DB>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return req.cookies[name];
          },
        },
      },
    );

    const job = await fetchJob(supabase, job_id);

    return new NextResponse<AssessmentBuilderQuestionApi['response']>(
      JSON.stringify({
        data: job,
        error: null,
      } as AssessmentBuilderQuestionApi['response']),
      { status: 200 },
    );
  } catch (e) {
    const response: AssessmentBuilderQuestionApi['response'] = {
      data: null,
      error: {
        code: '400',
        message: JSON.stringify(e),
        details: null,
        hint: null,
      },
    };
    return new NextResponse<AssessmentBuilderQuestionApi['response']>(
      JSON.stringify(response),
      { status: 400 },
    );
  }
}

const fetchJob = async (
  supabase: Supabase,
  job_id: AssessmentBuilderQuestionApi['request']['job_id'],
) => {
  const { data, error } = await supabase
    .from('public_jobs')
    .select()
    .eq('id', job_id);
  if (error) throw new Error('Something went wrong. Supabase fetch.');
  if (data.length === 0) throw new Error('No job found with given job_id');
  return data[0];
};
