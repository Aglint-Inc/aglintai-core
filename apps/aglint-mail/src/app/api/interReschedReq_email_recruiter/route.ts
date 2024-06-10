import { NextResponse } from 'next/server';
import {
  ClientError,
  MailArgValidationError,
} from '../../../utils/apiUtils/customErrors';
import { getEmails } from '../../../utils/apiUtils/get-emails';
import { renderEmailTemplate } from '../../../utils/apiUtils/renderEmailTemplate';
// import fetchTemplate from '../../../utils/apiUtils/fillCompEmailTemplate';
// import type {
//   FilledPayload,
//   MeetingDetails,
// } from '../../../utils/types/apiTypes';
// import sendMail from '../../../config/sendgrid';
// import candidateRescheduleRequest from './fetch-util';

export async function POST(req: Request) {
  // const {
  //   session_ids,
  //   application_id,
  //   meeting_id,
  //   interview_cancel_id,
  //   recruiter_user_id,
  // } = await req.json();

  try {
    // if(!api_key)  throw new ClientError("api_key not found",401)
    // if( api_key !== API_KEY)  throw new ClientError("invalid api Key",401)

    // if (!session_ids) {
    //   throw new ClientError('session_id attribute missing', 400);
    // }

    // if (!application_id) {
    //   throw new ClientError('application_id attribute missing', 400);
    // }
    // if (!meeting_id) {
    //   throw new ClientError('meeting_id is missing', 400);
    // }
    // if (!interview_cancel_id) {
    //   throw new ClientError('interview_cancel_id is missing', 400);
    // }
    // if (!recruiter_user_id) {
    //   throw new ClientError('recruiter_user_id is missing', 400);
    // }

    // const data: DataPayload = await candidateRescheduleRequest(
    //   session_ids,
    //   application_id,
    //   meeting_id,
    //   interview_cancel_id,
    //   recruiter_user_id,
    // );

    // const filled_body: FilledPayload = await fetchTemplate(
    //   data.recruiter_id,
    //   data.mail_type,
    //   data.payload,
    // );
    // filled_body.meetingLink = data.payload['[pickYourSlotLink]'];
    // filled_body.meetingDetails = data.payload.meetingDetails;
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
          error: `${e.name}: mail_type:candidate_reschedule_request,  ${e.message}`,
        },
        {
          status: 400,
        },
      );
    }
    if (e) {
      return NextResponse.json(
        {
          error: `${e.name}: mail_type:candidate_reschedule_request,  ${e.message}`,
        },
        {
          status: 500,
        },
      );
    }
  }
}

// {
//   "session_ids": [
//       "5e7953c5-3e56-4d89-9857-29c34b55ce9d",
//       "f5053399-1998-4b43-8ba5-801db1018e27"
//   ],
//   "application_id": "0ab5542d-ae98-4255-bb60-358a9c8e0637",
//   "meeting_id": "8daab34c-9c19-445b-aa96-3b4735307414",
//   "interview_cancel_id": "d904061b-ab58-4aeb-972d-fa86000a29d3",
//   "recruiter_user_id": "7f6c4cae-78b6-4eb6-86fd-9a0e0310147b"
// }
