import type { ApiPermissions } from './utils';

export const API_PERMISSIONS: ApiPermissions = {
  scheduling: {
    analytics: ['scheduling_module'],
    v1: ['scheduling_module'],
  },
  textTransform: {
    selfScheduleInstruction: ['job_module'],
  },
  analytics: ['job_module'],
  example: [],
  candidatePortal: [],
};
