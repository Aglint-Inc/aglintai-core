import { useInviteParams } from '@/src/context/CandidateInviteContext/hooks';

import { appKey } from '..';
import { InviteSlotParams } from '../candidate-invite';

export const candidateInviteKeys = {
  all: { queryKey: [appKey, 'candidate-invite'] as string[] },
  inviteDate: () => ({
    queryKey: [...candidateInviteKeys.all.queryKey, 'invite-date'] as string[],
  }),
  inviteSlot: () => ({
    queryKey: [...candidateInviteKeys.all.queryKey, 'invite-slot'] as string[],
  }),
  inviteDateWithFilter: (
    params: Omit<ReturnType<typeof useInviteParams>, 'enabled'>,
  ) => ({
    queryKey: [
      ...candidateInviteKeys.inviteDate().queryKey,
      ...Object.entries(params).map(([key, value]) => ({ [key]: value })),
    ] as string[],
  }),
  inviteSlotWithFilter: (
    params: Pick<InviteSlotParams, 'start_date' | 'end_date'>,
  ) => ({
    queryKey: [
      ...candidateInviteKeys.inviteSlot().queryKey,
      ...Object.entries(params).map(([key, value]) => ({ [key]: value })),
    ] as string[],
  }),
} as const;
