import { NextResponse } from 'next/server';
import { ClientError } from '../../../utils/apiUtils/customErrors';
import { getEmails } from '../../../utils/apiUtils/get-emails';
import { renderEmailTemplate } from '../../../utils/apiUtils/renderEmailTemplate';
import sendMail from '../../../config/sendgrid';
import * as v from 'valibot';
import { interviewReminderEmailApplicantSchema } from '@aglint/shared-types/src/aglint-mail/api_schema';
import { fetchUtil } from './fetch-util';

export async function POST(req: Request) {
  const req_body = await req.json();

  try {
    const parsed_body = v.parse(
      interviewReminderEmailApplicantSchema,
      req_body.meta,
    );

    const { inter_mail_details } = await fetchUtil(parsed_body);

    const { emails } = await getEmails();
    const emailIdx = emails.findIndex(
      (e) => e === inter_mail_details[0].filled_comp_template.type,
    );

    if (emailIdx === -1)
      throw new ClientError(
        `${inter_mail_details[0].filled_comp_template.type} does not match any mail_type`,
        400,
      );

    for (let inter of inter_mail_details) {
      const { html, subject } = await renderEmailTemplate(
        inter.filled_comp_template.type,
        inter.react_email_placeholders,
      );
      await sendMail({
        // email: inter.recipient_email,
        email: 'mailcatcher.aglintai@gmail.com',
        html,
        subject,
        text: html,
      });
    }

    return NextResponse.json('success', {
      status: 200,
    });
  } catch (e: any) {
    console.log(e);
    return NextResponse.json(
      {
        error: `${e.name} ${e.message}`,
      },
      {
        status: 500,
      },
    );
  }
}
