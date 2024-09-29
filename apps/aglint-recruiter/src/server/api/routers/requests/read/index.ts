import { createTRPCRouter } from '@/server/api/trpc';

import { applicantRequest } from './applicantRequest';

export const read = createTRPCRouter({
  applicantRequest,
});