import { NextResponse } from 'next/server';
import * as v from 'valibot';
import { confirmInterviewEmailApplicantSchema } from '@aglint/shared-types/src/aglint-mail/api_schema';
import {
  ClientError,
  MailArgValidationError,
} from '../../../utils/apiUtils/customErrors';
import { sendMailFun } from '../../../utils/apiUtils/sendMail';
import { fetchUtil } from './fetch-util';

export async function POST(req: Request) {
  const req_body = await req.json();

  try {
    const parsed_body = v.parse(
      confirmInterviewEmailApplicantSchema,
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
    if (e instanceof ClientError) {
      return NextResponse.json(
        {
          error: `${e.name} : ${e.message}`,
        },
        {
          status: e.status,
        },
      );
    }
    if (e instanceof MailArgValidationError) {
      return NextResponse.json(
        {
          error: `${e.name}: mail_type:interview,  ${e.message}`,
        },
        {
          status: 400,
        },
      );
    }
    if (e) {
      return NextResponse.json(
        {
          error: `${e.name}: mail_type:interview,  ${e.message}`,
        },
        {
          status: 500,
        },
      );
    }
  }
}

// {
//   "meta": {
//       "session_ids":["032f8686-c7f7-468b-84f8-de597f766d4d"],
//       "application_id": "af9538ac-50e8-4941-91c5-39a678c60077",
//       "availability_req_id":"f17b307d-c8ed-4355-b597-3fc642fa5989"
//   }
// }
