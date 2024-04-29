import { createClient } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { NextApiRequest, NextApiResponse } from 'next';

// Extend Day.js with necessary plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

import { SessionsCombType } from '@/src/types/scheduleTypes/types';
import { Database } from '@/src/types/schema';

import { TFilterJSON } from './mail-agent/init-agent';

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

type FilterJsonDateRangeCandidateInvite = {
  user_tz: string;
  start_date: string;
  end_date: string;
  session_ids: string[];
  recruiter_id: string;
};

export type BodyParamsCandidateInvite = {
  schedule_id: string;
  filter_id: string;
  user_tz: string;
};

export type ApiResponseCandidateInvite = {
  job: Awaited<
    ReturnType<typeof getScheduleDetails>
  >['applications']['public_jobs'];
  schedule: Awaited<ReturnType<typeof getScheduleDetails>>;
  candidate: Awaited<
    ReturnType<typeof getScheduleDetails>
  >['applications']['candidates'];
  filter_json: TFilterJSON;
  recruiter: Awaited<ReturnType<typeof getScheduleDetails>>['recruiter'];
  meetings: Awaited<
    ReturnType<typeof getInterviewSessionsMeetings>
  >['resMeetings'];
};

export type ApiResponseAllSlots = SessionsCombType[][][];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { filter_id, schedule_id, user_tz } =
      req.body as BodyParamsCandidateInvite;

    if (!filter_id || !schedule_id || !user_tz) {
      throw new Error('Invalid request');
    }

    const schedule = await getScheduleDetails(schedule_id, filter_id);

    const filterJson = schedule.interview_filter_json[0]
      .filter_json as unknown as FilterjsonType;

    const application = schedule.applications;

    const recruiter = schedule.recruiter;

    const { resMeetings } = await getInterviewSessionsMeetings(
      filterJson.session_ids,
    );

    // console.log(dateRanges);

    return res.status(200).json({
      job: application.public_jobs,
      schedule: schedule,
      candidate: application.candidates,
      filter_json: filterJson,
      recruiter: recruiter,
      meetings: resMeetings,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default handler;

export interface DateRangeCandidateInvite {
  start_date: dayjs.Dayjs;
  end_date: dayjs.Dayjs | null;
}

type FilterjsonType = {
  created_at: string;
  filter_json: FilterJsonDateRangeCandidateInvite;
  id: string;
  schedule_id: string;
  session_ids: string[];
};

const getScheduleDetails = async (schedule_id: string, filter_id: string) => {
  const { data: sch, error: errSch } = await supabase
    .from('interview_schedule')
    .select(
      '*,applications(*, public_jobs(id,job_title,location,recruiter_id),candidates(*),candidate_files(id,file_url,candidate_id,resume_json,type)),interview_filter_json(*),recruiter(id,logo,name)',
    )
    .eq('id', schedule_id)
    .eq('interview_filter_json.id', filter_id)
    .single();

  if (errSch) throw new Error(errSch.message);

  if (!sch) {
    throw new Error('Schedule not found');
  }

  return sch;
};

const getInterviewSessionsMeetings = async (session_ids: string[]) => {
  const { data: intSes, error: errSes } = await supabase
    .from('interview_session')
    .select('*,interview_meeting(*)')
    .in('id', session_ids)
    .order('session_order', {
      ascending: true,
    });

  if (errSes) throw new Error(errSes.message);

  const maxBreakDuration = Math.max(
    intSes.reduce((acc, curr) => Math.max(acc, curr.break_duration), 0),
  );

  const maxDurationInDays = Math.floor((maxBreakDuration + 1440) / 1440);

  const resMeetings = intSes.map((session) => ({
    interview_session: session,
    interview_meeting: session.interview_meeting,
  }));

  return { resMeetings, maxDurationInDays };
};
