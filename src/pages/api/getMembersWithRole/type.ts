import { DatabaseEnums, DatabaseTable } from '@/src/types/customSchema';

export type API_getMembersWithRole = {
  request: {
    id: string;
  };
  response:
    | {
        members: (DatabaseTable['recruiter_user'] & {
          role: DatabaseEnums['user_roles'];
        })[];

        error: null;
      }
    | {
        members: null;
        error: string;
      };
};
