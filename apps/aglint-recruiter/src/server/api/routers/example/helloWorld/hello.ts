import { z } from 'zod';

import { PrivateProcedure, privateProcedure } from '@/server/api/trpc';

export const helloSchema = z.object({ helloId: z.string().uuid() });

const query = ({
  ctx: { db },
  input: { helloId },
}: PrivateProcedure<typeof helloSchema>) => {
  if (db) {
    return `Hello from the db: ${helloId}`;
  }
  return `Hello: ${helloId}`;
};

export const hello = privateProcedure.input(helloSchema).query(query);
