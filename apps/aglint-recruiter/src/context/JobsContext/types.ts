// import { InterviewPlanScheduleDbType } from '@/src/components/JobInterviewPlan/types';

import { JobApplicationSections } from '../JobApplicationsContext/types';
// import { Assessment } from '@/src/queries/assessment/types';
import useJobActions from './hooks';

export type JobContext = ReturnType<typeof useJobActions>;
// eslint-disable-next-line no-unused-vars
export type CountJobs = { [key in JobApplicationSections]?: number };

export type InterviewPlan = any; //update or delete this line once new interview plan is implemented
