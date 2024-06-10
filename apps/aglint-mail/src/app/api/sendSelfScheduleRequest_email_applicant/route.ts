import { NextResponse } from 'next/server';
import {
  ClientError,
  MailArgValidationError,
} from '../../../utils/apiUtils/customErrors';
import { getEmails } from '../../../utils/apiUtils/get-emails';
import { renderEmailTemplate } from '../../../utils/apiUtils/renderEmailTemplate';
// import fetchTemplate from '../../../utils/apiUtils/fillCompEmailTemplate';
// import type { FilledPayload } from '../../../utils/types/apiTypes';
// import sendMail from '../../../config/sendgrid';
// import initEmailAgentRemainder from './fetch-util';

// interface ReqPayload {
//   schedule_id: string;
//   filter_id: string;
// }
// interface Meta {
//   meta: ReqPayload;
// }

// interface DataPayload {
//   recipient_email: string;
//   mail_type: string;
//   recruiter_id: string;
//   companyLogo: string;
//   payload: {
//     '[candidateFirstName]': string;
//     '[Company Name]': string;
//     '[Job Title]': string;
//     '[startDate]': string;
//     '[endDate]': string;
//     '[companyTimeZone]': string;
//     '[selfScheduleLink]': string;
//   };
// }

export async function POST(req: Request) {
  // const { meta }: Meta = await req.json();

  try {
    // if (!meta.filter_id) {
    //   throw new ClientError('filter_id attribute missing', 400);
    // }
    // if (!meta.schedule_id) {
    //   throw new ClientError('meeting_id attribute missing', 400);
    // }
    // const data: DataPayload = await initEmailAgentRemainder(
    //   meta.filter_id,
    //   meta.schedule_id,
    // );
    // const filled_body: FilledPayload = await fetchTemplate(
    //   data.recruiter_id,
    //   data.mail_type,
    //   data.payload,
    // );
    // filled_body.companyLogo = data.companyLogo;
    // const { emails } = await getEmails();

    // const emailIdx = emails.findIndex((e) => e === data.mail_type);

    // if (emailIdx === -1)
    //   throw new ClientError(
    //     `${data.mail_type} does not match any mail_type`,
    //     400,
    //   );

    // const { html, subject } = await renderEmailTemplate(
    //   emails[emailIdx],
    //   filled_body,
    // );
    // await sendMail({ email: data.recipient_email, html, subject, text: html });
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
          error: `${e.name}: mail_type:self_scheduling_request_remainder,  ${e.message}`,
        },
        {
          status: 400,
        },
      );
    }
    if (e) {
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
}

// {
//     "meeting_id": "8daab34c-9c19-445b-aa96-3b4735307414",
//     "filter_id": "71b8859d-b6c6-425e-8b1a-e97ae8bb9498"
// }
