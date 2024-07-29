import { NextResponse } from 'next/server';
import * as v from 'valibot';
import { applicantRejectEmailApplicantSchema } from '@aglint/shared-types/src/aglint-mail/api_schema';
import { sendMailFun } from '../../../utils/apiUtils/sendMail';
import { fetchUtil } from './fetch-util';

export async function POST(req: Request) {
  const req_body = await req.json();

  try {
    const parsed_body = v.parse(applicantRejectEmailApplicantSchema, req_body);

    const {
      comp_email_placeholder,
      react_email_placeholders,
      recipient_email,
      company_id,
      job_id,
    } = await fetchUtil(parsed_body);

    await sendMailFun({
      comp_email_placeholder,
      react_email_placeholders,
      recipient_email,
      company_id,
      job_id,
      api_target: 'applicantReject_email_applicant',
      payload: parsed_body.payload,
    });

    return NextResponse.json('success', {
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

// {
//   "meta": {
//       "application_id": "13c0fff9-5d10-41f8-b077-ea0884977ab2"
//   }
// }
