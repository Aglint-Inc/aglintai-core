import {
  DatabaseEnums,
  DatabaseTable,
  DatabaseTableUpdate,
} from '@aglint/shared-types';

export type API_setMembersWithRole = {
  request: {
    data: Omit<DatabaseTableUpdate['recruiter_user'], 'user_id'> & {
      user_id: string;
      role?: DatabaseEnums['user_roles'];
      manager_id?: string;
    };
  };
  response: {
    data: DatabaseTable['recruiter_user'] & {
      role?: DatabaseEnums['user_roles'];
      manager_id?: string;
    };
  };
};
