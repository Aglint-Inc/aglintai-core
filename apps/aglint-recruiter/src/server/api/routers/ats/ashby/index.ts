import { createTRPCRouter } from '@/server/api/trpc';

import { example } from './example';

export const ashby = createTRPCRouter({ example });
