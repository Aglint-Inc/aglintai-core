import { type SessionCombinationRespType } from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';

import { bookSession } from '@/utils/event_book/book_session';
import { fetchMeetingsInfo } from '@/utils/event_book/fetchMeetingsInfo';
import type { CalEventAttendeesAuthDetails } from '@/utils/event_book/types';

import { type CandidatesSchedulingV2 } from '../../CandidatesSchedulingV2';
import { type ConfirmInt, type ScheduleDBDetails } from './types';

export const createMeetingEvents = async (
  cand_schedule: CandidatesSchedulingV2,
  sesn_slots: SessionCombinationRespType[],
  schedule_db_details: ScheduleDBDetails,
) => {
  const meetings_info = await fetchMeetingsInfo(
    sesn_slots.map((s) => s.meeting_id),
  );

  const meeting_promises = sesn_slots.map(async (session) => {
    const meeting_info = meetings_info.find(
      (m) => m.meeting_id === session.meeting_id,
    );
    const sess_inters_full_details =
      cand_schedule.db_details.all_session_int_details[session.session_id];

    const meeting_attendees_auth: CalEventAttendeesAuthDetails[] = [
      ...session.qualifiedIntervs.filter(
        (int) => int.user_id !== meeting_info.organizer_id,
      ),
      ...session.trainingIntervs,
    ].map((attendee) => ({
      email: attendee.email,
      user_id: attendee.user_id,
      schedule_auth:
        sess_inters_full_details.interviewers[attendee.user_id].schedule_auth,
    }));

    const meeting_organizer_auth = {
      email: meeting_info.meeting_organizer_email,
      schedule_auth: meeting_info.meeting_organizer_auth,
      timezone: meeting_info.scheduling_settings.timeZone.tzCode,
      user_id: meeting_info.organizer_id,
    };

    const training_ints = session.trainingIntervs;
    const booked_meeting = await bookSession({
      session: session,
      company_id: schedule_db_details.company.id,
      meeting_id: meeting_info.meeting_id,
      candidate_name: getFullName(
        schedule_db_details.candidate.first_name,
        schedule_db_details.candidate.last_name,
      ),
      job_title: schedule_db_details.job.job_title,
      cal_event_organizer: meeting_organizer_auth,
      cal_event_attendees: meeting_attendees_auth,
      company_cred_hash_str: cand_schedule.db_details.company_cred_hash_str,
    });
    const meeting_organizer =
      sess_inters_full_details.interviewers[
        session.qualifiedIntervs[0].user_id
      ];
    const all_confirmed_interviewers: ConfirmInt[] = [
      meeting_organizer,
      ...meeting_attendees_auth.map(
        (attendee): ConfirmInt => ({
          interview_module_relation_id:
            sess_inters_full_details.interviewers[attendee.user_id]
              .interview_module_relation_id,
          session_id: session.session_id,
          user_id: attendee.user_id,
        }),
      ),
    ];
    return {
      booked_meeting,
      meeting_organizer,
      training_ints,
      all_confirmed_interviewers,
    };
  });

  const booked_meetings = await Promise.all(meeting_promises);
  return booked_meetings;
};
