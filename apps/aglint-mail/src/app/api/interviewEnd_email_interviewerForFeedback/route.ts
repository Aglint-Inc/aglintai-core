import { NextResponse } from 'next/server';
import * as v from 'valibot';
import { interviewEndEmailInterviewerForFeedbackSchema } from '@aglint/shared-types/src/aglint-mail/api_schema';
import { sendMailFun } from '../../../utils/apiUtils/sendMail';
import { fetchUtil } from './fetch-util';
import { getSupabaseServer } from '../../../supabase/supabaseAdmin';

export async function POST(req: Request) {
  const body = await req.json();
  const supabaseAdmin = getSupabaseServer();
  try {
    const req_body = v.parse(
      interviewEndEmailInterviewerForFeedbackSchema,
      body,
    );

    const {
      comp_email_placeholder,
      company_id,
      react_email_placeholders,
      recipient_email,
    } = await fetchUtil(supabaseAdmin, req_body);

    await sendMailFun({
      supabaseAdmin,
      api_target: 'interviewEnd_email_interviewerForFeedback',
      comp_email_placeholder,
      company_id,
      react_email_placeholders,
      recipient_email,
      payload: req_body.payload,
    });

    return NextResponse.json(
      { message: 'success' },
      {
        status: 200,
      },
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        error: `${e.name}:  ${e.message}`,
      },
      {
        status: 500,
      },
    );
  }
}
