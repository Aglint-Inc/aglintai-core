import { type DatabaseTable } from '@aglint/shared-types';

import { type CustomType } from '../scheduling-dashboard/types';
import { type getInterviewModulesAPI } from '.';

export type InterviewModulesType = CustomType<
  Awaited<ReturnType<typeof getInterviewModulesAPI>>,
  { settings: DatabaseTable['interview_module']['settings'] }
>;
