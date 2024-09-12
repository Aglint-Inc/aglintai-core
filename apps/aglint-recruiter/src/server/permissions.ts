import type { ApiPermissions } from './utils';

export const API_PERMISSIONS: ApiPermissions = {
  scheduling: {
    analytics: ['scheduling_module'],
    v1: ['scheduling_module'],
  },
  textTransform: {
    selfScheduleInstruction: ['job_module'],
  },
  interview_pool: {
    users: ['view_interview_types'],
  },
};
