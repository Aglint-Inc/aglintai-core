import { createTRPCRouter } from '@/server/api/trpc';

import { read } from './read';
import { update } from './update';

export const templates = createTRPCRouter({
  read,
  update,
});
