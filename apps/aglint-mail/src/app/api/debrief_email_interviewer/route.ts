/* eslint-disable no-await-in-loop */
import { NextResponse } from 'next/server';
import * as v from 'valibot';
import { debriefEmailInterviewerSchema } from '@aglint/shared-types/src/aglint-mail/api_schema';
import { sendMailFun } from '../../../utils/apiUtils/sendMail';
import { fetchUtil } from './fetch-util';

export async function POST(req: Request) {
  const req_body = await req.json();

  try {
    const parsed_body = v.parse(debriefEmailInterviewerSchema, req_body);
    const { interviewers_mail_data } = await fetchUtil(parsed_body);

    for (const {
      react_email_placeholders,
      recipient_email,
      filled_comp_template,
    } of interviewers_mail_data) {
      await sendMailFun({
        filled_comp_template,
        react_email_placeholders,
        recipient_email,
        api_target: 'debrief_email_interviewer',
      });
    }

    return NextResponse.json('success', {
      status: 200,
    });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      {
        error: `${e.name}:  ${e.message}`,
      },
      {
        status: 500,
      },
    );
  }
}

// {
//   "meta": {
//       "application_id": "af9538ac-50e8-4941-91c5-39a678c60077",
//       "session_id":"1605b4ad-c561-44e0-b471-ceb1923bb6eb"
//   }
// }
