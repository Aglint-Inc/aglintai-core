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

import { Database } from '@/src/types/schema';

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { data: sch, error: errSch } = await supabase
      .from('interview_schedule')
      .select('*')
      .eq('id', req.body.id as string);

    if (errSch) throw new Error(errSch.message);

    const { data: filterJson, error: errFilterJson } = await supabase
      .from('interview_filter_json')
      .select('*')
      .eq('id', req.body.filter_id as string);

    if (errFilterJson) throw new Error(errFilterJson.message);

    const { data: app } = await supabase
      .from('applications')
      .select(
        '*, public_jobs(id,job_title,location,recruiter_id),candidates(*),candidate_files(id,file_url,candidate_id,resume_json,type)',
      )
      .eq('id', sch[0].application_id);

    const application = app[0];

    const { data: rec } = await supabase
      .from('recruiter')
      .select('id,logo,name')
      .eq('id', application.public_jobs.recruiter_id);

    

    const filterJsonTyped = filterJson[0]
      .filter_json as unknown as FilterJsonDateRangeCandidateInvite;

    const { data: intSes, error: errSes } = await supabase
      .from('interview_session')
      .select('*')
      .in('id', filterJsonTyped.session_ids);

    if (errSes) throw new Error(errSes.message);

    const maxBreakDuration = Math.max(
      intSes.reduce((acc, curr) => Math.max(acc, curr.break_duration), 0),
    );

    const possibleDateRange = getDateRange(filterJsonTyped, maxBreakDuration);

    const { data: intMeet, error: errMeet } = await supabase
      .from('interview_meeting')
      .select('*')
      .in('session_id', filterJsonTyped.session_ids);

    const resMeetings = intSes.map((session) => ({
      interview_session: session,
      interview_meeting: intMeet.filter(
        (meeting) => meeting.session_id === session.id,
      ),
    }));

    if (errMeet) throw new Error(errMeet.message);

    return res.status(200).json({
      job: application.public_jobs,
      schedule: sch[0],
      dateRange: possibleDateRange,
      candidate: application.candidates,
      recruiter: rec[0],
      meetings: resMeetings,
      numberOfDays: Math.ceil(maxBreakDuration / 1440),
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default handler;

export interface DateRangeCandidateInvite {
  start_date: string;
  end_date: string | null;
}

interface FilterJsonDateRangeCandidateInvite {
  user_tz: string;
  start_date: string;
  end_date: string;
  session_ids: string[];
  recruiter_id: string;
}

function getDateRange(
  input: FilterJsonDateRangeCandidateInvite,
  durationInMinutes: number,
): DateRangeCandidateInvite[] {
  const { start_date, end_date, user_tz } = input;

  // Parse start and end dates using Day.js
  const startDate = dayjs(start_date, 'DD/MM/YYYY').tz(user_tz);

  // Calculate the number of days between the start and end dates
  const numberOfDays = dayjs(end_date, 'DD/MM/YYYY').diff(startDate, 'day') + 1;

  // Create an array to store date ranges
  const dateRanges: DateRangeCandidateInvite[] = [];

  // If duration is less than or equal to 1 day
  if (durationInMinutes < 1440) {
    for (let i = 0; i < numberOfDays; i++) {
      const currentDate = startDate.add(i, 'day').format('DD/MM/YYYY');
      dateRanges.push({ start_date: currentDate, end_date: null });
    }
  } else {
    // If duration is greater than 1 day
    for (let i = 0; i < numberOfDays - 1; i++) {
      const currentStartDate = startDate.add(i, 'day').format('DD/MM/YYYY');
      const currentEndDate = startDate.add(i + 1, 'day').format('DD/MM/YYYY');
      dateRanges.push({
        start_date: currentStartDate,
        end_date: currentEndDate,
      });
    }
  }

  return dateRanges;
}
