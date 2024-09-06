import { NextResponse } from 'next/server';
import * as v from 'valibot';
import { sendSelfScheduleRequest_email_applicant } from '@aglint/shared-types/src/aglint-mail/api_schema';
import { sendMailFun } from '../../../utils/apiUtils/sendMail';
import { dbUtil } from './fetch-util';
import { getSupabaseServer } from '../../../supabase/supabaseAdmin';
import { PortalPayload } from '../../../utils/types/portalMessage';

export async function POST(req: Request) {
  const body = await req.json();
  const supabaseAdmin = getSupabaseServer();
  try {
    const req_body = v.parse(sendSelfScheduleRequest_email_applicant, body);

    if (!req_body.filter_json_id && !req_body.application_id) {
      throw new Error('missing details');
    }

    const {
      comp_email_placeholder,
      company_id,
      react_email_placeholders,
      recipient_email,
      application_id,
    } = await dbUtil(supabaseAdmin, req_body);

    const portal: PortalPayload = {
      application_id: application_id,
      filter_id: req_body.filter_json_id,
    };
    const htmlSub = await sendMailFun({
      supabaseAdmin,
      api_target: 'sendSelfScheduleRequest_email_applicant',
      comp_email_placeholder,
      company_id,
      react_email_placeholders,
      recipient_email,
      payload: req_body.payload,
      is_preview: req_body?.is_preview,
      portalMessage: portal,
    });

    if (req_body.is_preview) {
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
        error: `${e.name}: mail_type:self_scheduling_request_remainder,  ${e.message}`,
      },
      {
        status: 500,
      },
    );
  }
}
