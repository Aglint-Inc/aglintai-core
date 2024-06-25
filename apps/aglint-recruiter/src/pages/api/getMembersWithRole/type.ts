import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';

import { ApiInterface } from '@/src/interface/NextApiRequest.interface';

export interface API_getMembersWithRole extends ApiInterface {
  request: {
    id?: string;
  };
  response: (DatabaseTable['recruiter_user'] & {
    role: DatabaseEnums['user_roles'];
    manager_id: string;
  })[];
}
