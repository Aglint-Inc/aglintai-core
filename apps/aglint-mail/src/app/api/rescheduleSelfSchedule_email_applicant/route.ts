import { NextResponse } from 'next/server';
import * as v from 'valibot';
import { interviewRescheduleEmailApplicantSchema } from '@aglint/shared-types/src/aglint-mail/api_schema';
import { sendMailFun } from '../../../utils/apiUtils/sendMail';
import { fetchUtil } from './fetch-util';
import { getSupabaseServer } from '../../../supabase/supabaseAdmin';

export async function POST(req: Request) {
  const req_body = await req.json();

  const supabaseAdmin = getSupabaseServer();

  try {
    const parsed_body = v.parse(
      interviewRescheduleEmailApplicantSchema,
      req_body,
    );
    const {
      comp_email_placeholder,
      company_id,
      react_email_placeholders,
      recipient_email,
    } = await fetchUtil(supabaseAdmin, parsed_body);

    await sendMailFun({
      supabaseAdmin,
      api_target: 'rescheduleSelfSchedule_email_applicant',
      comp_email_placeholder,
      company_id,
      react_email_placeholders,
      payload: req_body.payload,
      recipient_email,
    });
    return NextResponse.json('success', {
      status: 200,
    });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      {
        error: `${e.name}: ${e.message}`,
      },
      {
        status: 500,
      },
    );
  }
}
