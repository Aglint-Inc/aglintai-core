import { NextResponse } from 'next/server';
import * as v from 'valibot';
import { confirmInterviewEmailApplicantSchema } from '@aglint/shared-types/src/aglint-mail/api_schema';
import { sendMailFun } from '../../../utils/apiUtils/sendMail';
import { fetchUtil } from './fetch-util';

export async function POST(req: Request) {
  const req_body = await req.json();

  try {
    const parsed_body = v.parse(
      confirmInterviewEmailApplicantSchema,
      req_body.meta,
    );
    const {
      filled_comp_template,
      react_email_placeholders,
      recipient_email,
      mail_attachments,
    } = await fetchUtil(parsed_body);

    await sendMailFun(
      filled_comp_template,
      react_email_placeholders,
      recipient_email,
      mail_attachments,
    );
    return NextResponse.json('success', {
      status: 200,
    });
  } catch (e: any) {
    return NextResponse.json(
      {
        error: `${e.name}: mail_type:interview,  ${e.message}`,
      },
      {
        status: 500,
      },
    );
  }
}
