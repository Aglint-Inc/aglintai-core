/* eslint-disable security/detect-object-injection */
import { createServerClient } from '@supabase/ssr';
// import { PostgrestError } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

import { AssessmentResult } from '@/src/queries/assessment/types';
import { Database } from '@/src/types/schema';

import { getAssessmentAnalyses } from './assessment-result-prompt-builder';

export const config = {
  runtime: 'edge',
};

export type AssessmentResultApi = {
  request: {
    result_id: AssessmentResult['id'];
  };
  response: any;
};

type Supabase = ReturnType<typeof createServerClient<Database>>;
export type AssessmentResponse = AssessmentResult['responses'][number];

export default async function handler(req: NextRequest) {
  try {
    const request: AssessmentResultApi['request'] = await req.json();
    const { result_id } = request;
    const supabase = createServerClient<Database>(
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

    const assessmentResponses = await fetchAssessmentResult(
      supabase,
      result_id,
    );

    const result = await getAssessmentAnalyses(assessmentResponses);

    return new NextResponse<AssessmentResultApi['response']>(
      JSON.stringify({
        data: result,
        error: null,
      } as AssessmentResultApi['response']),
      { status: 200 },
    );
  } catch (e) {
    const response: AssessmentResultApi['response'] = {
      data: null,
      error: e,
    };
    return new NextResponse<AssessmentResultApi['response']>(
      JSON.stringify(response),
      { status: 200 },
    );
  }
}

const fetchAssessmentResult = async (
  supabase: Supabase,
  result_id: AssessmentResult['id'],
) => {
  const { data, error } = await supabase
    .from('assessment_results')
    .select('responses')
    .eq('id', result_id);
  if (error) throw new Error(error.message);
  if (data.length !== 1)
    throw new Error('Unable to find assessment result entry');
  return data[0].responses as unknown as AssessmentResult['responses'];
};
