import { createTRPCRouter } from '@/server/api/trpc';
import { generate } from './generate';

export const jd = createTRPCRouter({
  generate,
});
