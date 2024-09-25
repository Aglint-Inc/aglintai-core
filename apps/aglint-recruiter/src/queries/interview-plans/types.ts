import { type DB } from '@aglint/shared-types';

import { type GetInterviewPlansType } from '@/pages/api/scheduling/get_interview_plans';

export type InterviewPlansType = GetInterviewPlansType['respone'];

export type InterviewSessionType =
  InterviewPlansType[number]['interview_session'][number];
export type InterviewSessionRelationType =
  InterviewPlansType[number]['interview_session'][number]['interview_session_relation'];

export type InterviewSessionUpdate =
  DB['public']['Tables']['interview_session']['Update'];
