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

    const emailIdx = emails.findIndex((e) => e === mail_type);

    // if (emailIdx === -1)
    //   throw new ClientError(
    //     `${data.mail_type} does not match any mail_type`,
    //     400,
    //   );
    console.log(emails[emailIdx]);

    const { html } = await renderEmailTemplates(emails[emailIdx], body);
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
  payload: string,
) => {
  const { default: Template } = await import(`../../../emails/${filename}`);

  const element = createElement(Template, payload);
  const html = render(element);
  return { html };
};
