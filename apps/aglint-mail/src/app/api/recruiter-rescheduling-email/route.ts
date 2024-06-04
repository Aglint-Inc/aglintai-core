import { NextResponse } from 'next/server';
import {
  ClientError,
  MailArgValidationError,
} from '../../../utils/apiUtils/customErrors';
import { getEmails } from '../../../utils/apiUtils/get-emails';
import { renderEmailTemplate } from '../../../utils/apiUtils/renderEmailTemplate';
import { sendMail } from '../../../config/sendgrid';
import fetchTemplate from '../../../utils/apiUtils/get-template';
import RecruiterReschedulingEmail from '../../../utils/email/recruiter_rescheduling_email/fetch';
import type { FilledPayload } from '../../../utils/types/apiTypes';

interface ReqPayload {
  session_ids: string[];
  application_id: string;
  meeting_id: string;
  interview_cancel_id: string;
}
interface DataPayload {
  recipient_email: string;
  mail_type: string;
  recruiter_id: string;
  companyLogo: string;
  payload: {
    '[firstName]': string;
    '[recruiterRescheduleReason]': string;
    '[scheduleName]': string;
    '[companyName]': string;
    '[pickYourSlotLink]': string;
    'meetingDetails': {
      date: string;
      time: string;
      sessionType: string;
      platform: any;
      duration: string;
      sessionTypeIcon: any;
      meetingIcon: string;
    }[];
  };
}

export async function POST(req: Request) {
  const {
    session_ids,
    application_id,
    meeting_id,
    interview_cancel_id,
  }: ReqPayload = await req.json();

  try {
  

    if (!session_ids) {
      throw new ClientError('attribute session_ids missing', 400);
    }
    if (!interview_cancel_id) {
      throw new ClientError(
        'attribute interview_cancel_id missing',
        400,
      );
    }

    if (!application_id) {
      throw new ClientError('application_id attribute missing', 400);
    }
    if (!meeting_id) {
      throw new ClientError('meeting_id is missing', 400);
    }
    const data: DataPayload = await RecruiterReschedulingEmail(
      session_ids,
      application_id,
      meeting_id,
      interview_cancel_id,
    );
    const filled_body: FilledPayload = await fetchTemplate(
      data.recruiter_id,
      data.mail_type,
      data.payload,
    );
    filled_body.companyLogo = data.companyLogo;
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
          error: `${e.name}: mail_type:recruiter_rescheduling_email,  ${e.message}`,
        },
        {
          status: 400,
        },
      );
    }
    if (e) {
      return NextResponse.json(
        {
          error: `${e.name}: mail_type:recruiter_rescheduling_email,  ${e.message}`,
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
//     "5e7953c5-3e56-4d89-9857-29c34b55ce9d",
//     "f5053399-1998-4b43-8ba5-801db1018e27"
//   ],
//   "application_id": "0ab5542d-ae98-4255-bb60-358a9c8e0637",
//   "meeting_id":"8daab34c-9c19-445b-aa96-3b4735307414",
//   "interview_cancel_id":"db87ebee-c84a-4dda-99f5-35a3fe298af4"
// }
