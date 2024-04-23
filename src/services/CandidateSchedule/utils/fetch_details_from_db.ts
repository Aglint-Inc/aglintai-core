import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { InterviewModuleType, InterviewSession } from '@/src/types/data.types';
import { schedulingSettingType } from '@/src/types/scheduleTypes/scheduleSetting';
import { CompServiceKeyCred } from '@/src/types/scheduleTypes/types2';
import { decrypt_string } from '@/src/utils/integrations/crypt-funcs';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

import {
  InterviewerMeetingScheduled,
  InterviewSessionApiType,
  SessionInterviewerType,
} from '../../../types/scheduleTypes/types';
import { userTzDayjs } from './userTzDayjs';

export type UserMeetingDetails = {
  meeting_date: string;
  meeting_duration: number;
  meeting_cnt: number;
};

export const fetch_details_from_db = async (
  session_ids: string[],
  company_id: string,
  meeting_date?: {
    start: string;
    end: string;
  },
) => {
  const getUniqueInts = (ints: SessionInterviewerType[]) => {
    let mp = new Map();

    for (let int of ints) {
      if (!mp.get(int.user_id)) mp.set(int.user_id, int);
    }

    return [...mp.values()] as SessionInterviewerType[];
  };

  const r = supabaseWrap(
    await supabaseAdmin.rpc('upd_get_interview_session_data', {
      session_ids: session_ids,
      company_id,
      meet_start_date: meeting_date?.start ?? null,
      meet_end_date: meeting_date?.end ?? null,
    }),
  );

  if (r.length === 0) throw new Error('Invalid plan_id');
  let company_cred: CompServiceKeyCred = null;
  if (r[0].service_cred) {
    company_cred = JSON.parse(decrypt_string(r[0].service_cred));
  }
  const interview_sessions = r[0].interview_sessions as InterviewSession[];
  let inter_data = r[0].interviewers as unknown as SessionInterviewerType[][];
  let int_modules_data = r[0]
    .interview_modules as unknown as InterviewModuleType[][];

  let comp_schedule_setting = r[0]
    .comp_schedule_setting as unknown as schedulingSettingType;

  let int_meetings = r[0].int_meetings as InterviewerMeetingScheduled[];
  let interviewers: SessionInterviewerType[] = inter_data
    .filter(Boolean)
    .reduce((tot, curr) => {
      return [...tot, ...curr];
    }, []);
  const int_modules: InterviewModuleType[] = int_modules_data
    .filter(Boolean)
    .reduce((tot, curr) => {
      return [...tot, ...curr];
    }, []);

  const ses_with_ints: InterviewSessionApiType[] = interview_sessions
    .map((s) => {
      let session: InterviewSessionApiType = {
        ...s,
        duration: s.session_duration,
        schedule_type: s.schedule_type,
        session_type: s.session_type,
        session_id: s.id,
        session_name: s.name,
        break_duration: s.break_duration,
        module_id: s.module_id,
        module_name: int_modules.find((m) => m.id === s.module_id)?.name,
        interviewer_cnt: s.interviewer_cnt,
        session_order: s.session_order,
        qualifiedIntervs: interviewers.filter(
          (i) => i.session_id === s.id && i.interviewer_type === 'qualified',
        ),
        trainingIntervs: interviewers.filter(
          (i) => i.session_id === s.id && i.interviewer_type === 'training',
        ),
      };
      return session;
    })
    .sort((s1, s2) => s1.session_order - s2.session_order);

  // interviewer meeting info
  const getInterviewersMeetings = () => {
    const ints_schd_meetings = new Map<string, UserMeetingDetails[]>();
    interviewers.forEach((int) => {
      if (!ints_schd_meetings.get(int.user_id)) {
        let current_day = userTzDayjs(meeting_date.start)
          .tz(int.scheduling_settings.timeZone.tzCode)
          .startOf('day');
        const end_day = userTzDayjs(meeting_date.end).tz(
          int.scheduling_settings.timeZone.tzCode,
        );
        let meeting_details: UserMeetingDetails[] = [];
        while (current_day.isSameOrBefore(end_day, 'day')) {
          const meeting_day: UserMeetingDetails = {
            meeting_cnt: int_meetings.filter((i) => {
              let isSameDate = false;
              if (
                userTzDayjs(i.meeting_start_time)
                  .tz(int.scheduling_settings.timeZone.tzCode)
                  .isSame(current_day, 'day')
              ) {
                isSameDate = true;
              }
              return isSameDate && i.interv_user_id === int.user_id;
            }).length,
            meeting_date: current_day.format(),
            meeting_duration: int_meetings
              .filter((i) => {
                let isSameDate = false;
                if (
                  userTzDayjs(i.meeting_start_time)
                    .tz(int.scheduling_settings.timeZone.tzCode)
                    .isSame(current_day, 'day')
                ) {
                  isSameDate = true;
                }
                return isSameDate && i.interv_user_id === int.user_id;
              })
              .reduce((sum, curr) => {
                return sum + curr.meeting_duration;
              }, 0),
          };
          meeting_details.push(meeting_day);
          current_day = current_day.add(1, 'day');
        }
        ints_schd_meetings.set(int.email, meeting_details);
      }
    });

    return ints_schd_meetings;
  };

  const ints_schd_meetings = getInterviewersMeetings();

  return {
    company_cred,
    ses_with_ints,
    all_inters: getUniqueInts(interviewers),
    comp_schedule_setting,
    int_meetings,
    ints_schd_meetings,
  };
};
