import { type ApiInterface } from '@/interface/NextApiRequest.interface';

import type { getMembers } from '.';

export interface API_getMembersWithRole extends ApiInterface {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  request: {};
  response: Awaited<ReturnType<typeof getMembers>>;
}
