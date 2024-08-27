import { NextResponse } from 'next/server';
import * as v from 'valibot';
import { sendAvailReqReminderEmailApplicant } from '@aglint/shared-types/src/aglint-mail/api_schema';
import { sendMailFun } from '../../../utils/apiUtils/sendMail';
import { dbUtil } from './fetch-util';
import { getSupabaseServer } from '../../../supabase/supabaseAdmin';

export async function POST(req: Request) {
  const body = await req.json();
  const supabaseAdmin = getSupabaseServer();
  try {
    const req_body = v.parse(sendAvailReqReminderEmailApplicant, body);
    const details = await dbUtil(supabaseAdmin, req_body);
    if (!details) {
      return NextResponse.json('success', {
        status: 200,
      });
    }
    await sendMailFun({
      supabaseAdmin,
      api_target: 'sendAvailReqReminder_email_applicant',
      comp_email_placeholder: details.comp_email_placeholder,
      company_id: details.company_id,
      react_email_placeholders: details.react_email_placeholders,
      payload: req_body.payload,
      recipient_email: details.recipient_email,
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

// {
//   "meta": {
//       "avail_req_id": "eb718192-9610-4d4c-988b-6e84fc914c08"
//   }
// }
