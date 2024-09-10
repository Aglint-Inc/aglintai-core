/* eslint-disable no-console */
import { z } from 'zod';

import { privateProcedure, type PublicProcedure } from '@/server/api/trpc';

export const barSchema = z.object({ barId: z.string().uuid() });

const mutation = ({
  ctx: { db },
  input: { barId },
}: PublicProcedure<typeof barSchema>) => {
  if (db) {
    console.log(`Bar from the db: ${barId}`);
  }
  console.log(`Bar from the db: ${barId}`);
};

export const bar = privateProcedure.input(barSchema).mutation(mutation);
