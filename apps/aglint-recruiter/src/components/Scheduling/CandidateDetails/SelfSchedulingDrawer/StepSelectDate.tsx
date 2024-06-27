import { APIFindAvailability } from '@aglint/shared-types';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import { DatePickerBody } from '@/devlink3/DatePickerBody';
import DateRange from '@/src/components/Tasks/Components/DateRange';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { ApiBodyParamsScheduleAgent } from '@/src/pages/api/scheduling/application/schedulewithagent';
import { ApiBodyParamsScheduleAgentWithoutTaskId } from '@/src/pages/api/scheduling/application/schedulewithagentwithouttaskid';
import { getFullName } from '@/src/utils/jsonResume';
import toast from '@/src/utils/toast';

import { useAllActivities, useGetScheduleApplication } from '../hooks';
import { useRequestAvailabilityContext } from '../RequestAvailability/RequestAvailabilityContext';
import { setSelectedSessionIds, useSchedulingApplicationStore } from '../store';
import { ApiResponseFindAvailability } from '../types';
import {
  setDateRange,
  setFetchingPlan,
  setIsScheduleNowOpen,
  setNoOptions,
  setSchedulingOptions,
  setStepScheduling,
  useSchedulingFlowStore,
} from './store';

function SelectDateRange() {
  const { recruiter, recruiterUser } = useAuthDetails();
  const router = useRouter();
  const { selectedSessionIds, selectedApplication } =
    useSchedulingApplicationStore((state) => ({
      selectedSessionIds: state.selectedSessionIds,
      selectedApplication: state.selectedApplication,
    }));
  const task_id = router.query.task_id as string;

  const { dateRange, fetchingPlan, scheduleFlow } = useSchedulingFlowStore(
    (state) => ({
      dateRange: state.dateRange,
      fetchingPlan: state.fetchingPlan,
      scheduleFlow: state.scheduleFlow,
    }),
  );

  const { fetchInterviewDataByApplication } = useGetScheduleApplication();
  const { refetch } = useAllActivities({
    application_id: selectedApplication?.id,
  });

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
      resetState();
    } catch (e) {
      //
    } finally {
      refetch();
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
  };

  const { setSelectedDate } = useRequestAvailabilityContext();

  return (
    <>
      <DatePickerBody
        isLoading={false}
        slotMuiDatePicker={
          <DateRange
            onChange={(val) => {
              setDateRange({
                start_date: val[0]?.toISOString(),
                end_date: val[1]?.toISOString(),
              });
            }}
            value={[dayjs(dateRange.start_date), dayjs(dateRange.end_date)]}
            calendars={2}
          />
        }
        isEmailAgent={scheduleFlow === 'email_agent'}
        isPhoneAgent={scheduleFlow === 'phone_agent'}
        isRequestAvailability={false}
        isContinueButton={
          scheduleFlow !== 'email_agent' && scheduleFlow !== 'phone_agent'
        }
        isSelfScheduling={scheduleFlow === 'self_scheduling'}
        onClickButton={{
          onClick: async () => {
            if (dateRange.start_date && dateRange.end_date && !fetchingPlan) {
              if (
                scheduleFlow === 'self_scheduling' ||
                scheduleFlow === 'debrief'
              ) {
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
          },
        }}
      />
    </>
  );
}

export default SelectDateRange;
