import { createTRPCRouter } from '../../trpc';
import { ashby } from './ashby';
import { greenhouse } from './greenhouse';
import { lever } from './lever';

export const ats = createTRPCRouter({
  ashby,
  greenhouse,
  lever,
});
