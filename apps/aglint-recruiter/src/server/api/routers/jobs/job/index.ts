import { createTRPCRouter } from '../../../trpc';
import { applications } from './applications';
import { filters } from './filters';
import { jd } from './jd';
import { metrics } from './metrics';
import { rescore } from './rescore';
import { workflow } from './workflow';

export const job = createTRPCRouter({
  applications,
  filters,
  jd,
  metrics,
  rescore,
  workflow,
});
