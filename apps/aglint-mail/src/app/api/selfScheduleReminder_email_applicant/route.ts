import { NextResponse } from 'next/server';
import * as v from 'valibot';
import { sendSelfScheduleRequest_email_applicant } from '@aglint/shared-types/src/aglint-mail/api_schema';
import { sendMailFun } from '../../../utils/apiUtils/sendMail';
import { dbUtil } from './fetch-util';

export async function POST(req: Request) {
  const { meta } = await req.json();

  try {
    const req_body = v.parse(sendSelfScheduleRequest_email_applicant, meta);
    const { filled_comp_template, react_email_placeholders, recipient_email } =
      await dbUtil(req_body);
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
//       "filter_json_id":"ca483a08-91d2-4d66-9122-83bdb44a4332"
//   }
// }
