import {
  type DatabaseTable,
  type RecruiterUserType,
} from '@aglint/shared-types';

export type InviteUserAPIType = {
  request: {
    users: (Pick<
      DatabaseTable['recruiter_user'],
      | 'first_name'
      | 'last_name'
      | 'email'
      | 'position'
      | 'department_id'
      | 'office_location_id'
      | 'employment'
      | 'scheduling_settings'
    > & {
      role_id: string;
      manager_id: string;
    })[];
    recruiter_id: string;
  };
  response: {
    created: boolean;
    user: RecruiterUserType;
  };
};
