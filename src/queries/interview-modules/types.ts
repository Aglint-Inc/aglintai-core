import { getInterviewModules } from '.';

export type InterviewModulesType = Awaited<
  ReturnType<typeof getInterviewModules>
>;
