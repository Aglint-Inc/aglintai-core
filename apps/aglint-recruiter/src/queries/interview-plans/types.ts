import { DB } from '@aglint/shared-types';

import { GetInterviewPlansType } from '@/src/pages/api/scheduling/get_interview_plans';

export type InterviewPlansType = GetInterviewPlansType['respone'];

export type InterviewSessionType =
  InterviewPlansType[number]['interview_session'][number];
export type InterviewSessionRelationType =
  InterviewPlansType[number]['interview_session'][number]['interview_session_relation'];

export type AddCompanyMember = {
  plan_id: string;
};

export type InterviewSessionUpdate =
  DB['public']['Tables']['interview_session']['Update'];
