import { type ModuleType } from '@/src/components/Scheduling/Modules/types';

import { type CustomType } from '../scheduling-dashboard/types';
import { type getInterviewModules } from '.';

export type InterviewModulesType = CustomType<
  Awaited<ReturnType<typeof getInterviewModules>>,
  { settings: ModuleType['settings'] }
>;
