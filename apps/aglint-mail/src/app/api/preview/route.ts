import { NextResponse } from 'next/server';
import { createElement } from 'react';
import { render } from '@react-email/render';
import { z } from 'zod';
import {
  ClientError,
  MailArgValidationError,
} from '../../../utils/apiUtils/customErrors';
import { getEmails } from '../../../utils/apiUtils/get-emails';

interface ReqPayload {
  mail_type: string;
  body: string;
}

const ReqPayload = z.object({
  mailType: z.string(),
  body: z.string(),
});

export async function POST(req: Request) {
  const { mail_type, body }: ReqPayload = await req.json();

  try {
    if (!mail_type) {
      throw new ClientError('attribute application_id missing', 400);
    }
    const { emails } = await getEmails();
    const emailBody = body.replace(/\{\{/g, '').replace(/\}\}/g, '');

    const emailIdx = emails.findIndex((e) => e === mail_type);

    const { html } = await renderEmailTemplates(emails[emailIdx], emailBody);
    return NextResponse.json(html, {
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
          error: `${e.name}: mail_type:application received,  ${e.message}`,
        },
        {
          status: 400,
        },
      );
    }
    if (e) {
      return NextResponse.json(
        {
          error: `${e.name}: mail_type:application received,  ${e.message}`,
        },
        {
          status: 500,
        },
      );
    }
  }
}

export const renderEmailTemplates = async (
  filename: string,
  emailBody: string,
) => {
  const { default: Template, dummy } = await import(
    `../../../emails/${filename}`
  );
  dummy.emailBody = emailBody;
  const element = createElement(Template, dummy);
  const html = render(element);
  return { html };
};
