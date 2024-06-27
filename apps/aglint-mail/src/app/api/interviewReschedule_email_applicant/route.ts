import { NextResponse } from 'next/server';
import * as v from 'valibot';
import { interviewRescheduleEmailApplicantSchema } from '@aglint/shared-types/src/aglint-mail/api_schema';
import { sendMailFun } from '../../../utils/apiUtils/sendMail';
import { fetchUtil } from './fetch-util';

export async function POST(req: Request) {
  const req_body = await req.json();

  try {
    const parsed_body = v.parse(
      interviewRescheduleEmailApplicantSchema,
      req_body.meta,
    );
    const { filled_comp_template, react_email_placeholders, recipient_email } =
      await fetchUtil(parsed_body);

    await sendMailFun({
      filled_comp_template,
      react_email_placeholders,
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

// {
//   "meta": {
//       "application_id": "3608fe82-bef4-4085-bec0-6fe82620240f",
//       "session_ids":["2575741a-952a-44d8-bcde-f8377f926b22","bab013be-3fe8-4671-a84e-002e3e96146a"],
//       "self_schedule_link":"http://www.google.in"
//   }
// }
