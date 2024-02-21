/* eslint-disable security/detect-object-injection */
import { createServerClient } from '@supabase/ssr';
// import { PostgrestError } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

import { AssessmentResult } from '@/src/queries/assessment/types';
import { Database } from '@/src/types/schema';

export const config = {
  runtime: 'edge',
};

export type AssessmentResultApi = {
  request: {
    result_id: AssessmentResult['id'];
  };
  response: any;
};

// type Supabase = ReturnType<typeof createServerClient<Database>>;

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

    if (supabase) {
      //do nothing
    }
    const job = result_id; //await fetchJob(supabase, result_id);

    return new NextResponse<AssessmentResultApi['response']>(
      JSON.stringify({
        data: job,
        error: null,
      } as AssessmentResultApi['response']),
      { status: 200 },
    );
  } catch (e) {
    const response: AssessmentResultApi['response'] = {
      data: null,
      error: {
        code: '400',
        message: JSON.stringify(e),
        details: null,
        hint: null,
      },
    };
    return new NextResponse<AssessmentResultApi['response']>(
      JSON.stringify(response),
      { status: 400 },
    );
  }
}
