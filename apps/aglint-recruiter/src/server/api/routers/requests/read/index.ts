import { createTRPCRouter } from '@/server/api/trpc';

import { applicantRequest } from './applicantRequest';
import { completedRequest } from './completedRequest';
import { requestCount } from './requestCount';

export const read = createTRPCRouter({
  applicantRequest,
  completedRequest,
  requestCount,
});
