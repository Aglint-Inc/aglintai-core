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
import { CandidatesScheduling } from '@/src/services/CandidateSchedule/CandidateSchedule';
import { userTzDayjs } from '@/src/services/CandidateSchedule/utils/userTzDayjs';

import { EmailTemplateFiller } from '../emailTemplate/EmailTemplateFiller';
import { fetchCompEmailTemplate } from '../emailTemplate/fetchCompEmailTemplate';
import { assignCandidateSlot } from '../scheduling_v2/assignCandidateSlot';
import { updateTrainingStatus } from '../scheduling_v2/update_training_status';
import { supabaseAdmin } from '../supabase/supabaseAdmin';
import { bookSession, Interviewer } from './book_session';
import { fetchMeetingsInfo } from './fetchMeetingsInfo';
import { getCalEventDescription } from './getCalEventDescription';

export const bookCandidatePlan = async (req_body: APICandidateConfirmSlot) => {
  let { candidate_plan, recruiter_id, user_tz, is_debreif } = req_body;
  const all_sess_ids: string[] = candidate_plan.reduce((tot, curr) => {
    return [...tot, ...curr.sessions.map((s) => s.session_id)];
  }, []);

  const first_day_slot = candidate_plan[0].sessions;
  const last_day_slot = candidate_plan[candidate_plan.length - 1].sessions;
  const cand_scheduling = new CandidatesScheduling(
    {
      company_id: recruiter_id,
      session_ids: all_sess_ids,
      user_tz,
    },
    {
      start_date_js: userTzDayjs(first_day_slot[0].start_time)
        .tz(user_tz)
        .startOf('day'),
      end_date_js: userTzDayjs(last_day_slot[0].start_time)
        .tz(user_tz)
        .endOf('day'),
    },
  );
  await cand_scheduling.fetchDetails();
  await cand_scheduling.fetchInterviewrsCalEvents();
  const { company_cred, ses_with_ints } = cand_scheduling.db_details;
  const meetings_info = await fetchMeetingsInfo(
    ses_with_ints.map((s) => s.meeting_id),
  );
  const comp_details = await fetchCompEmailTemplate(recruiter_id);
  const temp_filler = new EmailTemplateFiller(comp_details.template);
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
      const organizer = meetings_info.find(
        (m) => m.meeting_id === session.meeting_id,
      );
      const all_inters = [
        ...session.qualifiedIntervs,
        ...session.trainingIntervs,
      ].filter((int) => int.user_id !== organizer.organizer_id);

      let meeting_attendees: Interviewer[] = all_inters.map((attendee) => ({
        email: attendee.email,
        schedule_auth: attendee.schedule_auth,
        user_id: attendee.user_id,
      }));

      const training_ints = session.trainingIntervs;
      const booked_sessions = await bookSession({
        company_cred,
        company_id: recruiter_id,
        duration: session.duration,
        start_time: session.start_time,
        end_time: session.end_time,
        interviewers: meeting_attendees,
        meet_type: session.schedule_type,
        organizer: {
          email: organizer.meeting_organizer_email,
          schedule_auth: organizer.meeting_organizer_auth,
          timezone: organizer.scheduling_settings.timeZone.tzCode,
          user_id: organizer.organizer_id,
        },
        schedule_name: session.session_name,
        session_id: session.session_id,
        description: getCalEventDescription(session.meeting_id),
      });

      // assisgn training status shadow or rShadow to ints
      if (training_ints.length > 0) {
        updateTrainingStatus({
          training_ints: training_ints.map((i) => ({
            interviewer_module_relation_id: i.interview_module_relation_id,
            session_id: i.session_id,
          })),
        });
      }

      await confirmInterviewers(all_inters);
      const temp = temp_filler.fillEmail('confirmation_mail_to_organizer', {
        '[companyName]': comp_details.company_name,
        '[firstName]': req_body.candidate_name,
        '[meetingLink]': `${process.env.NEXT_PUBLIC_HOST_NAME}/view?meeting_id=${session.meeting_id}&tab=candidate_details`,
        '[recruiterName]': organizer.meeting_organizer_email,
      });
      const payload: APISendgridPayload = {
        email: organizer.meeting_organizer_email,
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
