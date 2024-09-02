import { type EmailTemplateAPi } from '@aglint/shared-types';
import axios from 'axios';

import { type BookedMeetingDetails, type ScheduleDBDetails } from './types';

export const sendMailsToOrganizer = async (
  schedule_db_details: ScheduleDBDetails,
  booked_meeting_details: BookedMeetingDetails,
) => {
  const sendMail = async (
    meeting: EmailTemplateAPi<'confInterview_email_organizer'>['api_payload'],
  ) => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_MAIL_HOST}/api/confInterview_email_organizer`,
      {
        ...meeting,
      },
    );
  };

  booked_meeting_details.map(async (meeting) => {
    await sendMail({
      session_ids: [meeting.booked_meeting.session_id],
      application_id: schedule_db_details.application.id,
    });
  });
};
