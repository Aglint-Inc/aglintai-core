import { QueryResult } from '@supabase/supabase-js';

import { ResumeJson } from '@/src/pages/api/resumeScoring/types';
import { supabase } from '@/src/utils/supabase/client';

import { fetchInterviewData } from './hooks';

export const getApplicationSchedule = supabase
  .from('applications')
  .select(
    '*, public_jobs(id,job_title,location),candidates(*),candidate_files(id,file_url,candidate_id,resume_json,type)',
  );

export type ResultType = QueryResult<typeof getApplicationSchedule>['data'][0];

export type SelectedApplicationTypeDB = ResultType & {
  candidate_files: ResultType['candidate_files'] & {
    resume_json: ResumeJson | null;
  };
};

export type SessionsType =
  ReturnType<typeof fetchInterviewData> extends Promise<infer T>
    ? T extends { sessions: infer S }
      ? S
      : never
    : never;
