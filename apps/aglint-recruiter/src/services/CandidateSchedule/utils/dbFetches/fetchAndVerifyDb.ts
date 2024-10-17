import {
  type InterviewerMeetingScheduled,
  type InterviewModuleType,
  type InterviewSession,
  type SchedulingSettingType,
  type SessionInterviewerType,
} from '@aglint/shared-types';
import { CApiError } from '@aglint/shared-utils';

import { getSupabaseServer } from '@/utils/supabase/supabaseAdmin';

import {
  type ScheduleApiDetails,
  type ScheduleDBDetailsParams,
} from '../../types';

export const fetchAndVerifyDb = async (
  params: ScheduleDBDetailsParams,
  meeting_details_dates: ScheduleApiDetails['schedule_dates'] | null,
) => {
  const supabaseAdmin = getSupabaseServer();

  const r = (
    await supabaseAdmin.rpc('get_interview_session_data', {
      session_ids: params.session_ids,
      company_id: params.company_id,
      meet_start_date: meeting_details_dates
        ? meeting_details_dates.user_start_date_js.subtract(7, 'days').format()
        : undefined,
      meet_end_date: meeting_details_dates
        ? meeting_details_dates.user_end_date_js.add(7, 'days').format()
        : undefined,
    })
  ).data as any;

  const db_resp = {
    comp_schedule_setting: (r[0].comp_schedule_setting ??
      null) as unknown as SchedulingSettingType,
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
  const all_ints = db_resp.inter_data.filter((i) => Boolean(i)).flat();
  for (const int_sess of db_resp.interview_sessions) {
    if (!all_ints.find((int) => int.session_id === int_sess.id)) {
      throw new CApiError(
        'CLIENT',
        `${int_sess.name} does not contain interviewers`,
      );
    }
  }
  return db_resp;
};
