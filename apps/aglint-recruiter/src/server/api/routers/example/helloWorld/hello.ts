import { z } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';

export const helloSchema = z.object({ helloId: z.string().uuid() });

const query = async ({
  input: { helloId },
  ctx,
}: PrivateProcedure<typeof helloSchema>) => {
  const db = ctx.db;
  if (db) {
    return `Hello from the db: ${helloId}`;
  }
  return `Hello: ${helloId}`;
};

export const hello = privateProcedure.input(helloSchema).query(query);

export type Hello = ProcedureDefinition<typeof hello>;
