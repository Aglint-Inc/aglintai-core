import { NextResponse } from 'next/server';
import {
  ClientError,
  MailArgValidationError,
} from '../../../utils/apiUtils/customErrors';
import { getEmails } from '../../../utils/apiUtils/get-emails';
import * as v from 'valibot';
import { debriefEmailInterviewerSchema } from '@aglint/shared-types/src/aglint-mail/api_schema';
import { fetchUtil } from './fetch-util';
import { renderEmailTemplate } from '../../../utils/apiUtils/renderEmailTemplate';
import sendMail from '../../../config/sendgrid';

export async function POST(req: Request) {
  const req_body = await req.json();

  try {
    const parsed_body = v.parse(debriefEmailInterviewerSchema, req_body.meta);
    const { interviewers_mail_data } = await fetchUtil(parsed_body);

    const { emails } = await getEmails();
    const emailIdx = emails.findIndex(
      (e) => e === interviewers_mail_data[0].filled_comp_template.type,
    );

    if (emailIdx === -1)
      throw new ClientError(
        `${interviewers_mail_data[0].filled_comp_template.type} does not match any mail_type`,
        400,
      );

    for (let {
      react_email_placeholders,
      recipient_email,
    } of interviewers_mail_data) {
      const { html, subject } = await renderEmailTemplate(
        interviewers_mail_data[0].filled_comp_template.type,
        react_email_placeholders,
      );
      await sendMail({
        email: recipient_email,
        html,
        subject,
        text: html,
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
//   "session_ids": [
//     "5e7953c5-3e56-4d89-9857-29c34b55ce9d"
//   ],
//   "application_id": "0ab5542d-ae98-4255-bb60-358a9c8e0637",
//   "meeting_id":"8daab34c-9c19-445b-aa96-3b4735307414",
//   "recruiter_user_id": "7f6c4cae-78b6-4eb6-86fd-9a0e0310147b"
// }
