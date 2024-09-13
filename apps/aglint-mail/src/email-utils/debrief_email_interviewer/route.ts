/* eslint-disable no-await-in-loop */
import { NextResponse } from 'next/server';
import * as v from 'valibot';
import { debriefEmailInterviewerSchema } from '@aglint/shared-types/src/aglint-mail/api_schema';
import { sendMailFun } from '../../utils/apiUtils/sendMail';
import { fetchUtil } from './fetch-util';
import { getSupabaseServer } from '../../supabase/supabaseAdmin';

export async function POST(req: Request) {
  const req_body = await req.json();
  const supabaseAdmin = getSupabaseServer();

  try {
    const parsed_body = v.parse(debriefEmailInterviewerSchema, req_body);
    const { interviewers_mail_data } = await fetchUtil(
      supabaseAdmin,
      parsed_body,
    );

    for (const {
      company_id,
      comp_email_placeholder,
      react_email_placeholders,
      recipient_email,
    } of interviewers_mail_data) {
      await sendMailFun({
        supabaseAdmin,
        comp_email_placeholder,
        company_id,
        react_email_placeholders,
        recipient_email,
        api_target: 'debrief_email_interviewer',
        payload: req_body.payload,
      });
    }

    return NextResponse.json('success', {
      status: 200,
    });
  } catch (e: any) {
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

// {
//   "meta": {
//       "application_id": "af9538ac-50e8-4941-91c5-39a678c60077",
//       "session_id":"1605b4ad-c561-44e0-b471-ceb1923bb6eb"
//   }
// }
