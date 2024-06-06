import dayjs from 'dayjs';

var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
import {
  PlanCombinationRespType,
  SessionCombinationRespType,
  SessionInterviewerApiRespType,
} from '@aglint/shared-types';

import { CandidatesSchedulingV2 } from '@/src/services/CandidateScheduleV2/CandidatesSchedulingV2';
import { fetchScheduleDetails } from '@/src/utils/emailTemplate/fetchCompEmailTemplate';
import {
  bookSession,
  CalEventAttendeesAuthDetails,
} from '@/src/utils/event_book/book_session';
import { fetchMeetingsInfo } from '@/src/utils/event_book/fetchMeetingsInfo';
import { getFullName } from '@/src/utils/jsonResume';
import { updateTrainingStatus } from '@/src/utils/scheduling_v2/update_training_status';

import { FilterJsonData } from './types';

// type ConfirmInt = Pick<
//   SessionInterviewerType,
//   'session_id' | 'user_id' | 'interview_module_relation_id'
// >;
export const bookInterviewPlan = async (
  cand_schedule: CandidatesSchedulingV2,
  verified_slot: PlanCombinationRespType,
  interview_filter_json: FilterJsonData,
) => {
  //  verify requested plan
  // create events for all sessions
  const booked_meeting_details = await bookSessions(
    cand_schedule,
    verified_slot.sessions,
    interview_filter_json,
  );

  const all_training_ints: SessionInterviewerApiRespType[] =
    booked_meeting_details.reduce(
      (all, currr_meeting) => currr_meeting.training_ints,
      [],
    );

  updateTrainingStatus({
    training_ints: all_training_ints.map((i) => ({
      interviewer_module_relation_id: i.interview_module_relation_id,
      session_id: i.,
    })),
  });
  // db updates
  // emails
  return booked_meeting_details;
};

const bookSessions = async (
  cand_schedule: CandidatesSchedulingV2,
  sesn_slots: SessionCombinationRespType[],
  interview_filter_json: FilterJsonData,
) => {
  const meetings_info = await fetchMeetingsInfo(
    sesn_slots.map((s) => s.meeting_id),
  );
  const schedule_details = await fetchScheduleDetails(
    interview_filter_json.schedule_id,
  );

  const meeting_promises = sesn_slots.map(async (session) => {
    const meeting_info = meetings_info.find(
      (m) => m.meeting_id === session.meeting_id,
    );
    const sess_inters_full_details =
      cand_schedule.db_details.all_session_int_details[session.session_id];

    const meeting_attendees: CalEventAttendeesAuthDetails[] = [
      ...session.qualifiedIntervs.slice(1),
      ...session.trainingIntervs,
    ].map((attendee) => ({
      email: attendee.email,
      user_id: attendee.user_id,
      schedule_auth:
        sess_inters_full_details.interviewers[attendee.user_id].schedule_auth,
    }));

    const meeting_organizer = {
      email: meeting_info.meeting_organizer_email,
      schedule_auth: meeting_info.meeting_organizer_auth,
      timezone: meeting_info.scheduling_settings.timeZone.tzCode,
      user_id: meeting_info.organizer_id,
    };

    const training_ints = session.trainingIntervs;
    const booked_meeting = await bookSession(
      session,
      interview_filter_json.interview_schedule.recruiter_id,
      meeting_info.meeting_id,
      getFullName(
        schedule_details.candidate.first_name,
        schedule_details.candidate.first_name,
      ),
      schedule_details.job_title,
      meeting_organizer,
      meeting_attendees,
      cand_schedule.db_details.company_cred,
    );

    // assisgn training status shadow or rShadow to ints
    //TODO: training
    // if (training_ints.length > 0) {
    //   updateTrainingStatus({
    //     training_ints: training_ints.map((i) => ({
    //       interviewer_module_relation_id: i.interview_module_relation_id,
    //       session_id: session.session_id,
    //     })),
    //   });
    // }
    // const organizer =
    //   sess_inters_full_details.interviewers[
    //     session.qualifiedIntervs[0].user_id
    //   ];

    // const confirm_ints: ConfirmInt[] = [
    //   organizer,
    //   ...meeting_attendees.map(
    //     (attendee): ConfirmInt => ({
    //       interview_module_relation_id:
    //         sess_inters_full_details.interviewers[attendee.user_id]
    //           .interview_module_relation_id,
    //       session_id: session.session_id,
    //       user_id: attendee.user_id,
    //     }),
    //   ),
    // ];

    // TODO: db update and mail
    // await confirmInterviewers(confirm_ints);
    // const temp = temp_filler.fillEmail('confirmation_mail_to_organizer', {
    //   '[companyName]': schedule_details.company_name,
    //   '[firstName]': req_body.candidate_name,
    //   '[meetingLink]': `${process.env.NEXT_PUBLIC_HOST_NAME}/view?meeting_id=${session.meeting_id}&tab=candidate_details`,
    //   '[recruiterName]': meeting_info.meeting_organizer_email,
    // });
    // const payload: APISendgridPayload = {
    //   email: meeting_info.meeting_organizer_email,
    //   fromEmail: undefined,
    //   fromName: temp.fromName,
    //   headers: undefined,
    //   subject: temp.subject,
    //   text: temp.body,
    // };
    // axios.post(`${process.env.NEXT_PUBLIC_HOST_NAME}/api/sendgrid`, payload);
    return {
      booked_meeting,
      meeting_attendees,
      meeting_organizer,
      training_ints,
    };
  });

  const booked_meetings = await Promise.all(meeting_promises);
  return booked_meetings;
};
