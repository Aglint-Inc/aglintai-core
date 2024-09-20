import { type ApiInterface } from '@/interface/NextApiRequest.interface';

import type { getMembers } from '.';

export interface API_getMembersWithRole extends ApiInterface {
  request: object;
  response: Awaited<ReturnType<typeof getMembers>>;
}
