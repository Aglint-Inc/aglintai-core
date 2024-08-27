import { availabilityReqResendEmailCandidateSchema } from '@aglint/shared-types/src/aglint-mail/api_schema';
import { NextResponse } from 'next/server';
import * as v from 'valibot';
import { getSupabaseServer } from '../../../supabase/supabaseAdmin';
import { sendMailFun } from '../../../utils/apiUtils/sendMail';
import { dbUtil } from './fetch-util';

export async function POST(req: Request) {
  const body = await req.json();

  const supabaseAdmin = getSupabaseServer();

  try {
    const req_body = v.parse(availabilityReqResendEmailCandidateSchema, body);
    const {
      comp_email_placeholder,
      company_id,
      react_email_placeholders,
      recipient_email,
    } = await dbUtil(supabaseAdmin, req_body);

    await sendMailFun({
      supabaseAdmin,
      comp_email_placeholder,
      company_id,
      react_email_placeholders,
      recipient_email,
      api_target: 'availabilityReqResend_email_candidate',
      payload: req_body.payload,
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
