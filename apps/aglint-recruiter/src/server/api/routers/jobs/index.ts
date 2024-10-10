import { createTRPCRouter } from '../../trpc';
import { type Create, create } from './create';
import { type Job, job } from './job';
import { read } from './read';

export const jobs = createTRPCRouter({
  create,
  job,
  read,
});

export type Jobs = {
  create: Create;
  job: Job;
};
