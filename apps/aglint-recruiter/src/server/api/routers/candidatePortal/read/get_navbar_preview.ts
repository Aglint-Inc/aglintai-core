import { dummyDataNavbar } from 'src/app/(public)/candidate/(authenticated)/_common/dummydata';
import { z } from 'zod';

import {
  type ProcedureDefinition,
  type PublicProcedure,
  publicProcedure,
} from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

import { type GetNav } from './get_navbar';

const schema = z.object({
  recruiter_id: z.string().uuid(),
});

const query = async ({ input }: PublicProcedure<typeof schema>) => {
  const { recruiter_id } = input;

  const db = createPublicClient();

  const company = (
    await db
      .from('recruiter')
      .select('name,logo')
      .eq('id', recruiter_id)
      .throwOnError()
      .single()
  ).data!;

  const navBar: GetNav['output'] = dummyDataNavbar;

  return {
    candidate: {
      ...navBar.candidate,
    },
    company: {
      name: company.name,
      logo: company.logo || '',
    },
  };
};

export const get_navbar_preview = publicProcedure.input(schema).query(query);
export type getNavbarPreview = ProcedureDefinition<typeof get_navbar_preview>;
