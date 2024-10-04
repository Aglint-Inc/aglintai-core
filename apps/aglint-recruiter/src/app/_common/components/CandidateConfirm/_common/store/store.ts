import { type DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils';
import { create } from 'zustand';

type CandidateInviteType = {
  isCancelRescheduleDialogOpen: 'cancel' | 'reschedule' | null;
  dateRange: {
    startDate: string;
    endDate: string;
  };
  other_details: DatabaseTable['interview_session_cancel']['other_details'];
  reason: string;
};

export const initialStateSchedulingStore: CandidateInviteType = {
  isCancelRescheduleDialogOpen: null,
  dateRange: {
    startDate: dayjsLocal().toISOString(),
    endDate: dayjsLocal().add(7, 'day').toISOString(),
  },
  other_details: {},
  reason: '',
};

export const useCandidateInviteStore = create<CandidateInviteType>()(
  () => initialStateSchedulingStore,
);

export const setIsRescheduleCancelOpen = (
  isCancelRescheduleDialogOpen: CandidateInviteType['isCancelRescheduleDialogOpen'],
) => useCandidateInviteStore.setState({ isCancelRescheduleDialogOpen });

export const setDateRange = (dateRange: CandidateInviteType['dateRange']) =>
  useCandidateInviteStore.setState({ dateRange });

export const setOtherDetails = (
  other_details: CandidateInviteType['other_details'],
) => useCandidateInviteStore.setState({ other_details });

export const setReason = (reason: CandidateInviteType['reason']) =>
  useCandidateInviteStore.setState({ reason });
