import { NextResponse } from 'next/server';
import { createElement } from 'react';
import { render } from '@react-email/render';
import { z } from 'zod';
import { replaceAll, type allTempvariables } from '@aglint/shared-utils';
import { ClientError } from '../../../utils/apiUtils/customErrors';
import { getEmails } from '../../../utils/apiUtils/get-emails';
import { fetchUtil } from './fetch-utils';

interface ReqPayload {
  mail_type: string;
  recruiter_id?: string;
  job_id?: string;
}

const ReqPayload = z.object({
  mailType: z.string(),
  recruiter_id: z.optional(z.string(), undefined),
  job_id: z.optional(z.string(), undefined),
});

const all_possible_dynamic_values: {
  [K in (typeof allTempvariables)[number]]: string;
} = {
  candidateFirstName: 'Emily',
  candidateLastName: 'Johnson',
  candidateName: 'Emily Johnson',
  companyName: 'Aglint',
  jobRole: 'HR Coordinator',
  organizerName: 'Jane Smith',
  organizerFirstName: 'Jane',
  organizerLastName: 'Smith',
  OrganizerTimeZone: 'PST',
  interviewerName: 'Michael Johnson',
  interviewerFirstName: 'Michael',
  interviewerLastName: 'Johnson',
  startDate: 'Fri, May 12, 2024',
  endDate: 'May 13, 2024',
  time: '10:30 AM - 11:00 PM',
};

export async function POST(req: Request) {
  const { mail_type, recruiter_id, job_id }: ReqPayload = await req.json();

  try {
    if (!mail_type) {
      throw new ClientError('attribute application_id missing', 400);
    }
    const { body, companyName } = await fetchUtil({
      recruiter_id,
      mail_type,
      job_id,
    });

    const { emails } = await getEmails();
    const filledBody = replacePlaceholders(body, companyName);

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
  const { default: Template } = await import(`../../../emails/${filename}`);

  const templateData = {
    body: emailBody,
    emailBody: emailBody,
  };
  const element = createElement(Template, templateData);
  const html = render(element);
  return { html };
};

const replacePlaceholders = (template_body: string, compName: string) => {
  let updated_temp_body = template_body;
  const values = {
    ...all_possible_dynamic_values,
    companyName: compName || all_possible_dynamic_values.companyName,
  };

  for (const key of Object.keys(values)) {
    updated_temp_body = replaceAll(
      updated_temp_body,
      `{{${key}}}`,
      values[String(key)],
    );
  }
  return updated_temp_body;
};
