import {
  Candidate,
  DatabaseTable,
  DateRangePlansType,
  InterviewModuleType,
  JobApplcationDB,
} from '@aglint/shared-types';

import { ResumeJson } from '@/src/apiUtils/resumeScoring/types';
import { supabase } from '@/src/utils/supabase/client';

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

export type BannerType = {
  type: 'calender' | 'paused' | 'no_interviewers';
  message: string;
  color: 'error' | 'warning' | 'info' | 'success';
  session_relation_id: string | null;
  user_id: string | null;
};

export type SessionsType = {
  banners?: BannerType[];
  interview_session: InterviewDataResponseType['interview_session'];
  interview_meeting: InterviewDataResponseType['interview_meeting'];
  interview_module: InterviewDataResponseType['interview_module'];
  users: {
    interview_session_relation: DatabaseTable['interview_session_relation'];
    interview_module_relation:
      | DatabaseTable['interview_module_relation']
      | null;
    user_details: {
      user_id: string;
      first_name: string;
      last_name: string;
      email: string;
      profile_image: string;
      position: string;
      scheduling_settings: DatabaseTable['recruiter_user']['scheduling_settings'];
      schedule_auth: DatabaseTable['recruiter_user']['schedule_auth'];
    };
  }[];
  cancel_reasons: InterviewDataResponseType['cancel_reasons'];
};

export type InterviewDataResponseType = {
  interview_module: InterviewModuleType | null;
  interview_session: DatabaseTable['interview_session'];
  interview_meeting: DatabaseTable['interview_meeting'] | null;
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
      interview_module_relation:
        | DatabaseTable['interview_module_relation']
        | null;
      interview_session_relation: DatabaseTable['interview_session_relation'];
    }[];
  };
  cancel_reasons:
    | {
        interview_session_cancel: DatabaseTable['interview_session_cancel'];
        recruiter_user: {
          first_name: string;
          last_name: string;
          user_id: string;
          profile_image: string;
          position: string;
          email: string;
        };
      }[]
    | null;
};

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
export type ApiResponseFindAvailability = DateRangePlansType[];
