import { NextResponse } from 'next/server';
import * as v from 'valibot';
import { interReschedReqEmailRecruiterSchema } from '@aglint/shared-types/src/aglint-mail/api_schema';
import { sendMailFun } from '../../../utils/apiUtils/sendMail';
import { fetchUtil } from './fetch-util';
import { getSupabaseServer } from '../../../supabase/supabaseAdmin';

export async function POST(req: Request) {
  const req_body = await req.json();
  const supabaseAdmin = getSupabaseServer();
  try {
    const parsed_body = v.parse(interReschedReqEmailRecruiterSchema, req_body);
    const {
      comp_email_placeholder,
      company_id,
      react_email_placeholders,
      recipient_email,
    } = await fetchUtil(supabaseAdmin, parsed_body);

    await sendMailFun({
      supabaseAdmin,
      comp_email_placeholder,
      company_id,
      react_email_placeholders,
      recipient_email,
      api_target: 'interReschedReq_email_recruiter',
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

// {
//   "meta": {
//       "application_id": "e8218fdc-524c-4f05-8786-23399370777b",
//       "session_ids": [
//           "edab9d72-53f1-4a34-91e2-934f50bcea0e"
//       ],
//       "interview_cancel_id":"16c05d90-fae5-424b-8e11-1c122b576b59"
//   }
// }
