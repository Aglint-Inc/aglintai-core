import { NextResponse } from 'next/server';
import * as v from 'valibot';
import { interviewStartEmailOrganizerSchema } from '@aglint/shared-types/src/aglint-mail/api_schema';
import { sendMailFun } from '../../../utils/apiUtils/sendMail';
import { fetchUtil } from './fetch-util';

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const req_body = v.parse(interviewStartEmailOrganizerSchema, body);

    const {
      comp_email_placeholder,
      company_id,
      react_email_placeholders,
      recipient_email,
    } = await fetchUtil(req_body);
    const is_preview = req_body.is_preview;
    const htmlSub = await sendMailFun({
      comp_email_placeholder,
      company_id,
      react_email_placeholders,
      recipient_email,
      is_preview,
      api_target: 'interviewStart_email_organizer',
      payload: req_body.payload,
    });

    if (is_preview) {
      const { html, subject } = htmlSub;
      return NextResponse.json(
        { html, subject },
        {
          status: 200,
        },
      );
    }

    return NextResponse.json(
      { message: 'success' },
      {
        status: 200,
      },
    );
  } catch (e) {
    console.error(e);
    if (e) {
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
}
