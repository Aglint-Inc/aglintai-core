import {
  DatabaseEnums,
  DatabaseTable,
  DatabaseTableUpdate,
} from '@/src/types/customSchema';

export type API_setMembersWithRole = {
  request: {
    data: Omit<DatabaseTableUpdate['recruiter_user'], 'user_id'> & {
      user_id: string;
      role?: DatabaseEnums['user_roles'];
    };
    recruiter_id: string;
  };
  response:
    | {
        data: DatabaseTable['recruiter_user'] & {
          role?: DatabaseEnums['user_roles'];
        };

        error: null;
      }
    | {
        data: null;
        error: string;
      };
};
