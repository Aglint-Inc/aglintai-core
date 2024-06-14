/* eslint-disable no-await-in-loop */
import { NextResponse } from 'next/server';
import * as v from 'valibot';
import { debriefEmailInterviewerSchema } from '@aglint/shared-types/src/aglint-mail/api_schema';
import { getEmails } from '../../../utils/apiUtils/get-emails';
import { ClientError } from '../../../utils/apiUtils/customErrors';
import { renderEmailTemplate } from '../../../utils/apiUtils/renderEmailTemplate';
import sendMail from '../../../config/sendgrid';
import { fetchUtil } from './fetch-util';

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

    for (const {
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
        fromName: interviewers_mail_data[0].filled_comp_template.from_name,
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
