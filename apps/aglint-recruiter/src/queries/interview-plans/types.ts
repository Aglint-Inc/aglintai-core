import { DB } from '@aglint/shared-types';

import { getInterviewPlansAPI } from '.';

export type InterviewPlansType = Awaited<
  ReturnType<typeof getInterviewPlansAPI>
>;

export type InterviewSessionType =
  InterviewPlansType['interview_session'][number];
export type InterviewSessionRelationType =
  InterviewPlansType['interview_session'][number]['interview_session_relation'];

export type AddCompanyMember = {
  plan_id: string;
};

export type InterviewSessionUpdate =
  DB['public']['Tables']['interview_session']['Update'];
