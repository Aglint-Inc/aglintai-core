import { type ApiInterface } from '@/src/interface/NextApiRequest.interface';

import type { getMembers } from '.';

export interface API_getMembersWithRole extends ApiInterface {
  request: {};
  response: Awaited<ReturnType<typeof getMembers>>;
}
