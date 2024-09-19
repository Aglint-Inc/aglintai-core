import { createTRPCRouter } from '../../trpc';
import { job } from './job';

export const jobs = createTRPCRouter({
  job,
});
