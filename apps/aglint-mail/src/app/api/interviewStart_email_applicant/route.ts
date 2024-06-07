import { NextResponse } from 'next/server';
import {
  ClientError,
  MailArgValidationError,
} from '../../../utils/apiUtils/customErrors';
import { getEmails } from '../../../utils/apiUtils/get-emails';
import { renderEmailTemplate } from '../../../utils/apiUtils/renderEmailTemplate';
import fetchTemplate from '../../../utils/apiUtils/get-template';
import type { FilledPayload } from '../../../utils/types/apiTypes';
import interviewReaminder from '../../../utils/email/interviewStart_email_applicant/fetch';
import sendMail from '../../../config/sendgrid';

interface ReqPayload {
  application_id: string;
}

interface Meta {
  meta: ReqPayload;
}

interface DataPayload {
  recipient_email: string;
  mail_type: string;
  recruiter_id: string;
  companyLogo: string;
  payload: {
    '[firstName]': string;
    '[jobTitle]': string;
    '[companyName]': string;
    '[supportLink]': string;
    '[interviewLink]': string;
  };
}

export async function POST(req: Request) {
  const { meta }: Meta = await req.json();

  try {
    if (!meta.application_id) {
      throw new ClientError('attribute application_id missing', 400);
    }
    const data: DataPayload = await interviewReaminder(meta.application_id);
    const filled_body: FilledPayload = await fetchTemplate(
      data.recruiter_id,
      data.mail_type,
      data.payload,
    );
    filled_body.companyLogo = data.companyLogo;
    const { emails } = await getEmails();

    const emailIdx = emails.findIndex((e) => e === data.mail_type);

    if (emailIdx === -1)
      throw new ClientError(
        `${data.mail_type} does not match any mail_type`,
        400,
      );

    const { html, subject } = await renderEmailTemplate(
      emails[emailIdx],
      filled_body,
    );
    await sendMail({ email: data.recipient_email, html, subject, text: html });
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
          error: `${e.name}: mail_type:interview reminder candidate,  ${e.message}`,
        },
        {
          status: 400,
        },
      );
    }
    if (e) {
      return NextResponse.json(
        {
          error: `${e.name}: mail_type:interview reminder candidate,  ${e.message}`,
        },
        {
          status: 500,
        },
      );
    }
  }
}

// {
//   "application_id": "0ab5542d-ae98-4255-bb60-358a9c8e0637"
// }
