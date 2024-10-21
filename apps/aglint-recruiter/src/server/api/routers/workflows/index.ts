import { createTRPCRouter } from '../../trpc';
import { filters } from './filters';
import { read } from './read';

export const workflows = createTRPCRouter({
  read,
  filters,
});
