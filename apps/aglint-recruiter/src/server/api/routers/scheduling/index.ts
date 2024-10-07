import { createTRPCRouter } from '../../trpc';
import { candidateInvite } from './candidate_invite';
import { scheduleDetails } from './details';
import { v1 } from './v1';

export const scheduling = createTRPCRouter({
  v1,
  details: scheduleDetails,
  candidate_invite: candidateInvite,
});
