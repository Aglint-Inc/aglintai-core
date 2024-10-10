import { createTRPCRouter } from '../../../trpc';
import { applications } from './applications';
import { filters } from './filters';
import { jd } from './jd';
import { metrics } from './metrics';
import { type Read, read } from './read';
import { rescore } from './rescore';
import { workflow } from './workflow';

export const job = createTRPCRouter({
  applications,
  filters,
  jd,
  metrics,
  rescore,
  workflow,
  read,
});

export type Job = {
  read: Read;
};
