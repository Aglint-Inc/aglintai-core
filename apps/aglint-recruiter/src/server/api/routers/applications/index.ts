import { createTRPCRouter } from '../../trpc';
import { applications as _applications } from './applications';
import { filters } from './filters';

export const applications = createTRPCRouter({
  filters,
  applications: _applications,
});
