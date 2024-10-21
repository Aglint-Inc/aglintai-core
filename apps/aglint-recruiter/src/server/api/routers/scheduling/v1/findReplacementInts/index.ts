import { privateProcedure, type ProcedureDefinition } from '@/server/api/trpc';

import { schemaFindAlternativeSlots } from './schema';
import { findReplacementInt } from './util';

export const findReplacementInts = privateProcedure
  .input(schemaFindAlternativeSlots)
  .mutation(findReplacementInt);

export type FindReplacementInts = ProcedureDefinition<
  typeof findReplacementInts
>;
