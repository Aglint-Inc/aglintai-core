import { applicationRecievedEmailApplicantSchema } from '@aglint/shared-types/src/aglint-mail/api_schema';
import { NextResponse } from 'next/server';
import * as v from 'valibot';
import { getSupabaseServer } from '../../../supabase/supabaseAdmin';
import { sendMailFun } from '../../../utils/apiUtils/sendMail';
import { fetchUtil } from './fetch-util';

export async function POST(req: Request) {
  const req_body = await req.json();

  const supabaseAdmin = getSupabaseServer();

  try {
    const parsed_body = v.parse(
      applicationRecievedEmailApplicantSchema,
      req_body,
    );
    const {
      comp_email_placeholder,
      react_email_placeholders,
      recipient_email,
      company_id,
      job_id,
    } = await fetchUtil(supabaseAdmin, parsed_body);

    await sendMailFun({
      supabaseAdmin,
      company_id,
      job_id,
      comp_email_placeholder,
      react_email_placeholders,
      recipient_email,
      payload: parsed_body.payload,
      api_target: 'applicationRecieved_email_applicant',
    });

    return NextResponse.json('success', {
      status: 200,
    });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      {
        error: `${e.name}: mail_type:application received,  ${e.message}`,
      },
      {
        status: 500,
      },
    );
  }
}

// {
//   "meta": {
//       "application_id": "13c0fff9-5d10-41f8-b077-ea0884977ab2",
//       "session_ids": [
//           "b8c7b858-8101-4282-9d2c-49bb7c4cc1ad"
//       ]
//   }
// }
