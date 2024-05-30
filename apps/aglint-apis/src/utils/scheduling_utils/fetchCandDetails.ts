import axios from 'axios';
import dayjs, {Dayjs} from 'dayjs';
import {
  supabaseWrap,
  supabaseAdmin,
} from '../../services/supabase/SupabaseAdmin';
import {
  CandidateInfoType,
  schedule_req_body,
} from '../../types/app_types/scheduleAgentTypes';
import {getFullName} from '../getFullName';
import {
  APIFindSlotsDateRange,
  CandidateType,
  InterviewFilterJsonType,
  InterviewMeetingTypeDb,
  InterviewScheduleTypeDB,
  InterviewSessionTypeDB,
  JobApplcationDB,
  PublicJobsType,
  RecruiterType,
  SessionsCombType,
  schedulingSettingType,
} from '@aglint/shared-types';
import {SINGLE_DAY_TIME} from '@aglint/shared-utils';
import {envConfig} from '../../config';
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);
export const fetchCandidateDetails = async (
  req_body: unknown
): Promise<CandidateInfoType> => {
  const req_payload = schedule_req_body.parse(req_body);
  const [cand_rec] = supabaseWrap(
    await supabaseAdmin
      .from('interview_filter_json')
      .select(
        '* ,interview_schedule(id,application_id, applications(*,public_jobs(id,recruiter_id,logo,job_title,company,overview,description,recruiter!public_jobs_recruiter_id_fkey(scheduling_settings)), candidates(*)))'
      )
      .eq('id', req_payload.filter_json_id)
  );

  if (!cand_rec) {
    throw new Error('invalid filter id');
  }
  const cand_basic_info = cand_rec.interview_schedule.applications.candidates;
  const job = cand_rec.interview_schedule.applications.public_jobs;
  const filter_json = cand_rec.filter_json as CandidateInfoType['filter_json'];

  const promises = [
    (async () => {
      const sessions = supabaseWrap(
        await supabaseAdmin
          .from('interview_session')
          .select('*, interview_meeting(*)')
          .in('id', filter_json.session_ids)
      );
      const meetings = sessions.map(r => r.interview_meeting);
      return [sessions, meetings];
    })(),
    (async () => {
      // TODO: need to adjust dates
      const all_slots = await getallSlotsInDateRange({
        candidate_tz: 'Asia/colombo', // default time zone
        session_ids: filter_json.session_ids,
        start_date_str: filter_json.end_date,
        end_date_str: filter_json.start_date,
        recruiter_id: filter_json.recruiter_id,
      });
      return all_slots;
    })(),
  ];
  const [[int_sessions, interview_meetings], all_slots] = (await Promise.all(
    promises
  )) as [
    [InterviewSessionTypeDB[], InterviewMeetingTypeDb[]],
    SessionsCombType[][][],
  ];

  const begin_message = req_payload.begin_sentence_template
    .replace(
      '{candidate_name}',
      getFullName(cand_basic_info.first_name, cand_basic_info.last_name)
    )
    .replace('{recruiter_user_name}', req_payload.interviewer_name)
    .replace('{company_name}', job.company)
    .replace('{job_role}', job.job_title);
  if (!interview_meetings || interview_meetings.length === 0) {
    throw new Error('meeting not found');
  }

  const book_status = interview_meetings[0].status;
  // const book_status = 'waiting';
  const allowed_status: CandidateInfoType['schedule_status'][] = [
    'cancelled',
    'confirmed',
    'waiting',
  ];
  if (!allowed_status.find(s => s === book_status)) {
    throw new Error('interview Not scheduled');
  }

  const cand_info: CandidateInfoType = {
    begin_message,
    application_id: cand_rec.interview_schedule.application_id,
    candidate_id: cand_rec.interview_schedule.applications.candidates.id,
    filter_json: filter_json,
    schedule_id: cand_rec.interview_schedule.id,
    candidate_name: getFullName(
      cand_basic_info.first_name,
      cand_basic_info.last_name
    ),
    company_id: job.recruiter_id,
    company_logo: job.logo,
    company_name: job.company,
    job_title: job.job_title,
    req_payload: req_payload,
    job_id: job.id,
    interview_sessions: int_sessions,
    inter_dur_days: countInteviewDays(int_sessions),
    schedule_status: book_status as CandidateInfoType['schedule_status'],
    interview_meetings,
    tool_invocations: [],
    job_description: job.overview,
    comp_scheduling_setting: job.recruiter
      .scheduling_settings as schedulingSettingType,
    all_slots,
    candidate_tz: {
      tz_code: '',
      tz_label: '',
    },
    cand_selected_slot: '',
  };

  return cand_info;
};

type CandidateScheduleDetails = InterviewFilterJsonType & {
  interview_schedule: Pick<InterviewScheduleTypeDB, 'id' | 'application_id'> & {
    applications: Pick<JobApplcationDB, 'id'> & {
      candidates: Pick<
        CandidateType,
        'first_name' | 'last_name' | 'email' | 'id'
      >;
      public_jobs: Pick<
        PublicJobsType,
        | 'recruiter_id'
        | 'company'
        | 'id'
        | 'logo'
        | 'job_title'
        | 'description'
        | 'overview'
      > & {
        recruiter: Pick<RecruiterType, 'scheduling_settings'>;
      };
    };
  };
};

export const isCurrDayHoliday = (
  comp_schedule_setting: any,
  curr_day: Dayjs
) => {
  // is curr day holiday
  if (
    comp_schedule_setting.totalDaysOff.find((holiday: any) =>
      curr_day.isSame(dayjs(holiday.date, 'DD MMM YYYY'), 'day')
    )
  ) {
    return true;
  }
  const work_day = comp_schedule_setting.workingHours.find(
    (day: any) => curr_day.format('dddd').toLowerCase() === day.day
  );
  // is day week off
  if (!work_day.isWorkDay) {
    // console.log('not working day');
    return true;
  }
  return false;
};

const countInteviewDays = (sessions: InterviewSessionTypeDB[]) => {
  let count = 0;
  sessions
    .sort((s1, s2) => s1.session_order - s2.session_order)
    .slice(1, -1)
    .forEach(s => {
      const day_break_cnt = Math.floor(s.break_duration / SINGLE_DAY_TIME);
      if (Math.floor(s.break_duration / SINGLE_DAY_TIME) > 0) {
        count += day_break_cnt;
      }
    });
  return count;
};

const getallSlotsInDateRange = async (payload: APIFindSlotsDateRange) => {
  // console.log(envConfig);
  const {data} = await axios.post(
    `${envConfig.CLIENT_APP_URL}/api/scheduling/v1/find_slots_date_range`,
    payload
  );

  return data as SessionsCombType[][][];
};
