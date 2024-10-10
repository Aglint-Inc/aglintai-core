import { dayjsLocal } from '@aglint/shared-utils';
import { create } from 'zustand';

import { type transformPlanCombinationPack } from '@/services/CandidateSchedule/utils/bookingUtils/candidateSelfSchedule/transformPlanCombinationPack';
import timeZone, { type TimezoneObj } from '@/utils/timeZone';

import { type ScheduleCardProps } from './types/types';

export type CandidateInviteType = {
  timezone: TimezoneObj;
  detailPopup: boolean;
  selectedDate: string | null;
  selectedDay: number;
  rounds: (ScheduleCardProps['round'] & {
    selectedSlot:
      | ReturnType<
          typeof transformPlanCombinationPack
        >[number]['interview_rounds'][number]['current_day_slots'][number]
      | null;
  })[];
  initialDayDate: string | null;
};

export const initialStateSchedulingStore: CandidateInviteType = {
  timezone:
    timeZone.find(({ tzCode }) => tzCode === dayjsLocal.tz.guess()) ??
    timeZone[0],
  detailPopup: false,
  selectedDate: null,
  selectedDay: 1,
  rounds: [],
  initialDayDate: null,
};

export const useCandidateInviteSelfScheduleStore =
  create<CandidateInviteType>()(() => initialStateSchedulingStore);

export const setInitialDayDate = (
  initialDayDate: CandidateInviteType['initialDayDate'],
) => useCandidateInviteSelfScheduleStore.setState({ initialDayDate });

export const setRounds = (rounds: CandidateInviteType['rounds']) =>
  useCandidateInviteSelfScheduleStore.setState({ rounds });

export const setSelectedDay = (
  selectedDay: CandidateInviteType['selectedDay'],
) => useCandidateInviteSelfScheduleStore.setState({ selectedDay });

export const setSelectedDate = (
  selectedDate: CandidateInviteType['selectedDate'],
) => useCandidateInviteSelfScheduleStore.setState({ selectedDate });

export const setDetailPopup = (
  detailPopup: CandidateInviteType['detailPopup'],
) => useCandidateInviteSelfScheduleStore.setState({ detailPopup });

export const setTimeZone = (timezone: CandidateInviteType['timezone']) =>
  useCandidateInviteSelfScheduleStore.setState({ timezone });

export const resetCandidateInviteStore = () =>
  useCandidateInviteSelfScheduleStore.setState(initialStateSchedulingStore);
