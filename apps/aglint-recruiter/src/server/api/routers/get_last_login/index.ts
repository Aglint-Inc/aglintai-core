import { z } from 'zod';

import { createPublicClient } from '@/server/db';

import { privateProcedure, type ProcedureDefinition } from '../../trpc';

const body = z.object({
  ids: z.array(z.string()),
});

export const get_last_login = privateProcedure
  .input(body)
  .query(async ({ input }) => {
    const { ids } = input;
    const supabase = createPublicClient();
    const last_login_data = (
      await Promise.all(
        ids.map((id) =>
          supabase.auth.admin.getUserById(id).then(({ data, error }) => {
            if (error) {
              throw new Error(error.message);
            }
            return { [id]: data.user.last_sign_in_at || '' };
          }),
        ),
      )
    ).reduce((acc, curr) => {
      return { ...acc, ...curr };
    }, {});
    return last_login_data;
  });

export type GetLastLogin = ProcedureDefinition<typeof get_last_login>;
