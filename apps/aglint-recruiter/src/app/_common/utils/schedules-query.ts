import { type QueryData } from '@supabase/supabase-js';

import { supabase } from '@/utils/supabase/client';

export const schedulesSupabase = (db = supabase) =>
  db
    .from('meeting_details')
    .select(
      '*,applications!inner(candidates!inner(first_name,last_name)), public_jobs!inner(id,job_title), meeting_interviewers!public_interview_session_meeting_id_fkey(*)',
    );

export type SchedulesSupabase = QueryData<ReturnType<typeof schedulesSupabase>>;

export function transformDataSchedules(inputData: SchedulesSupabase) {
  const transformedData: { [key: string]: SchedulesSupabase } = {};

  inputData?.forEach((item) => {
    const date = item.start_time?.split('T')[0]; // Extracting date from start_time
    if (!transformedData[String(date)]) {
      transformedData[String(date)] = [];
    }
    transformedData[String(date)].push(item);
  });

  const result: { [key: string]: SchedulesSupabase }[] = [];
  for (const date in transformedData) {
    result.push({ [date]: transformedData[String(date)] });
  }

  const resultSorted = result.sort((a, b) => {
    const dateA = Object.keys(a)[0];
    const dateB = Object.keys(b)[0];
    return (new Date(dateA) as any) - (new Date(dateB) as any);
  });

  return resultSorted;
}
