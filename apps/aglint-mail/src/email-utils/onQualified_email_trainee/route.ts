import { onQualifiedEmailTraineeSchema } from '@aglint/shared-types/src/aglint-mail/api_schema';
import { NextResponse } from 'next/server';
import * as v from 'valibot';
import { getSupabaseServer } from '../../supabase/supabaseAdmin';
import {
  ClientError,
  MailArgValidationError,
} from '../../utils/apiUtils/customErrors';
import { sendMailFun } from '../../utils/apiUtils/sendMail';
import { fetchUtil } from './fetch-util';

export async function POST(req: Request) {
  const req_body = await req.json();

  const supabaseAdmin = getSupabaseServer();

  try {
    const parsed_body = v.parse(onQualifiedEmailTraineeSchema, req_body);
    const {
      comp_email_placeholder,
      company_id,
      react_email_placeholders,
      recipient_email,
    } = await fetchUtil(supabaseAdmin, parsed_body);

    await sendMailFun({
      supabaseAdmin,
      comp_email_placeholder,
      company_id,
      react_email_placeholders,
      recipient_email,
      payload: req_body.payload,
      api_target: 'onQualified_email_trainee',
    });

    return NextResponse.json('success', {
      status: 200,
    });
  } catch (e: any) {
    console.error(e);
    if (e instanceof ClientError) {
      return NextResponse.json(
        {
          error: `${e.name} : ${e.message}`,
        },
        {
          status: e.status,
        },
      );
    }
    if (e instanceof MailArgValidationError) {
      return NextResponse.json(
        {
          error: `${e.name}: mail_type:rejection,  ${e.message}`,
        },
        {
          status: 400,
        },
      );
    }
    if (e) {
      return NextResponse.json(
        {
          error: `${e.name}: mail_type:rejection,  ${e.message}`,
        },
        {
          status: 500,
        },
      );
    }
  }
}

// {
//   "meta": {
//       "application_id": "13c0fff9-5d10-41f8-b077-ea0884977ab2"
//   }
// }