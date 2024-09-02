import {
  type DatabaseTable,
  type DatabaseTableUpdate,
} from '@aglint/shared-types';

export type API_setMembersWithRole = {
  request: {
    data: Omit<DatabaseTableUpdate['recruiter_user'], 'user_id'> & {
      user_id: string;
      role_id?: string;
      manager_id?: string;
    };
  };
  response: {
    data: DatabaseTable['recruiter_user'] & {
      role_id?: string;
      manager_id?: string;
    };
  };
};
