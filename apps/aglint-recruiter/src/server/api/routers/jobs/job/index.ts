import { createTRPCRouter } from '../../../trpc';
import { applications } from './applications';
import { filters } from './filters';
import { metrics } from './metrics';
import { workflow } from './workflow';

export const job = createTRPCRouter({
  applications,
  filters,
  metrics,
  workflow,
});
