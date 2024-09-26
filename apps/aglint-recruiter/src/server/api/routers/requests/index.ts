import { createTRPCRouter } from '../../trpc';
import { create } from './create';

export const requests = createTRPCRouter({
  create,
});
