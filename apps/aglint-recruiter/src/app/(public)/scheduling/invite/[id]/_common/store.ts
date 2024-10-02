import { dayjsLocal } from '@aglint/shared-utils';
import { create } from 'zustand';

import timeZone, { type TimezoneObj } from '@/utils/timeZone';

import { type useInviteSlots } from './hooks/useInviteSlots';

export type CandidateInviteType = {
  timezone: TimezoneObj;
  selectedSlots: ReturnType<typeof useInviteSlots>['data'][number][number];
  detailPopup: boolean;
};

const initialStateSchedulingStore: CandidateInviteType = {
  timezone:
    timeZone.find(({ tzCode }) => tzCode === dayjsLocal.tz.guess()) ??
    timeZone[0],
  selectedSlots: [],
  detailPopup: false,
};

export const useCandidateInviteStore = create<CandidateInviteType>()(
  () => initialStateSchedulingStore,
);

export const setDetailPopup = (
  detailPopup: CandidateInviteType['detailPopup'],
) => useCandidateInviteStore.setState({ detailPopup });

export const setTimeZone = (timezone: CandidateInviteType['timezone']) =>
  useCandidateInviteStore.setState({ timezone });

export const setSelectedSlots = (
  selectedSlots: CandidateInviteType['selectedSlots'],
) => useCandidateInviteStore.setState({ selectedSlots });
