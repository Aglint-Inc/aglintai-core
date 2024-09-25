import { createTRPCRouter } from '../../trpc';
import { create } from './create';
import { setup } from './setup';

export const requests = createTRPCRouter({
  create,
  setup,
});
