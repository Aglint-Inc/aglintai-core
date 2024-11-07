import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

const query = async ({ ctx: { recruiter_id } }: PrivateProcedure) => {
  const db = createPublicClient();

  const data = (
    await db
      .from('recruiter_preferences')
      .select('banner_image, company_images, greetings, about')
      .eq('recruiter_id', recruiter_id)
      .single()
      .throwOnError()
  ).data!;
  return data!;
};

export const get_candidate_portal_detail = privateProcedure.query(query);
export type getCandidatePortalDetails = ProcedureDefinition<
  typeof get_candidate_portal_detail
>;
