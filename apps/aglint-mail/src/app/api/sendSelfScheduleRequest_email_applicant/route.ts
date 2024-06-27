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
    const is_preview = req_body.is_preview;

    const htmlSub = await sendMailFun({
      filled_comp_template,
      react_email_placeholders,
      recipient_email,
      is_preview,
    });
    if (is_preview) {
      const { html, subject } = htmlSub;
      return NextResponse.json(
        { html, subject },
        {
          status: 200,
        },
      );
    }
    return NextResponse.json('success', {
      status: 200,
    });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      {
        error: `${e.name}: mail_type:self_scheduling_request_remainder,  ${e.message}`,
      },
      {
        status: 500,
      },
    );
  }
}

// {
//   "meta": {
//       "filter_json_id":"1309e323-7fc1-46e3-a2e7-b0be582139fe"
//   }
// }
