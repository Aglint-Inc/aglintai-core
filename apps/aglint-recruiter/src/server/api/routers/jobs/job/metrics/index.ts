import { createTRPCRouter } from '@/server/api/trpc';

import { experienceAndTenure } from './experienceAndTenure';
import { locationPool } from './locationPool';
import { skillPool } from './skillPool';

export const metrics = createTRPCRouter({
  experienceAndTenure,
  locationPool,
  skillPool,
});
