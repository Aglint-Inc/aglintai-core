import { createTRPCRouter } from '@/server/api/trpc';

import { candidates_exp } from './candidates_exp';
import { candidates_skills } from './candidates_skills';

export const candidate = createTRPCRouter({
  candidates_exp,
  candidates_skills,
});
