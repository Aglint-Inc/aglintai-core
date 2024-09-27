import type { ApiPermissions } from './utils';

export const API_PERMISSIONS: ApiPermissions = {
  ats: [],
  jobs: ['job_module'],
  scheduling: ['scheduling_module'],
  integrations: ['integrations_module'],
  interviewers: ['job_module'],
  interview_pool: ['view_interview_types'],
  analytics: ['job_module'],
  example: [],
  candidatePortal: [],
  requests: [],
  application: ['job_module'],
  get_last_login: ['view_users'],
  get_members_with_role: ['view_users'],
  rolesAndPermissions: [],
  user: [],
};
