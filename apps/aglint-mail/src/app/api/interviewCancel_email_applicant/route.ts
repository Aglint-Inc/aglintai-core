import { NextResponse } from 'next/server';
import * as v from 'valibot';
import { interviewCancelEmailApplicantSchema } from '@aglint/shared-types/src/aglint-mail/api_schema';
import { sendMailFun } from '../../../utils/apiUtils/sendMail';
import { fetchUtil } from './fetch-util';

export async function POST(req: Request) {
  const req_body = await req.json();

  try {
    const parsed_body = v.parse(
      interviewCancelEmailApplicantSchema,
      req_body.meta,
    );
    const { filled_comp_template, react_email_placeholders, recipient_email } =
      await fetchUtil(parsed_body);

    await sendMailFun(
      filled_comp_template,
      react_email_placeholders,
      recipient_email,
    );
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
//       ]
//   }
// }
