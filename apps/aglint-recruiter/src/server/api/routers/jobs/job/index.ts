import { createTRPCRouter } from '../../../trpc';
import { applications } from './applications';
import { filters } from './filters';

export const job = createTRPCRouter({
  filters,
  applications,
});
