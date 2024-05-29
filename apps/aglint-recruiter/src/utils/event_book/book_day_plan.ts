import dayjs from 'dayjs';

var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
import {
  APICandidateConfirmSlot,
  APISendgridPayload,
  CalendarEvent,
  SessionInterviewerType,
} from '@aglint/shared-types';
import axios from 'axios';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { userTzDayjs } from '@/src/services/CandidateSchedule/utils/userTzDayjs';
import { CandidatesSchedulingV2 } from '@/src/services/CandidateScheduleV2/CandidatesSchedulingV2';

import { EmailTemplateFiller } from '../emailTemplate/EmailTemplateFiller';
import { fetchScheduleDetails } from '../emailTemplate/fetchCompEmailTemplate';
import { assignCandidateSlot } from '../scheduling_v2/assignCandidateSlot';
import { updateTrainingStatus } from '../scheduling_v2/update_training_status';
import { supabaseAdmin } from '../supabase/supabaseAdmin';
import { bookSession, CalEventAttendeesAuthDetails } from './book_session';
import { fetchMeetingsInfo } from './fetchMeetingsInfo';
type ConfirmInt = Pick<
  SessionInterviewerType,
  'session_id' | 'user_id' | 'interview_module_relation_id'
>;
export const bookCandidatePlan = async (req_body: APICandidateConfirmSlot) => {
  let { candidate_plan, recruiter_id, user_tz, is_debreif } = req_body;
  const all_sess_ids: string[] = candidate_plan.reduce((tot, curr) => {
    return [...tot, ...curr.sessions.map((s) => s.session_id)];
  }, []);

  const first_day_slot = candidate_plan[0].sessions;
  const last_day_slot = candidate_plan[candidate_plan.length - 1].sessions;
  const cand_scheduling = new CandidatesSchedulingV2(
    {
      recruiter_id: recruiter_id,
      session_ids: all_sess_ids,
      candidate_tz: user_tz,
      start_date_str: userTzDayjs(first_day_slot[0].start_time).format(
        'DD/MM/YYYY',
      ),
      end_date_str: userTzDayjs(last_day_slot[0].start_time).format(
        'DD/MM/YYYY',
      ),
    },
    null,
  );
  await cand_scheduling.fetchDetails();
  await cand_scheduling.fetchIntsEventsFreeTimeWorkHrs();
  const { company_cred, ses_with_ints } = cand_scheduling.db_details;
  const meetings_info = await fetchMeetingsInfo(
    ses_with_ints.map((s) => s.meeting_id),
  );
  const schedule_details = await fetchScheduleDetails(req_body.schedule_id);
  const temp_filler = new EmailTemplateFiller(schedule_details.template);
  const bookDayPlan = async ({
    day_plan,
  }: {
    day_plan: {
      sessions: {
        session_id: string;
        start_time: string;
        end_time: string;
      }[];
    };
  }) => {
    const confirmInterviewers = async (inters: ConfirmInt[]) => {
      await Promise.all(
        inters.map(async (int) => {
          if (!is_debreif) {
            supabaseWrap(
              await supabaseAdmin
                .from('interview_session_relation')
                .update({
                  is_confirmed: true,
                })
                .eq(
                  'interview_module_relation_id',
                  int.interview_module_relation_id,
                )
                .eq('session_id', int.session_id),
            );
          } else {
            supabaseWrap(
              await supabaseAdmin
                .from('interview_session_relation')
                .update({
                  is_confirmed: true,
                })
                .eq('user_id', int.user_id)
                .eq('session_id', int.session_id),
            );
          }
        }),
      );
    };

    const curr_date = dayjs(day_plan.sessions[0].start_time).tz(user_tz);
    cand_scheduling.setSchedulingDates(
      curr_date.startOf('day'),
      curr_date.endOf('day'),
    );
    const plan_combs = cand_scheduling.findCandSlotForTheDay();
    const assisgned_slot = assignCandidateSlot(plan_combs[0], curr_date);
    const meet_promises = assisgned_slot.sessions.map(async (session) => {
      const meeting_info = meetings_info.find(
        (m) => m.meeting_id === session.meeting_id,
      );
      const sess_inters_full_details =
        cand_scheduling.db_details.all_session_int_details[session.session_id];

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
      const booked_sessions = await bookSession(
        session,
        recruiter_id,
        meeting_info.meeting_id,
        req_body.candidate_name,
        schedule_details.job_title,
        meeting_organizer,
        meeting_attendees,
        company_cred,
      );

      // assisgn training status shadow or rShadow to ints
      if (training_ints.length > 0) {
        updateTrainingStatus({
          training_ints: training_ints.map((i) => ({
            interviewer_module_relation_id: i.interview_module_relation_id,
            session_id: session.session_id,
          })),
        });
      }
      const organizer =
        sess_inters_full_details.interviewers[
          session.qualifiedIntervs[0].user_id
        ];

      const confirm_ints: ConfirmInt[] = [
        organizer,
        ...meeting_attendees.map(
          (attendee): ConfirmInt => ({
            interview_module_relation_id:
              sess_inters_full_details.interviewers[attendee.user_id]
                .interview_module_relation_id,
            session_id: session.session_id,
            user_id: attendee.user_id,
          }),
        ),
      ];
      await confirmInterviewers(confirm_ints);
      const temp = temp_filler.fillEmail('confirmation_mail_to_organizer', {
        '[companyName]': schedule_details.company_name,
        '[firstName]': req_body.candidate_name,
        '[meetingLink]': `${process.env.NEXT_PUBLIC_HOST_NAME}/view?meeting_id=${session.meeting_id}&tab=candidate_details`,
        '[recruiterName]': meeting_info.meeting_organizer_email,
      });
      const payload: APISendgridPayload = {
        email: meeting_info.meeting_organizer_email,
        fromEmail: undefined,
        fromName: temp.fromName,
        headers: undefined,
        subject: temp.subject,
        text: temp.body,
      };
      axios.post(`${process.env.NEXT_PUBLIC_HOST_NAME}/api/sendgrid`, payload);
      return booked_sessions;
    });
    const meeting_events = await Promise.all(meet_promises);
    await update_meetings_info({
      meeting_events: meeting_events,
      meetings_info: ses_with_ints.map((s) => ({
        id: s.meeting_id,
        session_id: s.session_id,
      })),
    });
    return meeting_events;
  };

  const promises = candidate_plan.map(async (day_plan) => {
    return await bookDayPlan({
      day_plan,
    });
  });

  const session_meetings = await Promise.all(promises);

  return session_meetings;
};

export const update_meetings_info = async ({
  meeting_events,
  meetings_info,
}: {
  meeting_events: {
    session_id: string;
    cal_event: CalendarEvent;
  }[];
  meetings_info: { id: string; session_id }[];
}) => {
  const updateMeetingInfo = async ({
    cal_event,
    session_id,
  }: {
    session_id: string;
    cal_event: CalendarEvent;
  }) => {
    let meeting_link = '';
    if (cal_event.conferenceData.conferenceSolution.name === 'zoom') {
      meeting_link = cal_event.conferenceData.entryPoints[0].uri;
    } else {
      meeting_link = cal_event.hangoutLink;
    }
    const meeting = meetings_info.find((m) => m.session_id === session_id);
    return supabaseWrap(
      await supabaseAdmin
        .from('interview_meeting')
        .update({
          end_time: cal_event.end.dateTime,
          start_time: cal_event.start.dateTime,
          meeting_json: cal_event,
          cal_event_id: cal_event.id,
          meeting_link: meeting_link,
          status: 'confirmed',
          confirmed_date: dayjs().toISOString(),
        })
        .eq('id', meeting.id)
        .select(),
    );
  };

  const meetdb_promises = meeting_events.map(
    async (m) =>
      await updateMeetingInfo({
        session_id: m.session_id,
        cal_event: m.cal_event,
      }),
  );
  return await Promise.all(meetdb_promises);
};

export const saveEventsStatusInSchedule = async ({
  api_status,
  schedule_id,
  error_msg = null,
}: {
  schedule_id: string;
  api_status: 'sucess' | 'started' | 'not_started' | 'failed';
  error_msg?: string | null;
}) => {
  supabaseWrap(
    await supabaseAdmin
      .from('interview_schedule')
      .update({
        calender_event_api_status: {
          api_status,
          error_msg,
        },
      })
      .eq('id', schedule_id),
  );
};
