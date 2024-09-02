import { type ModuleType } from '@/src/components/Scheduling/InterviewTypes/types';

import { type CustomType } from '../scheduling-dashboard/types';
import { type getInterviewModulesAPI } from '.';

export type InterviewModulesType = CustomType<
  Awaited<ReturnType<typeof getInterviewModulesAPI>>,
  { settings: ModuleType['settings'] }
>;
