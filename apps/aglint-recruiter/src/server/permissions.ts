import 'server-only';

import type { ApiPermissions } from './utils';

export const API_PERMISSIONS: ApiPermissions = {
  ats: [],
  tenant: [],
  workflows: [],
  jobs: ['job_module'],
  scheduling: {
    candidate_invite: [],
    details: ['scheduling_module'],
    v1: [],
  },
  integrations: ['integrations_module'],
  interviewers: ['job_module'],
  interview_pool: {
    add_users: ['update_interview_types'],
    candidates: ['view_interview_types'],
    create_pool: ['create_interview_types'],
    delete_user: ['delete_interview_types'],
    feedbacks: ['view_interview_types'],
    interview_pool: ['view_interview_types'],
    module_and_users: ['view_interview_types'],
    schedules: ['view_interview_types'],
    training_progress: ['view_interview_types'],
    update: ['update_interview_types'],
    archive_get_sessions: ['update_interview_types'],
    get_all: [],
  },
  analytics: ['job_module'],
  example: {
    fooBar: {
      bar: [],
      foo: ['public'],
    },
    helloWorld: [],
  },
  candidatePortal: [],
  requests: [],
  application: ['job_module'],
  get_last_login: ['view_users'],
  user: {
    update_current_user: ['authorized'],
    get_oauth_user: ['authorized'],
    update_user: ['manage_interviewers'],
    update_admin_user: ['manage_users'],
  },
  rolesAndPermissions: [],
  candidate_availability: ['request_candidate_availability'],
};
