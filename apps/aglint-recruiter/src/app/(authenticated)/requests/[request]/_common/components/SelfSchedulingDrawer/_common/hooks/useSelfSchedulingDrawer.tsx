import { type APIScheduleDebreif } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils';
import { toast } from '@components/hooks/use-toast';
import { useMeetingList } from '@requests/hooks';
// import { type ApiResponseFindAvailability } from '@requests/types';
import axios from 'axios';
import { useParams } from 'next/navigation';

import { useTenant } from '@/company/hooks';
import type {
  ApiBodyParamsSelfSchedule,
  ApiResponseSelfSchedule,
} from '@/pages/api/scheduling/application/sendselfschedule';

import {
  setErrorNoSlotFilter,
  setFilteredSchedulingOptions,
  setIsSelfScheduleDrawerOpen,
  setIsSendingToCandidate,
  setNoOptions,
  setResSendToCandidate,
  setSchedulingOptions,
  setStepScheduling,
  useSelfSchedulingFlowStore,
} from '../store/store';

export const useSelfSchedulingDrawer = () => {
  const params = useParams();
  const request_id = (params?.request || '') as string;

  const { recruiter_user } = useTenant();
  const { data: allSessions } = useMeetingList();

  const application_id =
    allSessions.length > 0
      ? allSessions[0]?.interview_meeting?.application_id
      : '';

  const {
    dateRange,
    filteredSchedulingOptions,
    stepScheduling,
    selectedCombIds,
    fetchingPlan,
    isSendingToCandidate,
  } = useSelfSchedulingFlowStore((state) => ({
    dateRange: state.dateRange,
    filteredSchedulingOptions: state.filteredSchedulingOptions,
    stepScheduling: state.stepScheduling,
    selectedCombIds: state.selectedCombIds,
    schedulingOptions: state.schedulingOptions,
    fetchingPlan: state.fetchingPlan,
    isSendingToCandidate: state.isSendingToCandidate,
    localFilters: state.localFilters,
  }));

  const isDebrief = allSessions.some(
    (ele) => ele?.interview_session?.session_type === 'debrief',
  );

  const onClickPrimary = async () => {
    await selfSchedulingOrDebriefFlow();
  };

  const selfSchedulingOrDebriefFlow = async () => {
    if (stepScheduling === 'slot_options') {
      if (isDebrief) {
        onClickScheduleDebrief();
      } else {
        // if it normal session then user has to select atleast 5 combinations
        if (selectedCombIds.length < 5) {
          toast({ title: 'Please select at least 5 time slots to schedule.' });
          return;
        }
        setStepScheduling('self_scheduling_email_preview');
      }
    } else if (stepScheduling === 'self_scheduling_email_preview') {
      if (!isSendingToCandidate) {
        await onClickSendToCandidate();
      }
    }
  };

  const onClickScheduleDebrief = async () => {
    try {
      setIsSendingToCandidate(true);
      const plans = filteredSchedulingOptions.map((opt) => opt.plans).flat();
      const selectedSlot = plans.filter((opt) =>
        selectedCombIds.includes(opt.plan_comb_id),
      )[0];
      const bodyParams: APIScheduleDebreif = {
        session_id: allSessions[0].interview_session.id,
        user_tz: dayjsLocal.tz.guess(),
        selectedOption: selectedSlot,
        request_id,
      };
      await axios.post(
        `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/booking/schedule-debreif`,
        bodyParams,
      );
      resetStateSelfScheduling();
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Error sending to candidate. Please contact support.',
      });
    } finally {
      setIsSendingToCandidate(false);
    }
  };

  const onClickSendToCandidate = async () => {
    try {
      setIsSendingToCandidate(true);
      const plans = filteredSchedulingOptions.map((opt) => opt.plans).flat();

      const selectedSlots = plans.filter((opt) =>
        selectedCombIds.includes(opt.plan_comb_id),
      );

      const bodyParams: ApiBodyParamsSelfSchedule = {
        dateRange,
        allSessions,
        user_id: recruiter_user?.user_id ?? '',
        selectedSlots,
        application_id,
        request_id,
      };
      const res = await axios.post(
        '/api/scheduling/application/sendselfschedule',
        bodyParams,
      );

      if (res.status === 200) {
        const resObj = res?.data?.data as ApiResponseSelfSchedule['data'];
        setResSendToCandidate(resObj);
        setStepScheduling('success_screen');
      } else {
        throw new Error('Error sending to candidate.');
      }
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Error sending to candidate. Please contact support.',
      });
    } finally {
      setIsSendingToCandidate(false);
    }
  };

  const resetStateSelfScheduling = () => {
    if (!isSendingToCandidate && !fetchingPlan) {
      setNoOptions(false);
      setIsSelfScheduleDrawerOpen(false);
      setSchedulingOptions([]);
      setFilteredSchedulingOptions([]);
      setStepScheduling('slot_options');
      setErrorNoSlotFilter(false);
    }
  };

  return {
    onClickPrimary,
    resetStateSelfScheduling,
  };
};
