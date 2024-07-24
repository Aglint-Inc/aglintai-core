import { APIFindAvailability } from '@aglint/shared-types';
import { getFullName } from '@aglint/shared-utils';
import axios from 'axios';
import dayjs from 'dayjs';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { ApiBodyParamsScheduleAgent } from '@/src/pages/api/scheduling/application/schedulewithagent';
import { ApiBodyParamsScheduleAgentWithoutTaskId } from '@/src/pages/api/scheduling/application/schedulewithagentwithouttaskid';
import {
  ApiBodyParamsSendToCandidate,
  ApiResponseSendToCandidate,
} from '@/src/pages/api/scheduling/application/sendtocandidate';
import toast from '@/src/utils/toast';

import { useGetScheduleApplication } from '../queries/hooks';
import { useRequestAvailabilityContext } from '../RequestAvailability/RequestAvailabilityContext';
import {
  setIsSendingToCandidate,
  setRequestSessionIds,
  setRescheduleSessionIds,
  setSelectedApplicationLog,
  setSelectedSessionIds,
  setSelectedTasks,
  useSchedulingApplicationStore,
} from '../store';
import { ApiResponseFindAvailability } from '../types';
import { getTaskDetails } from '../utils';
import { filterSchedulingOptionsArray } from './BodyDrawer/StepScheduleFilter/utils';
import {
  setErrorNoSlotFilter,
  setFetchingPlan,
  setFilteredSchedulingOptions,
  setIsScheduleNowOpen,
  setNoOptions,
  setNoSlotReasons,
  setRequestAvailibityId,
  setResSendToCandidate,
  setSchedulingOptions,
  setSelectedTaskId,
  setStepScheduling,
  useSchedulingFlowStore,
} from './store';

export const useSchedulingDrawer = ({ refetch }: { refetch: () => void }) => {
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
    selectedTaskId,
  } = useSchedulingFlowStore((state) => ({
    dateRange: state.dateRange,
    filteredSchedulingOptions: state.filteredSchedulingOptions,
    stepScheduling: state.stepScheduling,
    filters: state.filters,
    selectedCombIds: state.selectedCombIds,
    schedulingOptions: state.schedulingOptions,
    fetchingPlan: state.fetchingPlan,
    scheduleFlow: state.scheduleFlow,
    selectedTaskId: state.selectedTaskId,
  }));

  const { fetchInterviewDataByApplication } = useGetScheduleApplication();

  const { setSelectedDate } = useRequestAvailabilityContext();

  const onClickPrimary = async () => {
    if (scheduleFlow === 'self_scheduling' || scheduleFlow === 'debrief') {
      await selfSchedulingOrDebriefFlow();
    } else if (
      scheduleFlow === 'phone_agent' ||
      scheduleFlow === 'email_agent'
    ) {
      await agentFlow();
    } else if (
      scheduleFlow === 'create_request_availibility' ||
      scheduleFlow === 'update_request_availibility'
    ) {
      await requestAvailabilityFlow();
    }
  };

  const selfSchedulingOrDebriefFlow = async () => {
    if (stepScheduling === 'pick_date') {
      setNoOptions(false);
      const resOptions = await findScheduleOptions({
        dateRange: dateRange,
        session_ids: selectedSessionIds,
        rec_id: recruiter.id,
      });
      // if api return empty array if user select same date and break duration is more than 1 day
      if (resOptions.length === 0) {
        setNoOptions(true);
        return;
      }
      setSchedulingOptions(resOptions); // this is global state which we dont alter in self scheduling flow

      const filterSlots = filterSchedulingOptionsArray({
        schedulingOptions: resOptions,
        filters: {
          isNoConflicts: true,
          isSoftConflicts: true,
          isHardConflicts: true,
          isOutSideWorkHours: true,
          preferredInterviewers: [],
          preferredDateRanges: [],
          isWorkLoad: false,
        },
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
      }
      setStepScheduling('preference');
    } else if (stepScheduling === 'preference') {
      // here we put user selected filters and generate combinations
      const filterSlots = filterSchedulingOptionsArray({
        schedulingOptions,
        filters,
      });

      if (filterSlots.numberTotal < 5) {
        setErrorNoSlotFilter(true);
        return;
      } else {
        setErrorNoSlotFilter(false);
      }

      setFilteredSchedulingOptions(filterSlots.combs); // this is used for rendering combinations in slot options step
      setStepScheduling('slot_options');
    } else if (stepScheduling === 'slot_options') {
      if (scheduleFlow === 'debrief') {
        // isDebrief is not neccessary here but its an extra check
        if (isDebrief && selectedCombIds.length === 0) {
          toast.warning('Please select a time slot to schedule.');
          return;
        }
        if (!isSendingToCandidate) {
          await onClickSendToCandidate();
        }
      } else if (scheduleFlow === 'self_scheduling') {
        // if it normal session then user has to select atleast 5 combinations
        if (!isDebrief && selectedCombIds.length < 5) {
          toast.warning('Please select at least 5 time slots to schedule.');
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

  const agentFlow = async () => {
    if (
      stepScheduling === 'pick_date' &&
      (scheduleFlow === 'phone_agent' || scheduleFlow === 'email_agent')
    ) {
      await onClickScheduleAgent(scheduleFlow);
    }
  };

  const requestAvailabilityFlow = async () => {
    if (stepScheduling === 'pick_date') {
      setSelectedDate([dayjs(dateRange.start_date), dayjs(dateRange.end_date)]);
      setStepScheduling('request_availibility');
    }
  };

  const onClickSendToCandidate = async () => {
    try {
      setIsSendingToCandidate(true);
      const plans = filteredSchedulingOptions.map((opt) => opt.plans).flat();
      const selectedDebrief = plans.find(
        (opt) => selectedCombIds[0] === opt.plan_comb_id,
      );
      const selectedSlots = plans.filter((opt) =>
        selectedCombIds.includes(opt.plan_comb_id),
      );

      const bodyParams: ApiBodyParamsSendToCandidate = {
        dateRange,
        initialSessions,
        is_debrief: isDebrief,
        recruiter_id: recruiter.id,
        recruiterUser,
        selectedApplication,
        selectedSessionIds,
        selectedDebrief,
        user_tz: dayjs.tz.guess(),
        selectedApplicationLog,
        selectedSlots,
        task_id: selectedTaskId,
      };
      const res = await axios.post(
        '/api/scheduling/application/sendtocandidate',
        bodyParams,
      );

      if (res.status === 200) {
        const resObj = res?.data?.data as ApiResponseSendToCandidate['data'];
        setResSendToCandidate(resObj); // this is used for copy link in the final step of self scheduling
        if (isDebrief) {
          setIsScheduleNowOpen(false);
          toast.success('Debrief scheduled');
        } else {
          setStepScheduling('success_screen');
        }
        refetch();
        const data = await getTaskDetails(selectedApplication.id);
        setSelectedTasks(data);
      } else {
        throw new Error('Error sending to candidate.');
      }
    } catch (e) {
      toast.error('Error sending to candidate.');
    } finally {
      setIsSendingToCandidate(false);
      fetchInterviewDataByApplication();
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
          return [];
        }
        return slots;
      } else {
        toast.error('Error retrieving availability.');
        return [];
      }
    } catch (error) {
      toast.error('Error retrieving availability.');
      return [];
    } finally {
      setFetchingPlan(false);
    }
  };

  const onClickScheduleAgent = async (type: 'phone_agent' | 'email_agent') => {
    try {
      setFetchingPlan(true);

      const resOptions = await findScheduleOptions({
        dateRange: dateRange,
        session_ids: selectedSessionIds,
        rec_id: recruiter.id,
      });

      if (resOptions.length === 0) {
        setNoOptions(true);
        return;
      }

      const filterSlots = filterSchedulingOptionsArray({
        schedulingOptions: resOptions,
        filters,
      });

      if (filterSlots.numberNoConflicts === 0) {
        setNoOptions(true);
        return;
      }

      if (!selectedTaskId) {
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
          job_id: selectedApplication.job_id,
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
          task_id: selectedTaskId,
          type: type,
          candidate_name: getFullName(
            selectedApplication.candidates.first_name,
            selectedApplication.candidates.last_name,
          ),
          company_name: recruiter.name,
          rec_user_phone: recruiterUser.phone,
          rec_user_id: recruiterUser.user_id,
          user_tz: dayjs.tz.guess(),
          job_id: selectedApplication.job_id,
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
      fetchInterviewDataByApplication();
      refetch();
      setStepScheduling('agents_final_screen_cta');
      const data = await getTaskDetails(selectedApplication.id);
      setSelectedTasks(data);
      // resetStateSelfScheduling();
    } catch (e) {
      //
    } finally {
      setFetchingPlan(false);
    }
  };

  const resetStateSelfScheduling = () => {
    if (!isSendingToCandidate && !fetchingPlan) {
      setNoOptions(false);
      setIsScheduleNowOpen(false);
      setSchedulingOptions([]);
      setFilteredSchedulingOptions([]);
      setSelectedSessionIds([]);
      setStepScheduling('pick_date');
      setSelectedApplicationLog(null);
      setSelectedTaskId(null);
      setRequestSessionIds([]);
      setRescheduleSessionIds([]);
      setRequestAvailibityId(null);
      setErrorNoSlotFilter(false);
    }
  };

  return {
    onClickPrimary,
    resetStateSelfScheduling,
    findScheduleOptions,
    onClickScheduleAgent,
  };
};
