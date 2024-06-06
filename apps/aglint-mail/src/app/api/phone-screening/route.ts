import { NextResponse } from 'next/server';
import {
  ClientError,
  MailArgValidationError,
} from '../../../utils/apiUtils/customErrors';
import { getEmails } from '../../../utils/apiUtils/get-emails';
import { renderEmailTemplate } from '../../../utils/apiUtils/renderEmailTemplate';
import fetchTemplate from '../../../utils/apiUtils/get-template';
import PhoneScreening from '../../../utils/email/phone-screening/fetch';
import type { FilledPayload } from '../../../utils/types/apiTypes';
import sendMail from '../../../config/sendgrid';

interface ReqPayload {
  application_id: string;
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
    '[phoneScreeningLink]': string;
  };
}

export async function POST(req: Request) {
  const { application_id }: ReqPayload = await req.json();

  try {

    if (!application_id) {
      throw new ClientError(
        'application_id is missing',
        400,
      );
    }
    const data: DataPayload = await PhoneScreening(application_id);
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
    await sendMail({ email: data.recipient_email, html, subject });
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
          error: `${e.name}: mail_type:phone_screening,  ${e.message}`,
        },
        {
          status: 400,
        },
      );
    }
    if (e) {
      return NextResponse.json(
        {
          error: `${e.name}: mail_type:phone_screening,  ${e.message}`,
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
