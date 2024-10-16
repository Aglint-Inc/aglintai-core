import { createTRPCRouter } from '../../trpc';
import { create } from './create';
import { job } from './job';
import { read } from './read';

export const jobs = createTRPCRouter({
  create,
  job,
  read,
});
