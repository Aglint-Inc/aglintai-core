import { NextResponse } from 'next/server';
import {
  ClientError,
  MailArgValidationError,
} from '../../../utils/apiUtils/customErrors';
import { getEmails } from '../../../utils/apiUtils/get-emails';
import { renderEmailTemplate } from '../../../utils/apiUtils/renderEmailTemplate';
import { sendMail } from '../../../config/sendgrid';
import fetchTemplate from '../../../utils/apiUtils/get-template';
import type { FilledPayload } from '../../../utils/types/apiTypes';

interface ReqPayload {
  recipient_email: string;
}

export async function POST(req: Request) {
  const { recipient_email }: ReqPayload = await req.json();

  try {
    if (!recipient_email) {
      throw new ClientError('recipient_email attribute missing', 400);
    }
    const filled_body: FilledPayload = await fetchTemplate(
      'd353b3a0-3e19-45d0-8623-4bd35577f548',
      'upcoming_interview_reminder_candidate',
      '',
    );
    const { emails } = await getEmails();

    const emailIdx = emails.findIndex(
      (e) => e === 'upcoming_interview_reminder_candidate',
    );

    if (emailIdx === -1)
      throw new ClientError(
        `upcoming_interview_reminder_candidate does not match any mail_type`,
        400,
      );

    const { html, subject } = await renderEmailTemplate(
      emails[emailIdx],
      filled_body,
    );
    await sendMail({ email: recipient_email, html, subject });
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
          error: `${e.name}: mail_type:rejection,  ${e.message}`,
        },
        {
          status: 400,
        },
      );
    }
    if (e) {
      return NextResponse.json(
        {
          error: `${e.name}: mail_type:rejection,  ${e.message}`,
        },
        {
          status: 500,
        },
      );
    }
  }
}
