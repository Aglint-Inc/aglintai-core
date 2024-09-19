export type UserRoleManagementType = {
  send_interview_link: boolean;
  edit_workflow: boolean;
  screening: boolean;
  sourcing: boolean;
  view_candidates_profile: boolean;
  job_posting: boolean;
  manage_users:
    | {
        admin: boolean;
      }
    | { [key: string]: boolean };
  manage_roles: boolean;
};
