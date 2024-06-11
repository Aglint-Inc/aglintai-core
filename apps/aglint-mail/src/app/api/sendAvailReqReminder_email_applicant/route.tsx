import { NextResponse } from 'next/server';
import { ClientError } from '../../../utils/apiUtils/customErrors';
import * as v from 'valibot';
import { sendAvailReqReminderEmailApplicant } from '@aglint/shared-types/src/aglint-mail/api_schema';
import { dbUtil } from './fetch-util';
import { getEmails } from '../../../utils/apiUtils/get-emails';
import { renderEmailTemplate } from '../../../utils/apiUtils/renderEmailTemplate';
import sendMail from '../../../config/sendgrid';

export async function POST(req: Request) {
  const { meta } = await req.json();

  try {
    const req_body = v.parse(sendAvailReqReminderEmailApplicant, meta);
    const { filled_comp_template, react_email_placeholders, recipient_email } =
      await dbUtil(req_body);
    const { emails } = await getEmails();
    const emailIdx = emails.findIndex((e) => e === filled_comp_template.type);

    if (emailIdx === -1)
      throw new ClientError(
        `${filled_comp_template.type} does not match any mail_type`,
        400,
      );

    const { html, subject } = await renderEmailTemplate(
      filled_comp_template.type,
      react_email_placeholders,
    );
    await sendMail({
      email: recipient_email,
      html,
      subject,
      text: html,
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
//   "session_id": [
//     "5e7953c5-3e56-4d89-9857-29c34b55ce9d",
//     "f5053399-1998-4b43-8ba5-801db1018e27"
//   ],
//   "application_id": "0ab5542d-ae98-4255-bb60-358a9c8e0637",
//   "schedule_id":"74559de0-2bc8-4028-a748-a7eae2f68182",
//   "filter_id":"6e76d21f-7b7f-49c9-9398-b74dde1cedf1"
// }
