import { z } from 'zod';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

const redirectTo = `${process.env.NEXT_PUBLIC_HOST_NAME}/reset-password`;

const body = z.object({
  email: z.string(),
});

const query = async ({ input: { email } }: PrivateProcedure<typeof body>) => {
  const supabase = createPublicClient();
  const { error: emailError } = await supabase.auth.resetPasswordForEmail(
    email,
    {
      redirectTo,
    },
  );
  if (emailError) {
    throw new Error(
      emailError.message || 'Error in resending the invite to user.',
    );
  }
  return { success: true };
};

export const resend_invite = privateProcedure.input(body).mutation(query);

export type ResendInvite = ProcedureDefinition<typeof resend_invite>;
