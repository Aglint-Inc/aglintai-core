import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';

export type API_getMembersWithRole = {
  request: {
    id: string;
  };
  response:
    | {
        members: (DatabaseTable['recruiter_user'] & {
          role: DatabaseEnums['user_roles'];
          manager_id: string;
        })[];

        error: null;
      }
    | {
        members: null;
        error: string;
      };
};
