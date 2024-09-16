import { NextResponse } from 'next/server';
import type { DatabaseEnums } from '@aglint/shared-types';
import { TargetApiSchema } from '@aglint/shared-types';
import { getSupabaseServer } from '../../../supabase/supabaseAdmin';
import type { FetchUtilType } from '../../../types/emailfetchUtil';
import { sendMailFun } from '../../../utils/apiUtils/sendMail';

export async function POST(req: Request) {
  const { target_api, payload } = await req.json();
  const supabaseAdmin = getSupabaseServer();

  try {
    const schema =
      TargetApiSchema[target_api as DatabaseEnums['email_slack_types']];
    if (!schema) {
      throw new Error(`Invalid target_api: ${target_api}`);
    }
    //
    const parsed_body = schema.parse(payload);
    const { fetchUtil } = (await import(
      `../../../email-utils/${target_api as string}/fetch-util`
    )) as {
      fetchUtil: FetchUtilType<any>;
    };

    const fetched_data = await fetchUtil(supabaseAdmin, parsed_body);
    if (!Array.isArray(fetched_data.mail_data)) {
      const {
        comp_email_placeholder,
        company_id,
        job_id,
        react_email_placeholders,
        recipient_email,
        mail_attachments,
      } = fetched_data.mail_data;
      const mailResp = await sendMailFun({
        supabaseAdmin,
        comp_email_placeholder,
        react_email_placeholders,
        recipient_email,
        company_id,
        job_id,
        api_target: target_api,
        overridedMailSubBody: parsed_body.overridedMailSubBody,
        is_preview: parsed_body.is_preview,
        attachments: mail_attachments,
      });
      if (parsed_body.is_preview) {
        return NextResponse.json(mailResp, {
          status: 200,
        });
      }
    } else {
      for (const {
        company_id,
        comp_email_placeholder,
        react_email_placeholders,
        recipient_email,
        job_id,
        mail_attachments,
      } of fetched_data.mail_data) {
        // eslint-disable-next-line no-await-in-loop
        await sendMailFun({
          supabaseAdmin,
          comp_email_placeholder,
          company_id,
          react_email_placeholders,
          recipient_email,
          api_target: 'debrief_email_interviewer',
          overridedMailSubBody: parsed_body.overridedMailSubBody,
          job_id,
          attachments: mail_attachments,
        });
      }
    }

    return NextResponse.json('OK');
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
