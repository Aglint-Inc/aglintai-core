import { NextResponse } from 'next/server';
import * as v from 'valibot';
import { onRShadowCompleteEmailTraineeSchema } from '@aglint/shared-types/src/aglint-mail/api_schema';
import { sendMailFun } from '../../../utils/apiUtils/sendMail';
import { fetchUtil } from './fetch-util';
import { getSupabaseServer } from '../../../supabase/supabaseAdmin';

export async function POST(req: Request) {
  const req_body = await req.json();
  const supabaseAdmin = getSupabaseServer();
  try {
    const parsed_body = v.parse(onRShadowCompleteEmailTraineeSchema, req_body);
    const mail_details = await fetchUtil(supabaseAdmin, parsed_body);
    for (const {
      comp_email_placeholder,
      company_id,
      react_email_placeholders,
      recipient_email,
    } of mail_details) {
      // eslint-disable-next-line no-await-in-loop
      await sendMailFun({
        supabaseAdmin,
        comp_email_placeholder,
        company_id,
        react_email_placeholders,
        recipient_email,
        api_target: 'interviewEnd_email_rShadowTraineeForMeetingAttendence',
        payload: parsed_body.payload,
      });
    }

    return NextResponse.json('success', {
      status: 200,
    });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      {
        error: `${e.name} : ${e.message}`,
      },
      {
        status: e.status,
      },
    );
  }
}
