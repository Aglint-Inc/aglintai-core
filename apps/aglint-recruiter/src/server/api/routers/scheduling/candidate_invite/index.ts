import { createTRPCRouter } from '@/server/api/trpc';

import { getSchedulingReasonsCandidateInvite } from './get_scheduling_reason';
import { metaCandidateInvite } from './meta';
import { slotsCandidateInvite } from './slots';

export const candidateInvite = createTRPCRouter({
  meta: metaCandidateInvite,
  slots: slotsCandidateInvite,
  get_scheduling_reason: getSchedulingReasonsCandidateInvite,
});
