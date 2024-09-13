import { privateProcedure } from '@/server/api/trpc';

import { schemaFindAlternativeSlots } from './schema';
import { findReplacementIntsUtil } from './util';

export const findReplacementInts = privateProcedure
  .input(schemaFindAlternativeSlots)
  .mutation(findReplacementIntsUtil);
