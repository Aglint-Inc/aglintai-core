import { createTRPCRouter } from '../../trpc';
import { create } from './create';
import { job } from './job';

export const jobs = createTRPCRouter({
  create,
  job,
});
