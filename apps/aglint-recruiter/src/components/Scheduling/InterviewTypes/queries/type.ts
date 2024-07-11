type InterviewModulesQueryKey = ['interview_modules'];
type SchedulesByModuleIdQueryKey = [
  'interview_modules_id',
  { module_id: string },
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
  SCHEDULES_BY_MODULE_ID: ({ moduleId }: { moduleId: string }) =>
    [
      'interview_modules_id',
      { module_id: moduleId },
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
