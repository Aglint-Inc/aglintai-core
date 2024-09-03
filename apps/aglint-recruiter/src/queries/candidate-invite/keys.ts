import { type useInviteParams } from '@/src/context/CandidateInviteContext/hooks';

import { appKey } from '..';
import { type InviteSlotsParams } from '.';

export const candidateInviteKeys = {
  all: { queryKey: [appKey, 'candidate-invite'] as string[] },
  inviteMeta: () => ({
    queryKey: [...candidateInviteKeys.all.queryKey, 'invite-meta'] as string[],
  }),
  inviteSlots: () => ({
    queryKey: [...candidateInviteKeys.all.queryKey, 'invite_slots'] as string[],
  }),
  inviteMetaWithFilter: (
    params: Omit<ReturnType<typeof useInviteParams>, 'enabled'>,
  ) => ({
    queryKey: [
      ...candidateInviteKeys.inviteMeta().queryKey,
      ...Object.entries(params).map(([key, value]) => ({ [key]: value })),
    ] as string[],
  }),
  inviteSlotsWithFilter: (params: InviteSlotsParams) => ({
    queryKey: [
      ...candidateInviteKeys.inviteSlots().queryKey,
      ...Object.entries(params).map(([key, value]) => ({ [key]: value })),
    ] as string[],
  }),
} as const;
