import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { ApiBodyParamsSendToCandidate } from '@/src/pages/api/scheduling/application/sendtocandidate';
import { createCombsForMultiDaySlots } from '@/src/services/CandidateScheduleV2/utils/createCombsForMultiDaySlots';
import toast from '@/src/utils/toast';

import { useGetScheduleApplication } from '../hooks';
import {
  setIsSendingToCandidate,
  setSelectedApplicationLog,
  setSelectedSessionIds,
  useSchedulingApplicationStore,
} from '../store';
import { filterSchedulingOptionsArray } from './StepScheduleFilter/utils';
import {
  setFilteredSchedulingOptions,
  setIsScheduleNowOpen,
  setSchedulingOptions,
  setStepScheduling,
  useSchedulingFlowStore,
} from './store';

export const useSelfSchedulingDrawer = ({
  isDebrief,
  refetch,
}: {
  isDebrief: boolean;
  refetch: () => void;
}) => {
  const router = useRouter();
  const { recruiter, recruiterUser } = useAuthDetails();
  const {
    selectedApplication,
    initialSessions,
    selectedSessionIds,
    selectedApplicationLog,
    isSendingToCandidate,
  } = useSchedulingApplicationStore((state) => ({
    selectedApplication: state.selectedApplication,
    initialSessions: state.initialSessions,
    selectedSessionIds: state.selectedSessionIds,
    selectedApplicationLog: state.selectedApplicationLog,
    isSendingToCandidate: state.isSendingToCandidate,
  }));

  const {
    dateRange,
    filteredSchedulingOptions,
    stepScheduling,
    selectedCombIds,
    filters,
    schedulingOptions,
    fetchingPlan,
  } = useSchedulingFlowStore((state) => ({
    dateRange: state.dateRange,
    filteredSchedulingOptions: state.filteredSchedulingOptions,
    stepScheduling: state.stepScheduling,
    filters: state.filters,
    selectedCombIds: state.selectedCombIds,
    schedulingOptions: state.schedulingOptions,
    fetchingPlan: state.fetchingPlan,
  }));

  const task_id = router.query.task as string;

  const { fetchInterviewDataByApplication } = useGetScheduleApplication();

  const onClickPrimary = () => {
    if (stepScheduling === 'preference') {
      generateCombinations();
    } else if (stepScheduling === 'slot_options') {
      if (!isSendingToCandidate) {
        onClickSendToCandidate();
      }
    }
  };

  const generateCombinations = () => {
    const { allFilteredOptions } = filterSchedulingOptionsArray({
      filters,
      schedulingOptions,
    });
    const combs = createCombsForMultiDaySlots(allFilteredOptions).flatMap(
      (comb) => comb,
    );
    if (combs.length === 0) {
      toast.warning('No combinations found for the selected preferences.');
    } else if (combs.length > 5000) {
      toast.warning(
        'Too many combinations found. Please filter it further by adding prefered date ranges and conflict resolution.',
      );
    } else {
      setFilteredSchedulingOptions(combs);
      setStepScheduling('slot_options');
    }
  };

  const resetStateSelfScheduling = () => {
    if (!isSendingToCandidate && !fetchingPlan) {
      setIsScheduleNowOpen(false);
      setSchedulingOptions([]);
      setSelectedSessionIds([]);
      setStepScheduling('pick_date');
      setSelectedApplicationLog(null);
    }
  };

  const onClickSendToCandidate = async () => {
    try {
      setIsSendingToCandidate(true);
      if (selectedSessionIds.length === 0) {
        throw new Error('Please select a session to schedule.');
      }

      if (isDebrief && selectedCombIds.length === 0) {
        toast.warning('Please select a time slot to schedule.');
        return;
      }
      if (!isDebrief && selectedCombIds.length < 5) {
        toast.warning('Please select at least 5 time slots to schedule.');
        return;
      }

      const bodyParams: ApiBodyParamsSendToCandidate = {
        dateRange,
        initialSessions,
        is_debrief: isDebrief,
        recruiter_id: recruiter.id,
        recruiterUser,
        selectedApplication,
        selectedSessionIds,
        selectedDebrief: filteredSchedulingOptions.find(
          (opt) => opt.plan_comb_id === selectedCombIds[0],
        ),
        user_tz: dayjs.tz.guess(),
        selectedApplicationLog,
        selectedSlots: filteredSchedulingOptions.filter((opt) =>
          selectedCombIds.includes(opt.plan_comb_id),
        ),
        task_id,
      };
      const res = await axios.post(
        '/api/scheduling/application/sendtocandidate',
        bodyParams,
      );

      if (res.status === 200 && res.data) {
        isDebrief
          ? toast.success('Debrief scheduled')
          : toast.success('Booking link sent to candidate.');
      }
      resetStateSelfScheduling();
    } catch (e) {
      toast.error('Error sending to candidate.');
    } finally {
      setIsSendingToCandidate(false);
      refetch();
      fetchInterviewDataByApplication();
      setSelectedSessionIds([]);
    }
  };

  return { onClickPrimary, resetStateSelfScheduling };
};
