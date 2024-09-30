import { createTRPCRouter } from '@/server/api/trpc';

import { applicantRequest } from './applicantRequest';
import { completedRequest } from './completedRequest';

export const read = createTRPCRouter({
  applicantRequest,
  completedRequest,
});
