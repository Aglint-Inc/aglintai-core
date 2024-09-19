import { createTRPCRouter } from '@/server/api/trpc';

import { move } from './move';
import { read } from './read';

export const applications = createTRPCRouter({
  read,
  move,
});
