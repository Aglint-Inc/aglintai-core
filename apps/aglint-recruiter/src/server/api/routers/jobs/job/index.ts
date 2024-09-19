import { createTRPCRouter } from '../../../trpc';
import { applications } from './applications';
import { filters } from './filters';
import { metrics } from './metrics';

export const job = createTRPCRouter({
  applications,
  filters,
  metrics,
});
