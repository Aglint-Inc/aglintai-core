import { z } from 'zod';

import { PublicProcedure, publicProcedure } from '@/server/api/trpc';

export const fooSchema = z.object({ fooId: z.string().uuid() });

const query = ({
  ctx: { adminDb },
  input: { fooId },
}: PublicProcedure<typeof fooSchema>) => {
  if (adminDb) {
    return `Foo from the adminDb: ${fooId}`;
  }
  return `Foo: ${fooId}`;
};

export const foo = publicProcedure.input(fooSchema).query(query);
