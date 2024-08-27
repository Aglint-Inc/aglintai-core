import { NextResponse } from 'next/server';
import * as v from 'valibot';
import { confirmInterviewEmailApplicantSchema } from '@aglint/shared-types/src/aglint-mail/api_schema';
import { sendMailFun } from '../../../utils/apiUtils/sendMail';
import { fetchUtil } from './fetch-util';
import { getSupabaseServer } from '../../../supabase/supabaseAdmin';

export async function POST(req: Request) {
  const req_body = await req.json();
  const supabaseAdmin = getSupabaseServer();
  try {
    const parsed_body = v.parse(confirmInterviewEmailApplicantSchema, req_body);
    const {
      comp_email_placeholder,
      company_id,
      react_email_placeholders,
      recipient_email,
      mail_attachments,
    } = await fetchUtil(supabaseAdmin, parsed_body);

    const is_preview = Boolean(parsed_body.preview_details);
    const resp = await sendMailFun({
      supabaseAdmin,
      comp_email_placeholder,
      company_id,
      react_email_placeholders,
      recipient_email,
      attachments: mail_attachments,
      is_preview,
      api_target: 'confirmInterview_email_applicant',
      payload: req_body.payload,
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
        error: `${e.name}: mail_type:interview,  ${e.message}`,
      },
      {
        status: 500,
      },
    );
  }
}
