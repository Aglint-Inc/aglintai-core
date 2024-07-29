import { NextResponse } from 'next/server';
import * as v from 'valibot';
import { agentEmailCandidateSchema } from '@aglint/shared-types/src/aglint-mail/api_schema';
import type { APISendgridPayload } from '@aglint/shared-types';
import sendMail from '../../../config/sendgrid';
import { fetchUtil } from './fetch-util';

export async function POST(req: Request) {
  const req_body = await req.json();

  try {
    const parsed_body = v.parse(agentEmailCandidateSchema, req_body);
    const { filled_comp_template, recipient_email } =
      await fetchUtil(parsed_body);

    const sendgrid_payload: APISendgridPayload = {
      fromEmail: parsed_body.agent_email,
      fromName: filled_comp_template.from_name,
      email: recipient_email,
      html: filled_comp_template.body,
      subject: filled_comp_template.subject,
      text: filled_comp_template.body,
      headers: parsed_body.mail_headers,
    };
    await sendMail(sendgrid_payload);
    return NextResponse.json(sendgrid_payload, {
      status: 200,
    });
  } catch (e: any) {
    console.error(e);

    return NextResponse.json(
      {
        error: `${e.name}:  ${e.message}`,
      },
      {
        status: 500,
      },
    );
  }
}
