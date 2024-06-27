import { NextResponse } from 'next/server';
import { confInterviewEmailOrganizerSchema } from '@aglint/shared-types/src/aglint-mail/api_schema';
import * as v from 'valibot';
import { sendMailFun } from '../../../utils/apiUtils/sendMail';
import { fetchUtil } from './fetch-util';

export async function POST(req: Request) {
  const req_body = await req.json();

  try {
    const parsed_body = v.parse(
      confInterviewEmailOrganizerSchema,
      req_body.meta,
    );
    const fetch_details = await fetchUtil(parsed_body);

    for (const {
      filled_comp_template,
      react_email_placeholders,
      recipient_email,
    } of fetch_details) {
      // eslint-disable-next-line no-await-in-loop
      await sendMailFun({
        filled_comp_template,
        react_email_placeholders,
        recipient_email,
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
