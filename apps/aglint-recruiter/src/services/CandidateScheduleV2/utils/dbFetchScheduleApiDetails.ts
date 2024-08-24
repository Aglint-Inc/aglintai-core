import {
  AllSessionIntDetails,
  InterviewerMeetingScheduled,
  InterviewModuleType,
  InterviewSession,
  InterviewSessionApiRespType,
  InterviewSessionApiType,
  schedulingSettingType,
  SessionInterviewerApiRespType,
  SessionInterviewerType,
} from '@aglint/shared-types';
import { ScheduleUtils, supabaseWrap } from '@aglint/shared-utils';
import { CApiError } from '@aglint/shared-utils/src/customApiError';

import { supabaseAdmin } from '@/src/utils/supabase/supabaseAdmin';

import { ScheduleApiDetails, ScheduleDBDetailsParams } from '../types';
import { userTzDayjs } from './userTzDayjs';

export type UserMeetingDetails = {
  [user_id: string]: {
    [week_start_time: string]: {
      [meeting_date: string]: {
        meeting_time: string;
        meeting_duration: number;
        meeting_cnt: number;
      };
    };
  };
};

export const dbFetchScheduleApiDetails = async (
  params: ScheduleDBDetailsParams,
  is_fetch_meeting_data = true,
): Promise<ScheduleApiDetails> => {
  const schedule_dates = {
    user_start_date_js: ScheduleUtils.convertDateFormatToDayjs(
      params.start_date_str,
      params.req_user_tz,
      true,
    ),
    user_end_date_js: ScheduleUtils.convertDateFormatToDayjs(
      params.end_date_str,
      params.req_user_tz,
      false,
    ),
  };
  const {
    comp_schedule_setting,
    int_meetings,
    int_modules_data,
    inter_data,
    interview_sessions,
    company_cred_hash_str,
  } = await fetchAndVerifyDb(
    params,
    is_fetch_meeting_data ? schedule_dates : undefined,
  );

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
  const all_session_int_details = getAllSessionIntDetails(db_ses_with_ints);
  const unique_inters = getUniqueInts(interviewers);
  const ints_schd_meetings = getInterviewersMeetings(
    unique_inters,
    int_meetings,
  );
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
      day_load_den: 0,
      week_load_den: 0,
    }),
  );
  return {
    req_user_tz: params.req_user_tz,
    schedule_dates: schedule_dates,
    ses_with_ints: api_sess_ints,
    company_cred_hash_str,
    all_inters: unique_inters,
    comp_schedule_setting,
    int_meetings,
    ints_schd_meetings,
    all_session_int_details: all_session_int_details,
  };
};

// utility functions
const mapInt = (i: SessionInterviewerType) => {
  const int: SessionInterviewerApiRespType = {
    id: i.session_relation_id,
    email: i.email,
    first_name: i.first_name,
    interview_module_relation_id: i.interview_module_relation_id,
    interviewer_type: i.interviewer_type,
    last_name: i.last_name,
    profile_image: i.profile_image,
    training_type: i.training_type,
    user_id: i.user_id,
    position: i.position,
    int_tz: i.scheduling_settings.timeZone.tzCode,
  };
  return int;
};

export const fetchAndVerifyDb = async (
  params: ScheduleDBDetailsParams,
  meeting_details_dates: ScheduleApiDetails['schedule_dates'],
) => {
  const r = supabaseWrap(
    await supabaseAdmin.rpc('get_interview_session_data', {
      session_ids: params.session_ids,
      company_id: params.company_id,
      meet_start_date:
        meeting_details_dates &&
        meeting_details_dates.user_start_date_js.subtract(7, 'days').format(),
      meet_end_date:
        meeting_details_dates &&
        meeting_details_dates.user_end_date_js.add(7, 'days').format(),
    }),
  );

  const db_resp = {
    comp_schedule_setting: (r[0].comp_schedule_setting ??
      null) as unknown as schedulingSettingType,
    int_meetings: (r[0].int_meetings ?? []) as InterviewerMeetingScheduled[],
    int_modules_data: (r[0].interview_modules ??
      []) as unknown as InterviewModuleType[][],
    interview_sessions: (r[0].interview_sessions ?? []) as InterviewSession[],
    inter_data: (r[0].interviewers ??
      []) as unknown as SessionInterviewerType[][],
    company_cred_hash_str: r[0].service_cred,
  };

  if (db_resp.interview_sessions.length === 0) {
    throw new CApiError('CLIENT', 'Interview Plan not set or invalid sessions');
  }
  let all_ints = db_resp.inter_data.filter((i) => Boolean(i)).flat();
  for (let int_sess of db_resp.interview_sessions) {
    if (!all_ints.find((int) => int.session_id === int_sess.id)) {
      throw new CApiError(
        'CLIENT',
        `${int_sess.name} does not contain interviewers`,
      );
    }
  }
  return db_resp;
};

const getUniqueInts = (ints: SessionInterviewerType[]) => {
  let mp = new Map();

  for (let int of ints) {
    if (!mp.get(int.user_id)) mp.set(int.user_id, int);
  }

  return [...mp.values()] as SessionInterviewerType[];
};

const getAllSessionIntDetails = (
  db_ses_with_ints: InterviewSessionApiType[],
) => {
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
        session_relation_id: int.session_relation_id,
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

const getInterviewersMeetings = (
  unique_inters: SessionInterviewerType[],
  int_meetings: InterviewerMeetingScheduled[],
) => {
  const ints_schd_meetings: UserMeetingDetails = {};
  const ints_map = new Map<string, SessionInterviewerType>();
  for (let int of unique_inters) {
    ints_map.set(int.user_id, int);
    if (!ints_schd_meetings[int.user_id]) {
      ints_schd_meetings[int.user_id] = {};
    }
  }
  int_meetings.map((meeting) => {
    const meeting_start_time = userTzDayjs(meeting.meeting_start_time).tz(
      ints_map.get(meeting.interv_user_id).scheduling_settings.timeZone.tzCode,
    );
    const meeting_date = meeting_start_time.startOf('day');
    const week_start_time = meeting_start_time.startOf('week').startOf('day');

    if (!ints_schd_meetings[meeting.interv_user_id][week_start_time.format()]) {
      ints_schd_meetings[meeting.interv_user_id][week_start_time.format()] = {};
    }
    if (
      !ints_schd_meetings[meeting.interv_user_id][week_start_time.format()][
        meeting_date.format()
      ]
    ) {
      ints_schd_meetings[meeting.interv_user_id][week_start_time.format()][
        meeting_date.format()
      ] = {
        meeting_cnt: 0,
        meeting_duration: 0,
        meeting_time: meeting_start_time.format(),
      };
    }
    const curr_day_details =
      ints_schd_meetings[meeting.interv_user_id][week_start_time.format()][
        meeting_date.format()
      ];
    curr_day_details.meeting_cnt += 1;
    curr_day_details.meeting_duration += meeting.meeting_duration;
  });
  return ints_schd_meetings;
};
