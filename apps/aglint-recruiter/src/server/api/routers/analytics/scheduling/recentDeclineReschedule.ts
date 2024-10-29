import { createPublicClient } from '@/server/db';
import type { SupabaseClientType } from '@/utils/supabase/supabaseAdmin';

import { privateProcedure, type ProcedureDefinition } from '../../../trpc';

export const recentDeclineReschedule = privateProcedure.query(
  async ({ ctx: { recruiter_id } }) => {
    const adminDb = createPublicClient();
    return getRecentDeclineReschedule(adminDb, recruiter_id);
  },
);

export type recentDeclineRescheduleType = ProcedureDefinition<
  typeof recentDeclineReschedule
>;

async function getRecentDeclineReschedule(
  supabase: SupabaseClientType,
  recruiter_id: string,
) {
  const { data, error } = await supabase
    .from('interview_session_cancel')
    .select(
      'id, reason, type, recruiter_user(user_id,profile_image,first_name, last_name),applications(candidates(avatar,first_name, last_name)), interview_session_relation(recruiter_user(user_id,profile_image,first_name, last_name)), interview_session!inner()',
    )
    .eq('is_resolved', true)
    .eq('interview_session.recruiter_id', recruiter_id)
    .order('created_at', { ascending: false })
    .limit(50);
  if (error) {
    throw new Error(error.message);
  }
  return data!
    .map((item) => {
      const {
        id,
        reason,
        type,
        recruiter_user: admin,
        applications,
        interview_session_relation,
      } = item;
      const candidates = applications?.candidates;
      const user: { name: string; profile_image: string } = {
        name: '',
        profile_image: '',
      };
      const inter_user = interview_session_relation?.recruiter_user;
      if (
        type === 'candidate_request_reschedule' ||
        type === 'candidate_request_decline'
      ) {
        user.name =
          `${candidates?.first_name || ''} ${candidates?.first_name || ''}`.trim();
        user.profile_image = candidates?.avatar || '';
      } else if (type === 'admin_cancel') {
        user.name = `${admin?.first_name || ''} ${admin?.last_name || ''}`;
        user.profile_image = admin?.profile_image || '';
      } else if (type === 'interviewer_request_decline') {
        user.name = `${inter_user?.first_name || ''} ${inter_user?.last_name || ''}`;
        user.profile_image = inter_user?.profile_image || '';
      }

      return user.name.trim() === ''
        ? null
        : {
            id,
            profile_image: user?.profile_image,
            type,
            name: user.name,
            note: reason,
          };
    })
    .filter(Boolean);
}
