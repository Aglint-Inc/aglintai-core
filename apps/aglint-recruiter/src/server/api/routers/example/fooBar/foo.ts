import { z } from 'zod';

import { type PublicProcedure, publicProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

export const fooSchema = z.object({ fooId: z.string().uuid() });

const query = ({ input: { fooId } }: PublicProcedure<typeof fooSchema>) => {
  const adminDb = createPublicClient();
  if (adminDb) {
    return `Foo from the adminDb: ${fooId}`;
  }
  return `Foo: ${fooId}`;
};

export const foo = publicProcedure.input(fooSchema).query(query);
