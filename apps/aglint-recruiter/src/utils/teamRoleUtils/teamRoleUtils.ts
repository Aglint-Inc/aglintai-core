import { type RoleType } from '@aglint/shared-types';

export const roleSample: { [key: string]: RoleType } = {
  admin: {
    sourcing: false,
    screening: false,
    job_posting: false,
    manage_roles: false,
    manage_users: {
      admin: false,
      recruiter: false,
      'human resource': false,
    },
    edit_workflow: false,
    send_interview_link: false,
    view_candidates_profile: false,
  },
  recruiter: {
    sourcing: false,
    screening: false,
    job_posting: false,
    manage_roles: false,
    manage_users: {
      admin: false,
      recruiter: false,
      'human resource': false,
    },
    edit_workflow: false,
    send_interview_link: false,
    view_candidates_profile: false,
  },
  'human resource': {
    sourcing: false,
    screening: false,
    job_posting: false,
    manage_roles: false,
    manage_users: {
      admin: false,
      recruiter: false,
      'human resource': false,
    },
    edit_workflow: false,
    send_interview_link: false,
    view_candidates_profile: false,
  },
};

// const =
