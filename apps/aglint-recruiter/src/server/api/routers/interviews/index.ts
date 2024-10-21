import { createTRPCRouter } from '../../trpc';
import { filters } from './filters';

export const interviews = createTRPCRouter({
  filters,
});
