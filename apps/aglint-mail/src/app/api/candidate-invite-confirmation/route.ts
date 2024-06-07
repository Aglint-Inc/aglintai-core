import { NextResponse } from 'next/server';
import {
  ClientError,
  MailArgValidationError,
} from '../../../utils/apiUtils/customErrors';
import { getEmails } from '../../../utils/apiUtils/get-emails';
import { renderEmailTemplate } from '../../../utils/apiUtils/renderEmailTemplate';
import fetchTemplate from '../../../utils/apiUtils/get-template';
import CandidateInviteConfirmation from '../../../utils/email/candidate-invite-confirmation/fetch';
import type { FilledPayload } from '../../../utils/types/apiTypes';
import sendMail from '../../../config/sendgrid';

interface ReqPayload {
  session_ids: string[];
  application_id: string;
  schedule_id: string;
  filter_id: string;
  availability_request_id: string;
  cand_tz: string;
}
// interface DataPayload {
//   recipient_email: string;
//   mail_type: string;
//   recruiter_id: string;
//   companyLogo: string;
//   payload: {
//     '[companyName]': string;
//     '[firstName]': string;
//     '[jobTitle]': string;
//     'meetingLink': string;
//     'meetingDetails': MeetingDetails[];
//   };
// }

export async function POST(req: Request) {
  const {
    session_ids,
    application_id,
    schedule_id,
    filter_id,
    availability_request_id,
    cand_tz,
  }: ReqPayload = await req.json();

  try {
    const { details, mail_attachments } = await CandidateInviteConfirmation(
      session_ids,
      application_id,
      cand_tz,
      filter_id,
      schedule_id,
      availability_request_id,
    );

    const filled_body: FilledPayload = await fetchTemplate(
      details.recruiter_id,
      details.mail_type,
      details.payload,
    );
    filled_body.meetingDetails = details.payload.meetingDetails;
    filled_body.meetingLink = details.payload.meetingLink;
    filled_body.companyLogo = details.companyLogo;
    const { emails } = await getEmails();

    const emailIdx = emails.findIndex((e) => e === details.mail_type);

    if (emailIdx === -1)
      throw new ClientError(
        `${details.mail_type} does not match any mail_type`,
        400,
      );

    const { html, subject } = await renderEmailTemplate(
      emails[emailIdx],
      filled_body,
    );
    await sendMail({
      email: details.recipient_email,
      html,
      subject,
      text: html,
      attachments: mail_attachments,
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
          error: `${e.name}: mail_type:candidate_invite_confirmation,  ${e.message}`,
        },
        {
          status: 400,
        },
      );
    }
    if (e) {
      return NextResponse.json(
        {
          error: `${e.name}: mail_type:candidate_invite_confirmation,  ${e.message}`,
        },
        {
          status: 500,
        },
      );
    }
  }
}

// {
//   "session_ids ": [
//     "5e7953c5-3e56-4d89-9857-29c34b55ce9d",
//     "f5053399-1998-4b43-8ba5-801db1018e27"
//   ],
//   "application_id": "0ab5542d-ae98-4255-bb60-358a9c8e0637",
//   "schedule_id":"74559de0-2bc8-4028-a748-a7eae2f68182",
//   "filter_id":"6e76d21f-7b7f-49c9-9398-b74dde1cedf1"
// }
