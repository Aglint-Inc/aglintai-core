import {
  AllSessionIntDetails,
  CompServiceKeyCred,
  InterviewerMeetingScheduled,
  InterviewModuleType,
  InterviewSession,
  InterviewSessionApiRespType,
  InterviewSessionApiType,
  schedulingSettingType,
  SessionInterviewerApiRespType,
  SessionInterviewerType,
} from '@aglint/shared-types';

import { supabaseWrap } from '@/src/components/JobsDashboard/JobPostCreateUpdate/utils';
import { decrypt_string } from '@/src/utils/integrations/crypt-funcs';
import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

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
  //
  const getUniqueInts = (ints: SessionInterviewerType[]) => {
    let mp = new Map();

    for (let int of ints) {
      if (!mp.get(int.user_id)) mp.set(int.user_id, int);
    }

    return [...mp.values()] as SessionInterviewerType[];
  };

  const fetchAndVerifyDb = async () => {
    const r = supabaseWrap(
      await supabaseAdmin.rpc('get_interview_session_data', {
        session_ids: session_ids,
        company_id,
        meet_start_date: null,
        meet_end_date: null,
      }),
    );

    if (!r[0]?.interview_sessions || !r[0]?.interview_modules) {
      throw new Error('invalid payload');
    }
    if (!r[0]?.comp_schedule_setting) {
      throw new Error('Invalid Company id');
    }

    return {
      comp_schedule_setting: r[0]
        .comp_schedule_setting as unknown as schedulingSettingType,

      int_meetings: r[0].int_meetings as InterviewerMeetingScheduled[],
      int_modules_data: r[0]
        .interview_modules as unknown as InterviewModuleType[][],
      interview_sessions: r[0].interview_sessions as InterviewSession[],
      inter_data: r[0].interviewers as unknown as SessionInterviewerType[][],
      company_cred: r[0].service_cred
        ? (JSON.parse(decrypt_string(r[0].service_cred)) as CompServiceKeyCred)
        : null,
    };
  };

  const {
    comp_schedule_setting,
    int_meetings,
    int_modules_data,
    inter_data,
    interview_sessions,
    company_cred,
  } = await fetchAndVerifyDb();

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

  const db_ses_with_ints: InterviewSessionApiType[] = interview_sessions
    .map((s) => {
      let session: InterviewSessionApiType = {
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
        location: s.location,
        meeting_id: s.meeting_id,
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

  const getAllSessionIntDetails = () => {
    const all_session_int_detail: AllSessionIntDetails = {};
    db_ses_with_ints.forEach((s) => {
      all_session_int_detail[s.session_id] = {
        break_duration: s.break_duration,
        duration: s.duration,
        interviewer_cnt: s.interviewer_cnt,
        interviewers: {},
        location: s.location,
        meeting_id: s.meeting_id,
        module_id: s.module_id,
        module_name: s.module_name,
        schedule_type: s.schedule_type,
        session_id: s.session_id,
        session_name: s.session_name,
        session_order: s.session_order,
        session_type: s.session_type,
      };
      const all_ints = [...s.qualifiedIntervs, ...s.trainingIntervs];
      all_ints.forEach((int) => {
        all_session_int_detail[s.session_id].interviewers[int.user_id] = {
          email: int.email,
          first_name: int.first_name,
          interview_module_relation_id: int.interview_module_relation_id,
          interviewer_type: int.interviewer_type,
          last_name: int.last_name,
          pause_json: int.pause_json,
          profile_image: int.profile_image,
          schedule_auth: int.schedule_auth,
          scheduling_settings: int.scheduling_settings,
          session_id: int.session_id,
          training_type: int.training_type,
          user_id: int.user_id,
          position: int.position,
          int_tz: int.int_tz,
        };
      });
    });
    return all_session_int_detail;
  };
  const api_sess_ints: InterviewSessionApiRespType[] = db_ses_with_ints.map(
    (s) => ({
      break_duration: s.break_duration,
      duration: s.duration,
      interviewer_cnt: s.interviewer_cnt,
      location: s.location,
      meeting_id: s.meeting_id,
      module_name: s.module_name,
      trainingIntervs: s.trainingIntervs.map(mapInt),
      qualifiedIntervs: s.qualifiedIntervs.map(mapInt),
      schedule_type: s.schedule_type,
      session_id: s.session_id,
      session_name: s.session_name,
      session_order: s.session_order,
      session_type: s.session_type,
    }),
  );

  return {
    company_cred,
    api_sess_ints,
    all_inters: getUniqueInts(interviewers),
    comp_schedule_setting,
    int_meetings,
    ints_schd_meetings,
    all_session_int_details: getAllSessionIntDetails(),
  };
};

const mapInt = (i: SessionInterviewerType) => {
  const int: SessionInterviewerApiRespType = {
    email: i.email,
    first_name: i.first_name,
    interview_module_relation_id: i.interview_module_relation_id,
    interviewer_type: i.interviewer_type,
    last_name: i.last_name,
    profile_image: i.profile_image,
    training_type: i.training_type,
    user_id: i.user_id,
    position: i.position,
    int_tz: i.int_tz,
  };
  return int;
};
