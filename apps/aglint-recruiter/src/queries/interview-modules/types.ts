import type { Custom, DatabaseTable } from '@aglint/shared-types';

import { type getInterviewModulesAPI } from '.';

export type InterviewModulesType = Custom<
  Awaited<ReturnType<typeof getInterviewModulesAPI>>,
  { settings: DatabaseTable['interview_module']['settings'] }
>;
