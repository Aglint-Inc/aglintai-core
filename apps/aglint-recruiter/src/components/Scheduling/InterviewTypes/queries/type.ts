import { DatabaseTable } from '@aglint/shared-types';

type InterviewModulesQueryKey = ['interview_modules'];
type SchedulesByModuleIdQueryKey = [
  'interview_schedules_modules_id',
  {
    module_id: string;
    filter: DatabaseTable['interview_meeting']['status'];
    changeText;
  },
];
type ProgressByModuleIdQueryKey = [
  'progress_by_module_id',
  { module_id: string },
];
type ModuleUsersByModuleIdQueryKey = [
  'users_by_module_id',
  { module_id: string },
];
type MeetingsByModuleIdQueryKey = [
  'meetings_by_module_id',
  { module_users_id: string },
];

export const QueryKeysInteviewModules = {
  INTERVIEW_MODULES: ['interview_modules'] as InterviewModulesQueryKey,
  SCHEDULES_BY_MODULE_ID: ({
    moduleId,
    filter,
    changeText,
  }: {
    moduleId: string;
    filter: DatabaseTable['interview_meeting']['status'];
    changeText: string;
  }) =>
    [
      'interview_schedules_modules_id',
      {
        module_id: moduleId,
        filter,
        changeText,
      },
    ] as SchedulesByModuleIdQueryKey,
  PROGRESS_BY_MODULE_ID: ({ moduleId }: { moduleId: string }) =>
    [
      'progress_by_module_id',
      { module_id: moduleId },
    ] as ProgressByModuleIdQueryKey,
  USERS_BY_MODULE_ID: ({ moduleId }: { moduleId: string }) =>
    [
      'users_by_module_id',
      { module_id: moduleId },
    ] as ModuleUsersByModuleIdQueryKey,
  MEETINGS_BY_MODULE_ID: ({ moduleId }: { moduleId: string }) =>
    [
      'meetings_by_module_id',
      { module_users_id: moduleId },
    ] as MeetingsByModuleIdQueryKey,
};
