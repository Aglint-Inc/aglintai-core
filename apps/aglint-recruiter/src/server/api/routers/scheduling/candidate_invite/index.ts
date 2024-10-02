import { createTRPCRouter } from '@/server/api/trpc';

import { metaCandidateInvite } from './meta';
import { slotsCandidateInvite } from './slots';

export const candidateInvite = createTRPCRouter({
  meta: metaCandidateInvite,
  slots: slotsCandidateInvite,
});
