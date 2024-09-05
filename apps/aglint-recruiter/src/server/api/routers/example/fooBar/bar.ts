/* eslint-disable no-console */
import { z } from 'zod';

import { PublicProcedure, publicProcedure } from '@/server/api/trpc';

export const barSchema = z.object({ barId: z.string().uuid() });

const mutation = ({
  ctx: { adminDb },
  input: { barId },
}: PublicProcedure<typeof barSchema>) => {
  if (adminDb) {
    console.log(`Bar from the adminDb: ${barId}`);
  }
  console.log(`Bar from the adminDb: ${barId}`);
};

export const bar = publicProcedure.input(barSchema).mutation(mutation);
