import axios from 'axios';

import { BookedMeetingDetails, FetchDBScheduleDetails } from './types';
type SessionData = {
  session_id: string[];
  application_id: string;
  meeting_id: string;
  recruiter_user_id: string;
};

export const sendMailsToOrganizer = async (
  schedule_db_details: FetchDBScheduleDetails,
  booked_meeting_details: BookedMeetingDetails,
) => {
  const sendMail = async (meeting: SessionData) => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_MAIL_HOST}/api/confirmation-mail-to-organizer`,
      {
        ...meeting,
      },
    );
  };

  booked_meeting_details.map(async (meeting) => {
    await sendMail({
      recruiter_user_id: meeting.meeting_organizer.user_id,
      application_id:
        schedule_db_details.filter_json_data.interview_schedule.applications.id,
      meeting_id: meeting.booked_meeting.meeting_id,
      session_id: [meeting.booked_meeting.session_id],
    });
  });

  // {
  //   "session_id": [
  //       "5e7953c5-3e56-4d89-9857-29c34b55ce9d",
  //       "f5053399-1998-4b43-8ba5-801db1018e27"
  //   ],
  //   "application_id": "0ab5542d-ae98-4255-bb60-358a9c8e0637",
  //   "meeting_id": "8daab34c-9c19-445b-aa96-3b4735307414",
  //   "recruiter_user_id": "7f6c4cae-78b6-4eb6-86fd-9a0e0310147b"
  // }
};
