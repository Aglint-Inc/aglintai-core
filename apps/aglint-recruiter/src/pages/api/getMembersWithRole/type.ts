import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';

export type API_getMembersWithRole = {
  request: {
    id?: string;
  };
  response: (DatabaseTable['recruiter_user'] & {
    role: DatabaseEnums['user_roles'];
    manager_id: string;
  })[];
};
