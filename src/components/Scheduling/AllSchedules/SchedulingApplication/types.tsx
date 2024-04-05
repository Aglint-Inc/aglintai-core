import { ResumeJson } from '@/src/pages/api/resumeScoring/types';
import { supabase } from '@/src/utils/supabase/client';

import { fetchInterviewDataJob } from './hooks';

export async function getApplicationSchedule({
  application_id,
}: {
  application_id: string;
}) {
  const res = await supabase
    .from('applications')
    .select(
      '*, public_jobs(id,job_title,location,recruiter_id),candidates(*),candidate_files(id,file_url,candidate_id,resume_json,type)',
    )
    .eq('id', application_id);
  if (res.error) throw res.error.message;

  return res.data[0];
}

export type ResultType = Awaited<ReturnType<typeof getApplicationSchedule>>;

export type SelectedApplicationTypeDB = ResultType & {
  candidate_files: ResultType['candidate_files'] & {
    resume_json: ResumeJson | null;
  };
};

export type SessionsType =
  ReturnType<typeof fetchInterviewDataJob> extends Promise<infer T>
    ? T extends { sessions: infer S }
      ? S
      : never
    : never;
