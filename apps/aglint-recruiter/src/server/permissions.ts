import 'server-only';

import type { ApiPermissions } from './utils';

export const API_PERMISSIONS: ApiPermissions = {
  ats: [],
  tenant: [],
  workflows: [],
  jobs: ['view_jobs'],
  scheduling: {
    candidate_invite: [],
    details: ['view_interview'],
    v1: [],
  },
  integrations: ['view_integrations'],
  interviewers: ['view_jobs'],
  interview_pool: {
    add_users: ['manage_interview_pool'],
    candidates: ['view_interview_pool'],
    create_pool: ['manage_interview_pool'],
    delete_user: ['manage_interview_pool'],
    feedbacks: ['view_interview_pool'],
    list: ['view_interview_pool'],
    module_and_users: ['view_interview_pool'],
    schedules: ['view_interview_pool'],
    training_progress: ['view_interview_pool'],
    update: ['manage_interview_pool'],
    archive_get_sessions: ['manage_interview_pool'],
    get_all: [],
    update_pool_relation: ['manage_interview_pool'],
  },
  analytics: ['view_jobs'],
  example: {
    fooBar: {
      bar: [],
      foo: ['public'],
    },
    helloWorld: [],
  },
  candidatePortal: [],
  requests: [],
  application: ['view_jobs'],
  get_last_login: ['view_company'],
  user: {
    update_current_user: ['authorized'],
    get_oauth_user: ['authorized'],
    update_user: ['manage_interviewers'],
    update_admin_user: ['manage_company'],
  },
  rolesAndPermissions: [],
  candidate_availability: {
    availableSlots: ['manage_interview'],
    create: ['manage_interview'],
    readCandidateAvailability: ['manage_interview'],
    update: ['public'],
    getMeetings: ['public'],
    getCandidateAvailabilityData: ['public'],
    getScheduledMeetings: ['public'],
  },
  utility: [],
  email: [],
};
