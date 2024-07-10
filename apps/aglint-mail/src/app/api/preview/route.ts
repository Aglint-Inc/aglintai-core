import { NextResponse } from 'next/server';
import { createElement } from 'react';
import { render } from '@react-email/render';
import { z } from 'zod';
import { replaceAll, type allTempvariables } from '@aglint/shared-utils';
import { ClientError } from '../../../utils/apiUtils/customErrors';
import { getEmails } from '../../../utils/apiUtils/get-emails';

interface ReqPayload {
  mail_type: string;
  body: string;
}

const ReqPayload = z.object({
  mailType: z.string(),
  body: z.string(),
});

const all_possible_dynamic_values: {
  [K in (typeof allTempvariables)[number]]: string;
} = {
  candidateFirstName: 'John',
  candidateLastName: 'Doe',
  candidateName: 'John Doe',
  companyName: 'Tech Innovations Inc.',
  jobRole: 'Software Engineer',
  organizerName: 'Jane Smith',
  organizerFirstName: 'Jane',
  organizerLastName: 'Smith',
  OrganizerTimeZone: 'PST',
  interviewerName: 'Michael Johnson',
  interviewerFirstName: 'Michael',
  interviewerLastName: 'Johnson',
  startDate: '2024-07-15',
  endDate: '2024-07-15',
};

export async function POST(req: Request) {
  const { mail_type, body }: ReqPayload = await req.json();

  try {
    if (!mail_type) {
      throw new ClientError('attribute application_id missing', 400);
    }
    const { emails } = await getEmails();
    const filledBody = replacePlaceholders(body);

    const emailBody = filledBody.replace(/\{\{/g, '').replace(/\}\}/g, '');

    const emailIdx = emails.findIndex((e) => e === mail_type);

    const { html } = await renderEmailTemplates(emails[emailIdx], emailBody);
    return NextResponse.json(html, {
      status: 200,
    });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      {
        error: `${e.name} : ${e.message}`,
      },
      {
        status: e.status,
      },
    );
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

const replacePlaceholders = (template_body: string) => {
  let updated_temp_body = template_body;
  for (const key of Object.keys(all_possible_dynamic_values)) {
    updated_temp_body = replaceAll(
      template_body,
      `{{${key}}}`,
      all_possible_dynamic_values[String(key)],
    );
  }
  return updated_temp_body;
};
