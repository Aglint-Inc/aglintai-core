import { createTRPCRouter } from '@/server/api/trpc';

import { getRequestSetupProgress } from './get_request_setup_progress';

export const setup = createTRPCRouter({
  getRequestSetupProgress,
});
