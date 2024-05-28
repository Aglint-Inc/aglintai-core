import { NextResponse } from 'next/server';
import {
  ClientError,
  MailArgValidationError,
} from '../../../utils/apiUtils/customErrors';
import { getEmails } from '../../../utils/apiUtils/get-emails';
import { renderEmailTemplate } from '../../../utils/apiUtils/renderEmailTemplate';
import { sendMail } from '../../../config/sendgrid';
type ReqPayload = {
  api_key: string;
  mail_type: string;
  payload: any;
  recipient_email: string;
};

export async function POST(req: Request) {
  const { api_key, recipient_email, mail_type, payload }: ReqPayload =
    await req.json();

  try {
    // if(!api_key)  throw new ClientError("api_key not found",401)
    // if( api_key !== API_KEY)  throw new ClientError("invalid api Key",401)

    if (!mail_type) {
      throw new ClientError('mail_type attribute missing', 400);
    }

    if (!payload) {
      throw new ClientError('payload attribute missing', 400);
    }

    if (!recipient_email) {
      throw new ClientError('recipient_email attribute missing', 400);
    }

    const { emails } = await getEmails();
    const emailIdx = emails.findIndex((e) => e === mail_type);

    if (emailIdx == -1)
      throw new ClientError(`${mail_type} does not match any mail_type`, 400);

    const { html, subject } = await renderEmailTemplate(
      emails[emailIdx],
      payload,
    );
    await sendMail({ email: recipient_email, html, subject });
    return NextResponse.json('success', {
      status: 200,
    });
  } catch (e: any) {
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
          error: `${e.name}: mail_type:${mail_type},  ${e.message}`,
        },
        {
          status: 400,
        },
      );
    }
    if (e) {
      return NextResponse.json(
        {
          error: `${e.name}: mail_type:${mail_type},  ${e.message}`,
        },
        {
          status: 500,
        },
      );
    }
  }
}
