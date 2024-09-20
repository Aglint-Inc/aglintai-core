import type { useAllInterviewModules } from './hooks/useAllInterviewModules';

export type useAllInterviewModulesType = Awaited<
  ReturnType<typeof useAllInterviewModules>
>['data'];
