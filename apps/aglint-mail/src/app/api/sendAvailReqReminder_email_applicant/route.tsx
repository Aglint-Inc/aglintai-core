import { NextResponse } from 'next/server';
import * as v from 'valibot';
import { sendAvailReqReminderEmailApplicant } from '@aglint/shared-types/src/aglint-mail/api_schema';
import { sendMailFun } from '../../../utils/apiUtils/sendMail';
import { dbUtil } from './fetch-util';

export async function POST(req: Request) {
  const { meta } = await req.json();

  try {
    const req_body = v.parse(sendAvailReqReminderEmailApplicant, meta);
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
//       "avail_req_id": "eb718192-9610-4d4c-988b-6e84fc914c08"
//   }
// }
