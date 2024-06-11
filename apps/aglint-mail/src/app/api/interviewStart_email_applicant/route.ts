import { NextResponse } from 'next/server';
import { ClientError } from '../../../utils/apiUtils/customErrors';
import { getEmails } from '../../../utils/apiUtils/get-emails';
import { renderEmailTemplate } from '../../../utils/apiUtils/renderEmailTemplate';
import sendMail from '../../../config/sendgrid';
import { dbFetch } from './fetch-util';
import * as v from 'valibot';
import { interviewStartEmailApplicantSchema } from '@aglint/shared-types/src/aglint-mail/api_schema';

export async function POST(req: Request) {
  const { meta } = await req.json();

  try {
    const req_body = v.parse(interviewStartEmailApplicantSchema, meta);
    const { filled_comp_template, react_email_placeholders, recipient_email } =
      await dbFetch(req_body);
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
        error: `${e.name} : ${e.message}`,
      },
      {
        status: 500,
      },
    );
  }
}

// {
//   "application_id": "0ab5542d-ae98-4255-bb60-358a9c8e0637"
// }
