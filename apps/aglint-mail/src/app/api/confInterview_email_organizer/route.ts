/* eslint-disable no-await-in-loop */
import { NextResponse } from 'next/server';
import { confInterviewEmailOrganizerSchema } from '@aglint/shared-types/src/aglint-mail/api_schema';
import * as v from 'valibot';
import { ClientError } from '../../../utils/apiUtils/customErrors';
import { getEmails } from '../../../utils/apiUtils/get-emails';
import { renderEmailTemplate } from '../../../utils/apiUtils/renderEmailTemplate';
import sendMail from '../../../config/sendgrid';
import { fetchUtil } from './fetch-util';

export async function POST(req: Request) {
  const req_body = await req.json();

  try {
    const parsed_body = v.parse(
      confInterviewEmailOrganizerSchema,
      req_body.meta,
    );
    const fetch_details = await fetchUtil(parsed_body);

    const { emails } = await getEmails();
    const emailIdx = emails.findIndex(
      (e) => e === fetch_details[0].filled_comp_template.type,
    );

    if (emailIdx === -1)
      throw new ClientError(
        `${fetch_details[0].filled_comp_template.type} does not match any mail_type`,
        400,
      );

    for (const {
      filled_comp_template,
      react_email_placeholders,
      recipient_email,
    } of fetch_details) {
      const { html, subject } = await renderEmailTemplate(
        filled_comp_template.type,
        react_email_placeholders,
      );

      await sendMail({
        email: recipient_email,
        html,
        subject,
        text: html,
        fromName: filled_comp_template.from_name,
      });
    }
    return NextResponse.json('success', {
      status: 200,
    });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      {
        error: `${e.name}: mail_type:confirmation_mail_to_organizer,  ${e.message}`,
      },
      {
        status: 500,
      },
    );
  }
}

// {
//   "meta": {
//       "recruiter_user_id": "9afe3700-c509-4f65-af0d-7892718ecde2",
//       "application_id": "e8218fdc-524c-4f05-8786-23399370777b",
//       "meeting_id": "2c7f0f5d-cd46-4ef6-ac46-378a25455cc7",
//       "session_ids": [
//           "7da6d980-7ac4-4ae8-b9e0-799e5a8040e3"
//       ]
//   }
// }
