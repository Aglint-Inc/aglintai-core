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

import { DatabaseTable, DB } from '@aglint/shared-types';
import { SessionsCombType } from '@aglint/shared-types';

const supabase = createClient<DB>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

export type BodyParamsCandidateInvite = {
  application_id: string;
  filter_id: string;
  user_tz: string;
};

export type ApiResponseCandidateInvite = {
  job: Awaited<ReturnType<typeof getScheduleDetails>>['public_jobs'];
  candidate: Awaited<ReturnType<typeof getScheduleDetails>>['candidates'];
  filter_json: DatabaseTable['interview_filter_json'];
  recruiter: Awaited<
    ReturnType<typeof getScheduleDetails>
  >['candidates']['recruiter'];
  meetings: Awaited<
    ReturnType<typeof getInterviewSessionsMeetings>
  >['resMeetings'];
  application_id: string;
};

export type ApiResponseAllSlots = SessionsCombType[][][];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { filter_id, application_id, user_tz } =
      req.body as BodyParamsCandidateInvite;

    if (!filter_id || !application_id || !user_tz) {
      throw new Error('Invalid request');
    }

    const schedule = await getScheduleDetails(application_id, filter_id);

    const filterJson = schedule.interview_filter_json[0];

    const recruiter = schedule.candidates.recruiter;

    const { resMeetings } = await getInterviewSessionsMeetings(
      filterJson.session_ids,
    );

    const redRes: ApiResponseCandidateInvite = {
      job: schedule.public_jobs,
      application_id,
      candidate: schedule.candidates,
      filter_json: filterJson,
      recruiter: recruiter,
      meetings: resMeetings,
    };

    return res.status(200).json({
      ...redRes,
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
};

export default handler;

export interface DateRangeCandidateInvite {
  start_date: dayjs.Dayjs;
  end_date: dayjs.Dayjs | null;
}

const getScheduleDetails = async (
  application_id: string,
  filter_id: string,
) => {
  const { data: sch, error: errSch } = await supabase
    .from('applications')
    .select(
      '*, public_jobs(id,job_title,recruiter_id),candidates(*,recruiter(id,logo,name)),candidate_files(id,file_url,candidate_id,resume_json,type),interview_filter_json(*)',
    )
    .eq('id', application_id)
    .eq('interview_filter_json.id', filter_id)
    .single();

  if (errSch) throw new Error(errSch.message);

  if (!sch) {
    throw new Error('Schedule not found.');
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
