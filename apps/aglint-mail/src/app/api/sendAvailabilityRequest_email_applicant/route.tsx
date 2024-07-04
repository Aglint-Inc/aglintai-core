import { NextResponse } from 'next/server';
import * as v from 'valibot';
import { sendAvailabilityRequestEmailApplicantSchema } from '@aglint/shared-types/src/aglint-mail/api_schema';
import { sendMailFun } from '../../../utils/apiUtils/sendMail';
import { dbUtil } from './fetch-util';

export async function POST(req: Request) {
  const { meta } = await req.json();

  try {
    const req_body = v.parse(sendAvailabilityRequestEmailApplicantSchema, meta);

    if (req_body?.is_preview) {
      const data = req_body.preview_details;
      if (
        !(
          data.candidateFirstName &&
          data.candidateLastName &&
          data.companyName &&
          data.jobRole &&
          data.organizerFirstName &&
          data.organizerLastName &&
          data.organizerTimeZone &&
          data.companyLogo
        )
      ) {
        throw new Error(
          'For preview some thing missing in this property candidateFirstName, candidateLastName, companyName, jobRole, organizerFirstName, organizerLastName, organizerTimeZone, companyLogo',
        );
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (!req_body.avail_req_id || !req_body.recruiter_user_id) {
        throw new Error(
          'For sending email some properties are missing avail_req_id,recruiter_user_id ',
        );
      }
    }
    const { filled_comp_template, react_email_placeholders, recipient_email } =
      await dbUtil(req_body);

    const is_preview = req_body?.is_preview;
    const htmlSub = await sendMailFun({
      filled_comp_template,
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

// {
//     "meta": {
//         "avail_req_id": "3534e9a6-4db6-4601-8d97-9118c726aaf8",
//         "recruiter_user_id": "eedee99a-e323-48e6-a590-f25f7f18a704"
//     }
// }

// {
//   "meta": {
//       "is_preview": true,
//       "recruiter_user_id": "523ac2a1-d536-4a84-962c-60179a8bbc48",
//       "preview_details": {
//           "candidateFirstName": "chandra",
//           "candidateLastName": "kumar",
//           "companyName": "aglint",
//           "jobRole": "jobRole",
//           "organizerFirstName":"dheeraj",
//           "organizerLastName": "kumar",
//           "organizerTimeZone": "IST",
//           "companyLogo": "https://plionpfmgvenmdwwjzac.supabase.co/storage/v1/object/public/email_template_assets/company_logo.png"
//       }
//   }
// }
