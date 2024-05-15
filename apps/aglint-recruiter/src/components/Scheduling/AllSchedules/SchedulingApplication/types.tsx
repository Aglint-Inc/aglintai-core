import { Candidate } from '@aglint/shared-types';
import {
  InterviewMeetingTypeDb,
  InterviewModuleRelationType,
  InterviewModuleType,
  InterviewSessionRelationTypeDB,
  InterviewSessionTypeDB,
  JobApplcationDB,
} from '@aglint/shared-types';

import { ResumeJson } from '@/src/apiUtils/resumeScoring/types';
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

export type ApplicationDataResponseType = {
  application: JobApplcationDB;
  candidate_files: {
    id: string;
    file_url: string;
    candidate_id: string;
    resume_json: any;
    type: string;
  };
  public_jobs: {
    id: string;
    job_title: string;
    location: string;
    recruiter_id: string;
  };
  candidate: Candidate;
};

export type InterviewDataResponseType = {
  interview_module: InterviewModuleType | null;
  interview_session: InterviewSessionTypeDB;
  interview_meeting: InterviewMeetingTypeDb | null;
  interview_session_relations: {
    session_id: string;
    interview_module_relation: {
      debrief_user: {
        user_id: string;
        first_name: string;
        last_name: string;
        email: string;
        profile_image: string;
        position: string;
      } | null;
      recruiter_user: {
        user_id: string;
        first_name: string;
        last_name: string;
        email: string;
        profile_image: string;
        position: string;
      } | null;
      interview_module_relation: InterviewModuleRelationType | null;
      interview_session_relation: InterviewSessionRelationTypeDB;
    }[];
  };
};
