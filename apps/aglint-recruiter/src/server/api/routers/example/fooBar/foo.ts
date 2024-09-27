import { z } from 'zod';

import { type PublicProcedure, publicProcedure } from '@/server/api/trpc';

export const fooSchema = z.object({ fooId: z.string() });

const query = ({ input: { fooId } }: PublicProcedure<typeof fooSchema>) => {
  return `Foo: ${fooId}`;
};

export const foo = publicProcedure.input(fooSchema).query(query);
