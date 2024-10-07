import { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

const body = z.object({
  user_id: z.string().uuid(),
});

const query = async ({ input: { user_id } }: PrivateProcedure<typeof body>) => {
  const supabase = createPublicClient();
  const { error: emailError } = await supabase.auth.admin.deleteUser(user_id);
  if (emailError) {
    throw new Error(
      emailError.message || 'Error in resending the invite to user.',
    );
  }
  return { success: true };
};

export const cancel_invite = privateProcedure.input(body).mutation(query);
