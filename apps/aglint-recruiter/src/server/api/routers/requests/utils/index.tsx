import { createTRPCRouter } from '@/server/api/trpc';

import { requestSessions } from './requestSessions';
export const utils = createTRPCRouter({ requestSessions });
