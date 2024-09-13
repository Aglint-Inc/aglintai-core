import { type TargetApiPayloadType } from '@aglint/shared-types';

import { type BookedMeetingDetails, type ScheduleDBDetails } from './types';

export const sendMailsToOrganizer = async (
  schedule_db_details: ScheduleDBDetails,
  booked_meeting_details: BookedMeetingDetails,
) => {
  const sendMail = async (
    meeting: TargetApiPayloadType<'confInterview_email_organizer'>,
  ) => {
    await mailSender({
      target_api: 'confInterview_email_organizer',
      payload: {
        ...meeting,
      },
    });
  };

  booked_meeting_details.map(async (meeting) => {
    await sendMail({
      session_ids: [meeting.booked_meeting.session_id],
      application_id: schedule_db_details.application.id,
    });
  });
};
