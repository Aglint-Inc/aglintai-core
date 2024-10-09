import { dayjsLocal } from '@aglint/shared-utils';
import { create } from 'zustand';

import timeZone, { type TimezoneObj } from '@/utils/timeZone';

import { type useInviteSlots } from './hooks/useInviteSlots';

export type CandidateInviteType = {
  timezone: TimezoneObj;
  selectedSlots: ReturnType<typeof useInviteSlots>['data'][number][number];
  detailPopup: boolean;
  selectedDate: string | null;
  selectedDay: number;
};

const initialStateSchedulingStore: CandidateInviteType = {
  timezone:
    timeZone.find(({ tzCode }) => tzCode === dayjsLocal.tz.guess()) ??
    timeZone[0],
  selectedSlots: [],
  detailPopup: false,
  selectedDate: null,
  selectedDay: 1,
};

export const useCandidateInviteStore = create<CandidateInviteType>()(
  () => initialStateSchedulingStore,
);

export const setSelectedDay = (
  selectedDay: CandidateInviteType['selectedDay'],
) => useCandidateInviteStore.setState({ selectedDay });

export const setSelectedDate = (
  selectedDate: CandidateInviteType['selectedDate'],
) => useCandidateInviteStore.setState({ selectedDate });

export const setDetailPopup = (
  detailPopup: CandidateInviteType['detailPopup'],
) => useCandidateInviteStore.setState({ detailPopup });

export const setTimeZone = (timezone: CandidateInviteType['timezone']) =>
  useCandidateInviteStore.setState({ timezone });

export const setSelectedSlots = (
  selectedSlots: CandidateInviteType['selectedSlots'],
) => useCandidateInviteStore.setState({ selectedSlots });
