import { NextResponse } from 'next/server';
import * as v from 'valibot';
import { sendAvailabilityRequestEmailApplicantSchema } from '@aglint/shared-types/src/aglint-mail/api_schema';
import { sendMailFun } from '../../../utils/apiUtils/sendMail';
import { dbUtil } from './fetch-util';

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const req_body = v.parse(sendAvailabilityRequestEmailApplicantSchema, body);
    if (!req_body.avail_req_id && !req_body.preview_details) {
      throw new Error('missing details');
    }
    const {
      comp_email_placeholder,
      company_id,
      react_email_placeholders,
      recipient_email,
    } = await dbUtil(req_body);

    const is_preview = req_body.preview_details;
    const htmlSub = await sendMailFun({
      api_target: 'availabilityReqResend_email_candidate',
      comp_email_placeholder,
      company_id,
      react_email_placeholders,
      recipient_email,
      is_preview,
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
    return NextResponse.json('success', {
      status: 200,
    });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      {
        error: `${e.name}: ${e.message}`,
      },
      {
        status: 500,
      },
    );
  }
}
