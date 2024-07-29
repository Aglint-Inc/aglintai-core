import { NextResponse } from 'next/server';
import * as v from 'valibot';
import { interReschedReqEmailRecruiterSchema } from '@aglint/shared-types/src/aglint-mail/api_schema';
import { sendMailFun } from '../../../utils/apiUtils/sendMail';
import { fetchUtil } from './fetch-util';

export async function POST(req: Request) {
  const req_body = await req.json();

  try {
    const parsed_body = v.parse(interReschedReqEmailRecruiterSchema, req_body);
    const { filled_comp_template, react_email_placeholders, recipient_email } =
      await fetchUtil(parsed_body);
    await sendMailFun({
      filled_comp_template,
      react_email_placeholders,
      recipient_email,
      api_target: 'InterviewCancelReq_email_recruiter',
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
//       "application_id": "84caebfb-8db6-4881-a88f-400726884504",
//       "session_ids": [
//           "edab9d72-53f1-4a34-91e2-934f50bcea0e"
//       ],
//       "interview_cancel_id":"16c05d90-fae5-424b-8e11-1c122b576b59"
//   }
// }
