import { createPublicClient } from '@/server/db';
import type { SupabaseClientType } from '@/utils/supabase/supabaseAdmin';

import { privateProcedure, type ProcedureDefinition } from '../../../trpc';

export const trainingProgress = privateProcedure.query(
  async ({ ctx: { recruiter_id } }) => {
    const adminDb = createPublicClient();
    return getTrainingProgress(adminDb, recruiter_id);
  },
);

export type trainingProgressType = ProcedureDefinition<typeof trainingProgress>;

async function getTrainingProgress(
  supabase: SupabaseClientType,
  recruiter_id: string,
) {
  const { data, error } = await supabase
    .from('module_relations_view')
    .select(
      'user_id, recruiter_user!inner(first_name, last_name, position), number_of_shadow, number_of_reverse_shadow, interview_module!inner(settings)',
    )
    .eq('module_training_status', 'training')
    .eq('interview_module.recruiter_id', recruiter_id);
  if (error) {
    throw new Error(error.message);
  }
  return data!.map((item) => ({
    user_id: item.user_id,
    number_of_shadow: item.number_of_shadow || 0,
    number_of_reverse_shadow: item.number_of_reverse_shadow || 0,
    noShadow: item.interview_module.settings!.noShadow,
    noReverseShadow: item.interview_module.settings!.noReverseShadow,
    name: `${item.recruiter_user.first_name || ''} ${item.recruiter_user.last_name || ''}`.trim(),
    position: item.recruiter_user.position,
  }));
}
