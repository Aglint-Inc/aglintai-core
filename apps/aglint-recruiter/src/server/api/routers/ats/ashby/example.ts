import { z } from 'zod';

import { type AshbyProcedure, ashbyProcedure } from '@/server/api/trpc';

const schema = z.object({ recruiter_id: z.string().uuid() });

const mutation = ({ input }: AshbyProcedure<typeof schema>) => {
  return `Hello ${input.recruiter_id}`;
};

export const example = ashbyProcedure.input(schema).mutation(mutation);
