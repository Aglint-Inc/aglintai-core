import { createTRPCRouter } from '@/server/api/trpc';

import { example } from './example';

export const lever = createTRPCRouter({ example });
