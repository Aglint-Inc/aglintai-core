import { createTRPCRouter } from '../../trpc';
import { template } from './template';

export const email = createTRPCRouter({
  template,
});
