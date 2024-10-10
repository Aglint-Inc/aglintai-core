import { dayjsLocal } from '@aglint/shared-utils';
import { create } from 'zustand';

import timeZone, { type TimezoneObj } from '@/utils/timeZone';

import { type useInviteSlots } from './hooks/useInviteSlots';
import { type ScheduleCardProps } from './types/types';

export type CandidateInviteType = {
  timezone: TimezoneObj;
  detailPopup: boolean;
  selectedDate: string | null;
  selectedDay: number;
  rounds: (ScheduleCardProps['round'] & {
    selectedSlots:
      | ReturnType<typeof useInviteSlots>['data'][number][number][number]
      | null;
  })[];
};

export const initialStateSchedulingStore: CandidateInviteType = {
  timezone:
    timeZone.find(({ tzCode }) => tzCode === dayjsLocal.tz.guess()) ??
    timeZone[0],
  detailPopup: false,
  selectedDate: null,
  selectedDay: 1,
  rounds: [],
};

export const useCandidateInviteStore = create<CandidateInviteType>()(
  () => initialStateSchedulingStore,
);

export const setRounds = (rounds: CandidateInviteType['rounds']) =>
  useCandidateInviteStore.setState({ rounds });

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

export const resetCandidateInviteStore = () =>
  useCandidateInviteStore.setState(initialStateSchedulingStore);
