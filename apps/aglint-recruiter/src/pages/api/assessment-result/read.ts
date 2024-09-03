/* eslint-disable security/detect-object-injection */
import { type DB } from '@aglint/shared-types';
import { createServerClient } from '@supabase/ssr';
import { type PostgrestError } from '@supabase/supabase-js';
import { type NextApiRequest, type NextApiResponse } from 'next';

import { type AssessmentResult } from '@/src/queries/assessment/types';

// export const config = {
//   runtime: 'edge',
// };

export type AssessmentResultReadApi = {
  request: {
    result_id: AssessmentResult['id'];
  };
  response: {
    data: AssessmentResult;
    error: PostgrestError;
  };
};

type Supabase = ReturnType<typeof createServerClient<DB>>;
export type AssessmentResponse = AssessmentResult['responses'][number];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const request: AssessmentResultReadApi['request'] = req.body as any;
    //await req.json();
    const { result_id } = request;
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

    const assessmentResult = await fetchAssessmentResult(supabase, result_id);
    const response: AssessmentResultReadApi['response'] = {
      data: assessmentResult,
      error: null,
    };
    // return new NextResponse<AssessmentResultReadApi['response']>(
    //   JSON.stringify(response),
    //   { status: 200 },
    // );
    res.status(200).json(response);
    return;
  } catch (e) {
    const response: AssessmentResultReadApi['response'] = {
      data: null,
      error: {
        code: '400',
        message: JSON.stringify(e),
        details: null,
        hint: null,
      },
    };
    // return new NextResponse<AssessmentResultReadApi['response']>(
    //   JSON.stringify(response),
    //   { status: 400 },
    // );
    res.status(200).send(response);
    return;
  }
}

const fetchAssessmentResult = async (
  supabase: Supabase,
  result_id: AssessmentResult['id'],
) => {
  const { data, error } = await supabase
    .from('assessment_results')
    .select()
    .eq('id', result_id);
  if (error) throw new Error(error.message);
  if (data.length !== 1)
    throw new Error('Unable to find assessment result entry');
  return data[0] as unknown as AssessmentResult;
};
