import { NextResponse } from 'next/server';
import {
  ClientError,
  MailArgValidationError,
} from '../../../utils/apiUtils/customErrors';
import { getEmails } from '../../../utils/apiUtils/get-emails';
import { renderEmailTemplate } from '../../../utils/apiUtils/renderEmailTemplate';
import { sendMail } from '../../../config/sendgrid';
import fetchTemplate from '../../../utils/apiUtils/get-template';
import CandidateCancelRequest from '../../../utils/email/candidate_cancel_request/fetch';
import type {
  FilledPayload,
  MeetingDetails,
} from '../../../utils/types/apiTypes';

interface ReqPayload {
  session_id: string[];
  application_id: string;
  meeting_id: string;
  interview_cancel_id: string;
}
interface DataPayload {
  recipient_email: string;
  mail_type: string;
  recruiter_id: string;
  payload: {
    '[firstName]': string;
    '[rescheduleReason]': string;
    '[recruiterName]': string;
    '[companyName]': string;
    'meetingLink': string;
    'meetingDetails': MeetingDetails[];
  };
}

export async function POST(req: Request) {
  const {
    session_id,
    application_id,
    meeting_id,
    interview_cancel_id,
  }: ReqPayload = await req.json();

  try {
    // if(!api_key)  throw new ClientError("api_key not found",401)
    // if( api_key !== API_KEY)  throw new ClientError("invalid api Key",401)

    if (!session_id) {
      throw new ClientError('mail_type attribute missing', 400);
    }

    if (!application_id) {
      throw new ClientError('payload attribute missing', 400);
    }
    if (!meeting_id) {
      throw new ClientError('meeting_id is missing', 400);
    }
    if (!interview_cancel_id) {
      throw new ClientError('interview_cancel_id is missing', 400);
    }
    const data: DataPayload = await CandidateCancelRequest(
      session_id,
      application_id,
      meeting_id,
      interview_cancel_id,
    );

    const filled_body: FilledPayload = await fetchTemplate(
      data.recruiter_id,
      data.mail_type,
      data.payload,
    );
    filled_body.meetingLink = data.payload.meetingLink;
    filled_body.meetingDetails = data.payload.meetingDetails;

    const { emails } = await getEmails();

    const emailIdx = emails.findIndex((e) => e === data.mail_type);

    if (emailIdx === -1)
      throw new ClientError(
        `${data.mail_type} does not match any mail_type`,
        400,
      );

    const { html, subject } = await renderEmailTemplate(
      emails[emailIdx],
      filled_body,
    );
    await sendMail({ email: data.recipient_email, html, subject });
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
          error: `${e.name}: mail_type:candidate_availability_request,  ${e.message}`,
        },
        {
          status: 400,
        },
      );
    }
    if (e) {
      return NextResponse.json(
        {
          error: `${e.name}: mail_type:candidate_availability_request,  ${e.message}`,
        },
        {
          status: 500,
        },
      );
    }
  }
}
