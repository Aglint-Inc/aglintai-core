import { z } from 'zod';

import { privateProcedure, PublicProcedure } from '@/server/api/trpc';

export const fooSchema = z.object({ fooId: z.string().uuid() });

const query = ({
  ctx: { db },
  input: { fooId },
}: PublicProcedure<typeof fooSchema>) => {
  if (db) {
    return `Foo from the db: ${fooId}`;
  }
  return `Foo: ${fooId}`;
};

export const foo = privateProcedure.input(fooSchema).query(query);
