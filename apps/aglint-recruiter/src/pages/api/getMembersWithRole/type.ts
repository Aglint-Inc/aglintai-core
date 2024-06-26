import { DatabaseTable } from '@aglint/shared-types';

import { ApiInterface } from '@/src/interface/NextApiRequest.interface';

export interface API_getMembersWithRole extends ApiInterface {
  request: any;
  response: (DatabaseTable['recruiter_user'] & {
    role: string;
    role_id: string;
    manager_id: string;
  })[];
}
