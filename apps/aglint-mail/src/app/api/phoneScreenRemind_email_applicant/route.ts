import { phoneScreenRemindEmailApplicantSchema } from '@aglint/shared-types/src/aglint-mail/api_schema';
import { NextResponse } from 'next/server';
import * as v from 'valibot';
import { sendMailFun } from '../../../utils/apiUtils/sendMail';
import { fetchUtil } from './fetch-util';

export async function POST(req: Request) {
  const { meta } = await req.json();

  try {
    const req_body = v.parse(phoneScreenRemindEmailApplicantSchema, meta);

    const { filled_comp_template, react_email_placeholders, recipient_email } =
      await fetchUtil(req_body);

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
        error: `${e.name}  ${e.message}`,
      },
      {
        status: 500,
      },
    );
  }
}

// {
//   "meta": {
//       "application_id": "af9538ac-50e8-4941-91c5-39a678c60077"
//   }
// }
