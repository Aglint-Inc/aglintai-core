import { z } from 'zod';

import { type LeverProcedure, leverProcedure } from '@/server/api/trpc';

const schema = z.object({ recruiter_id: z.string().uuid() });

const mutation = ({ input }: LeverProcedure<typeof schema>) => {
  return `Hello ${input.recruiter_id}`;
};

export const example = leverProcedure.input(schema).mutation(mutation);
