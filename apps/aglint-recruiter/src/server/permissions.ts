import type { ApiPermissions } from './utils';

export const API_PERMISSIONS: ApiPermissions = {
  ats: [],
  applications: ['job_module'],
  scheduling: ['scheduling_module'],
  textTransform: ['job_module'],
  interviewers: ['job_module'],
  interview_pool: ['view_interview_types'],
  analytics: ['job_module'],
  example: [],
  candidatePortal: [],
  requests: [],
};
