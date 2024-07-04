import { APIFindAvailability } from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { ApiBodyParamsScheduleAgent } from '@/src/pages/api/scheduling/application/schedulewithagent';
import { ApiBodyParamsScheduleAgentWithoutTaskId } from '@/src/pages/api/scheduling/application/schedulewithagentwithouttaskid';
import { ApiBodyParamsSendToCandidate } from '@/src/pages/api/scheduling/application/sendtocandidate';
import { createCombsForMultiDaySlots } from '@/src/services/CandidateScheduleV2/utils/createCombsForMultiDaySlots';
import toast from '@/src/utils/toast';

import { useGetScheduleApplication } from '../hooks';
import { useRequestAvailabilityContext } from '../RequestAvailability/RequestAvailabilityContext';
import {
  setIsSendingToCandidate,
  setRequestSessionIds,
  setRescheduleSessionIds,
  setSelectedApplicationLog,
  setSelectedSessionIds,
  useSchedulingApplicationStore,
} from '../store';
import { ApiResponseFindAvailability } from '../types';
import { filterSchedulingOptionsArray } from './StepScheduleFilter/utils';
import {
  setFetchingPlan,
  setFilteredSchedulingOptions,
  setIsScheduleNowOpen,
  setNoOptions,
  setSchedulingOptions,
  setStepScheduling,
  useSchedulingFlowStore,
} from './store';

export const useSelfSchedulingDrawer = () => {
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

  const isDebrief = initialSessions
    .filter((ses) => selectedSessionIds.includes(ses.interview_session.id))
    .some((ses) => ses.interview_session.session_type === 'debrief');

  const {
    dateRange,
    filteredSchedulingOptions,
    stepScheduling,
    selectedCombIds,
    filters,
    schedulingOptions,
    fetchingPlan,
    scheduleFlow,
  } = useSchedulingFlowStore((state) => ({
    dateRange: state.dateRange,
    filteredSchedulingOptions: state.filteredSchedulingOptions,
    stepScheduling: state.stepScheduling,
    filters: state.filters,
    selectedCombIds: state.selectedCombIds,
    schedulingOptions: state.schedulingOptions,
    fetchingPlan: state.fetchingPlan,
    scheduleFlow: state.scheduleFlow,
  }));

  const task_id = router.query.task as string;

  const { fetchInterviewDataByApplication } = useGetScheduleApplication();

  const { setSelectedDate } = useRequestAvailabilityContext();

  const onClickPrimary = async () => {
    if (stepScheduling === 'pick_date') {
      if (scheduleFlow === 'self_scheduling' || scheduleFlow === 'debrief') {
        await findScheduleOptions({
          dateRange: dateRange,
          session_ids: selectedSessionIds,
          rec_id: recruiter.id,
        });
      } else if (
        scheduleFlow === 'phone_agent' ||
        scheduleFlow === 'email_agent'
      ) {
        await onClickScheduleAgent(scheduleFlow);
      } else if (
        scheduleFlow === 'create_request_availibility' ||
        scheduleFlow === 'update_request_availibility'
      ) {
        setSelectedDate([
          dayjs(dateRange.start_date),
          dayjs(dateRange.end_date),
        ]);
        setStepScheduling('request_availibility');
      }
    }

    if (stepScheduling === 'preference') {
      generateCombinations();
    } else if (stepScheduling === 'slot_options') {
      if (!isSendingToCandidate) {
        await onClickSendToCandidate();
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
      removeQueryParams();
      setRequestSessionIds([]);
      setRescheduleSessionIds([]);
    }
  };

  const removeQueryParams = () => {
    const currentPath = router.pathname;
    const currentQuery = { ...router.query };
    delete currentQuery.task_id;
    router.replace({
      pathname: currentPath,
      query: currentQuery,
    });
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
      fetchInterviewDataByApplication();
      setSelectedSessionIds([]);
    }
  };

  const findScheduleOptions = async ({
    session_ids,
    rec_id,
    dateRange,
  }: {
    session_ids: string[];
    rec_id: string;
    dateRange: {
      start_date: string;
      end_date: string;
    };
  }) => {
    try {
      setNoOptions(false);
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
      const res = await axios.post(
        '/api/scheduling/v1/find_availability',
        bodyParams,
      );

      if (res.status === 200) {
        const slots = res.data as ApiResponseFindAvailability;

        if (slots.length === 0) {
          setNoOptions(true);
          toast.error('No availability found.');
        } else {
          setSchedulingOptions(slots);
          setStepScheduling('preference');
        }
      } else {
        toast.error('Error retrieving availability.');
      }
    } catch (e) {
      toast.error(e.message);
      //
    } finally {
      setFetchingPlan(false);
    }
  };

  const onClickScheduleAgent = async (type: 'phone_agent' | 'email_agent') => {
    try {
      setFetchingPlan(true);
      const bodyParamsAvailibility: APIFindAvailability = {
        session_ids: selectedSessionIds,
        recruiter_id: recruiter.id,
        start_date_str: dayjs(dateRange.start_date).format('DD/MM/YYYY'),
        end_date_str: dayjs(dateRange.end_date).format('DD/MM/YYYY'),
        candidate_tz: dayjs.tz.guess(),
      };

      const resAllOptions = await axios.post(
        '/api/scheduling/v1/find_availability',
        bodyParamsAvailibility,
      );

      if (resAllOptions.data.length === 0) {
        toast.warning('No availability found.');
        return;
      }

      if (!task_id) {
        const bodyParams: ApiBodyParamsScheduleAgentWithoutTaskId = {
          application_id: selectedApplication.id,
          dateRange: dateRange,
          recruiter_id: recruiter.id,
          recruiter_user_name: getFullName(
            recruiterUser.first_name,
            recruiterUser.last_name,
          ),
          session_ids: selectedSessionIds,
          task_id: null,
          type: type,
          candidate_name: getFullName(
            selectedApplication.candidates.first_name,
            selectedApplication.candidates.last_name,
          ),
          company_name: recruiter.name,
          rec_user_phone: recruiterUser.phone,
          rec_user_id: recruiterUser.user_id,
          user_tz: dayjs.tz.guess(),
          trigger_count: 0,
        };

        const res = await axios.post(
          '/api/scheduling/application/schedulewithagentwithouttaskid',
          bodyParams,
        );

        if (res.status !== 200) {
          toast.error(
            'Failed to schedule with agent. Please try again later or contact support.',
          );
        }
      } else {
        const bodyParams: ApiBodyParamsScheduleAgent = {
          application_id: selectedApplication.id,
          dateRange: dateRange,
          recruiter_id: recruiter.id,
          recruiter_user_name: getFullName(
            recruiterUser.first_name,
            recruiterUser.last_name,
          ),
          session_ids: selectedSessionIds,
          task_id: task_id,
          type: type,
          candidate_name: getFullName(
            selectedApplication.candidates.first_name,
            selectedApplication.candidates.last_name,
          ),
          company_name: recruiter.name,
          rec_user_phone: recruiterUser.phone,
          rec_user_id: recruiterUser.user_id,
          user_tz: dayjs.tz.guess(),
        };

        const res = await axios.post(
          '/api/scheduling/application/schedulewithagentwithouttaskid',
          bodyParams,
        );

        if (res.status !== 200) {
          toast.error(
            'Failed to schedule with agent. Please try again later or contact support.',
          );
        }
      }
    } catch (e) {
      //
    } finally {
      setFetchingPlan(false);
      fetchInterviewDataByApplication();
      setSelectedSessionIds([]);
      resetState();
    }
  };

  const resetState = () => {
    setIsScheduleNowOpen(false);
    setSchedulingOptions([]);
    setSelectedSessionIds([]);
    setStepScheduling('pick_date');
    const currentPath = router.pathname;
    const currentQuery = { ...router.query };
    delete currentQuery.task_id;
    router.replace({
      pathname: currentPath,
      query: currentQuery,
    });
  };

  return {
    onClickPrimary,
    resetStateSelfScheduling,
    removeQueryParams,
    findScheduleOptions,
    onClickScheduleAgent,
  };
};
