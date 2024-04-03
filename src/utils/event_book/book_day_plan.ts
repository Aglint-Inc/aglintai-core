import dayjs from 'dayjs';

var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { ConfirmApiBodyParams } from '@/src/pages/api/scheduling/v1/confirm_interview_slot';

import { getFullName } from '../jsonResume';
import { CalendarEvent } from '../schedule-utils/types';
import { find_api_details } from '../scheduling_v1/find_details';
import { SessionInterviewerType } from '../scheduling_v1/types';
import { assignCandidateSlot } from '../scheduling_v2/assignCandidateSlot';
import { findInterviewersEvents } from '../scheduling_v2/findEachInterviewerFreeTimes';
import { findMultiDaySlots } from '../scheduling_v2/findMultiDaySlots';
import { supabaseAdmin } from '../supabase/supabaseAdmin';
import { bookSession } from './book_session';

export const bookCandidatePlan = async (req_body: ConfirmApiBodyParams) => {
  let {
    candidate_plan,
    recruiter_id,
    user_tz = 'Asia/colombo',
    candidate_email,
  } = req_body as ConfirmApiBodyParams;
  const all_sess_ids: string[] = candidate_plan.reduce((tot, curr) => {
    return [...tot, ...curr.sessions.map((s) => s.session_id)];
  }, []);

  const { company_cred, all_inters, ses_with_ints, comp_schedule_setting } =
    await find_api_details(all_sess_ids, recruiter_id);

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
    const confirmInterviewers = async (inters: SessionInterviewerType[]) => {
      await Promise.all(
        inters.map(async (int) => {
          if (int.interview_module_relation_id) {
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
    const intervs_details_with_events = await findInterviewersEvents(
      company_cred,
      all_inters.map((i) => ({
        email: i.email,
        interviewer_id: i.user_id,
        name: getFullName(i.first_name, i.last_name),
        profile_img: i.profile_image,
        shedule_settings: i.scheduling_settings,
        tokens: i.schedule_auth as any,
      })),
      curr_date,
      curr_date,
      user_tz,
    );
    const int_sessions = ses_with_ints.filter((si) =>
      day_plan.sessions.find((_s) => _s.session_id === si.session_id),
    );

    const plan_combs = findMultiDaySlots(
      int_sessions,
      intervs_details_with_events,
      curr_date,
      curr_date,
      user_tz,
      comp_schedule_setting,
    );
    const assisgned_slot = assignCandidateSlot(plan_combs[0], curr_date);

    const meet_promises = assisgned_slot.sessions.map(async (session) => {
      const all_inters = [
        ...session.selectedIntervs.slice(1),
        ...session.shadowIntervs,
        ...session.revShadowIntervs,
      ];
      const organizer = session.selectedIntervs[0];
      const booked_sessions = await bookSession({
        candidate_email,
        company_cred,
        company_id: recruiter_id,
        duration: session.duration,
        start_time: session.start_time,
        end_time: session.end_time,
        interviewers: all_inters,
        meet_type: session.schedule_type,
        organizer: {
          email: organizer.email,
          schedule_auth: organizer.schedule_auth,
          timezone: organizer.scheduling_settings.timeZone.tzCode,
          user_id: organizer.user_id,
        },
        schedule_name: session.session_name,
        session_id: session.session_id,
      });
      await confirmInterviewers([organizer, ...all_inters]);
      return booked_sessions;
    });

    const meeting_events = await Promise.all(meet_promises);
    await update_meetings_info({
      meeting_events: meeting_events,
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
}: {
  meeting_events: {
    session_id: string;
    cal_event: CalendarEvent;
  }[];
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
    // console.log(meeting_link);
    return supabaseWrap(
      await supabaseAdmin
        .from('interview_meeting')
        .update({
          end_time: cal_event.end.dateTime,
          start_time: cal_event.start.dateTime,
          meeting_json: cal_event,
          meeting_link: meeting_link,
          status: 'confirmed',
        })
        .eq('session_id', session_id)
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
