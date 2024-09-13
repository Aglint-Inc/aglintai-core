import { availabilityReqResendEmailCandidateSchema } from '@aglint/shared-types/src/aglint-mail/api_schema';
import { NextResponse } from 'next/server';
import * as v from 'valibot';
import { getSupabaseServer } from '../../supabase/supabaseAdmin';
import { sendMailFun } from '../../utils/apiUtils/sendMail';
import { dbUtil } from './fetch-util';
import { PortalPayload } from '../../utils/types/portalMessage';

export async function POST(req: Request) {
  const body = await req.json();
  const supabaseAdmin = getSupabaseServer();

  try {
    const req_body = v.parse(availabilityReqResendEmailCandidateSchema, body);
    const {
      comp_email_placeholder,
      company_id,
      react_email_placeholders,
      recipient_email,
      application_id,
    } = await dbUtil(supabaseAdmin, req_body);

    const is_preview = Boolean(req_body.is_preview);

    const portal: PortalPayload = {
      application_id,
      availability_id: req_body.avail_req_id,
    };
    const resp = await sendMailFun({
      supabaseAdmin,
      comp_email_placeholder,
      company_id,
      react_email_placeholders,
      recipient_email,
      is_preview,
      api_target: 'availabilityReqResend_email_candidate',
      payload: req_body.payload,
      portalMessage: portal,
    });

    if (is_preview) {
      return NextResponse.json(
        { html: resp.html, subject: resp.subject },
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
