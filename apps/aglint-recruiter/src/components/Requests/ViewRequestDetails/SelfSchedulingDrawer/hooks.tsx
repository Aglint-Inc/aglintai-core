import { APIFindAvailability } from '@aglint/shared-types';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import { setNoSlotReasons } from '@/src/components/Scheduling/CandidateDetails/SchedulingDrawer/store';
import { ApiResponseFindAvailability } from '@/src/components/Scheduling/CandidateDetails/types';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { ApiBodyParamsSelfSchedule } from '@/src/pages/api/scheduling/application/sendselfschedule';
import { ApiResponseSendToCandidate } from '@/src/pages/api/scheduling/application/sendtocandidate';
import toast from '@/src/utils/toast';

import { useMeetingList } from '../hooks';
import { filterSchedulingOptionsArray } from './BodyDrawer/ScheduleFilter/utils';
import {
  SelfSchedulingFlow,
  setAnchorEl,
  setAvailabilities,
  setCalendarDate,
  setDateRange,
  setErrorNoSlotFilter,
  setFetchingPlan,
  setFilteredSchedulingOptions,
  setFilterLoading,
  setFilters,
  setIsSelfScheduleDrawerOpen,
  setIsSendingToCandidate,
  setNoOptions,
  setResSendToCandidate,
  setSchedulingOptions,
  setStepScheduling,
  useSelfSchedulingFlowStore,
} from './store';
import { transformAvailability } from './utils';

export const useSelfSchedulingDrawer = ({
  refetch,
}: {
  refetch: () => void;
}) => {
  const router = useRouter();
  const { recruiter, recruiterUser } = useAuthDetails();
  const request_id = router.query.id as string;
  const { data } = useMeetingList();
  const allSessions = data || [];
  const selectedSessionIds = allSessions?.map(
    (session) => session.interview_session.id,
  );
  const application_id = allSessions[0]?.interview_meeting.application_id;

  const {
    dateRange,
    filteredSchedulingOptions,
    stepScheduling,
    selectedCombIds,
    schedulingOptions,
    fetchingPlan,
    isSendingToCandidate,
    localFilters,
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

  const onClickPrimary = async () => {
    await selfSchedulingOrDebriefFlow();
  };

  const findAvailibility = async ({
    filters,
    dateRange,
  }: {
    filters: SelfSchedulingFlow['filters'];
    dateRange: SelfSchedulingFlow['dateRange'];
  }) => {
    setNoOptions(false);
    const resOptions = await findScheduleOptions({
      dateRange: dateRange,
      session_ids: selectedSessionIds,
      rec_id: recruiter.id,
    });
    // if api return empty array if user select same date and break duration is more than 1 day
    if (resOptions?.slots?.length === 0) {
      setNoOptions(true);
      return;
    }
    setSchedulingOptions(resOptions?.slots); // this is global state which we dont alter in self scheduling flow

    const filterSlots = filterSchedulingOptionsArray({
      schedulingOptions: resOptions?.slots,
      filters,
    }); // before taking to preference step we generate combinations with all filters true to check if there are any slots available

    // numberTotal is the total number of slots available (including conflicts)
    if (filterSlots.numberTotal < 5) {
      setNoSlotReasons(
        filterSlots.combs.filter((comb) =>
          comb.plans.some((plan) => plan.no_slot_reasons.length > 0),
        ),
      );
      setNoOptions(true);
      return;
    } else {
      setNoOptions(false);
      setNoSlotReasons([]);
      setFilteredSchedulingOptions(filterSlots.combs);
    }

    const { events, resources } = transformAvailability(
      resOptions.availabilities,
    );
    setAvailabilities({
      events,
      resources,
    });
    setCalendarDate(dateRange.start_date);
  };

  const filterSlots = async () => {
    setFilterLoading(true);

    const newFilters = {
      isNoConflicts: localFilters.isNoConflicts,
      isSoftConflicts: localFilters.isSoftConflicts,
      isHardConflicts: localFilters.isHardConflicts,
      isOutSideWorkHours: localFilters.isOutSideWorkHours,
      preferredInterviewers: localFilters.preferredInterviewers,
      preferredDateRanges: localFilters.preferredDateRanges,
      isWorkLoad: localFilters.isWorkLoad,
    };
    setFilters(newFilters);
    setDateRange({
      start_date: localFilters.dateRange.start,
      end_date: localFilters.dateRange.end,
    });
    if (
      dayjs(localFilters.dateRange.start).isSame(
        dayjs(dateRange.start_date),
        'day',
      ) &&
      dayjs(localFilters.dateRange.end).isSame(dayjs(dateRange.end_date), 'day')
    ) {
      const filterSlots = filterSchedulingOptionsArray({
        schedulingOptions,
        filters: newFilters,
      });

      if (filterSlots.numberTotal < 5) {
        setErrorNoSlotFilter(true);
        return;
      } else {
        setErrorNoSlotFilter(false);
      }
      setFilteredSchedulingOptions(filterSlots.combs);
    } else {
      await findAvailibility({
        filters: newFilters,
        dateRange: {
          start_date: localFilters.dateRange.start,
          end_date: localFilters.dateRange.end,
        },
      });
    }
    setFilterLoading(false);
    setAnchorEl(null);
  };

  const selfSchedulingOrDebriefFlow = async () => {
    if (stepScheduling === 'slot_options') {
      // if it normal session then user has to select atleast 5 combinations
      if (selectedCombIds.length < 5) {
        toast.warning('Please select at least 5 time slots to schedule.');
        return;
      }
      setStepScheduling('self_scheduling_email_preview');
    } else if (stepScheduling === 'self_scheduling_email_preview') {
      if (!isSendingToCandidate) {
        await onClickSendToCandidate();
      }
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
        recruiterUser,
        selectedSlots,
        application_id,
        request_id,
      };
      const res = await axios.post(
        '/api/scheduling/application/sendselfschedule',
        bodyParams,
      );

      if (res.status === 200) {
        const resObj = res?.data?.data as ApiResponseSendToCandidate['data'];
        setResSendToCandidate(resObj);
        setStepScheduling('success_screen');
        refetch();
      } else {
        throw new Error('Error sending to candidate.');
      }
    } catch (e) {
      toast.error('Error sending to candidate.');
    } finally {
      setIsSendingToCandidate(false);
    }
  };

  const findScheduleOptions = async ({
    session_ids,
    rec_id,
    dateRange,
    isNoConflictsOnly = false,
  }: {
    session_ids: string[];
    rec_id: string;
    dateRange: {
      start_date: string;
      end_date: string;
    };
    isNoConflictsOnly?: boolean;
  }) => {
    try {
      setFetchingPlan(true);
      const bodyParams: APIFindAvailability = {
        session_ids: session_ids,
        recruiter_id: rec_id,
        start_date_str: dayjs(dateRange.start_date).format('DD/MM/YYYY'),
        end_date_str: dayjs(dateRange.end_date).format('DD/MM/YYYY'),
        candidate_tz: dayjs.tz.guess(),
        options: {
          include_conflicting_slots: {
            out_of_working_hrs: true,
            show_soft_conflicts: true,
            show_conflicts_events: true,
          },
        },
      };
      if (isNoConflictsOnly) {
        delete bodyParams.options;
      }
      const res = await axios.post(
        '/api/scheduling/v1/find_availability',
        bodyParams,
      );

      if (res.status === 200) {
        const resAvail = res.data as ApiResponseFindAvailability;
        return resAvail;
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error('Error retrieving availability.');
      return null;
    } finally {
      setFetchingPlan(false);
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
    findAvailibility,
    filterSlots,
  };
};
