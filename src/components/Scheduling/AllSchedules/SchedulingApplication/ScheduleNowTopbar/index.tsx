import { Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axios from 'axios';
import dayjs from 'dayjs';

import { ScheduleNowButton } from '@/devlink3';
import LoaderGrey from '@/src/components/Common/LoaderGrey';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { ApiBodyParamsScheduleAgent } from '@/src/pages/api/scheduling/application/schedulewithagent';
import { BodyParams } from '@/src/pages/api/scheduling/v1/find_availability';
import { PlanCombinationRespType } from '@/src/types/scheduleTypes/types';
import { getFullName } from '@/src/utils/jsonResume';
import toast from '@/src/utils/toast';

import { useAllActivities, useGetScheduleApplication } from '../hooks';
import {
  setDateRange,
  setFetchingPlan,
  setIsScheduleNowOpen,
  setNoOptions,
  setSchedulingOptions,
  setSelectedSessionIds,
  setTotalSlots,
  useSchedulingApplicationStore,
} from '../store';

function ScheduleNowTopbar({ isDebrief }: { isDebrief: boolean }) {
  const { recruiter, recruiterUser } = useAuthDetails();
  const currentDate = dayjs();

  const { selectedSessionIds, dateRange, fetchingPlan, selectedApplication } =
    useSchedulingApplicationStore((state) => ({
      selectedSessionIds: state.selectedSessionIds,
      dateRange: state.dateRange,
      fetchingPlan: state.fetchingPlan,
      selectedApplication: state.selectedApplication,
    }));

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
      const res = await axios.post('/api/scheduling/v1/find_availability', {
        session_ids: session_ids,
        recruiter_id: rec_id,
        start_date: dayjs(dateRange.start_date).format('DD/MM/YYYY'),
        end_date: dayjs(dateRange.end_date).format('DD/MM/YYYY'),
        user_tz: dayjs.tz.guess(),
        is_debreif: isDebrief,
      } as BodyParams);

      if (res.status === 200) {
        const respTyped = res.data as {
          plan_combs: PlanCombinationRespType[];
          total: number;
        };
        if (respTyped.plan_combs.length === 0) {
          toast.error('No availability found.');
        } else {
          setTotalSlots(respTyped.total);
          setSchedulingOptions(respTyped.plan_combs);
          setIsScheduleNowOpen(true);
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
      const res = await axios.post(
        '/api/scheduling/application/schedulewithagentwithouttaskid',
        {
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
        } as ApiBodyParamsScheduleAgent,
      );

      if (!res) {
        toast.error(
          'Failed to schedule with agent. Please try again later or contact support.',
        );
      }
      setSelectedSessionIds([]);
    } catch (e) {
      //
    } finally {
      refetch();
      setFetchingPlan(false);
      fetchInterviewDataByApplication();
    }
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          disabled={fetchingPlan}
          value={dayjs(dateRange?.start_date)}
          onChange={(newValue) => {
            if (dayjs(newValue) < dayjs(dateRange?.end_date)) {
              setDateRange({
                start_date: dayjs(newValue)?.toISOString(),
                end_date: dateRange?.end_date,
              });
            } else {
              setDateRange({
                start_date: dayjs(newValue).isValid()
                  ? dayjs(newValue)?.toISOString()
                  : null,
                end_date: null,
              });
            }
          }}
          minDate={currentDate}
          slotProps={{
            textField: {
              fullWidth: true,
              variant: 'outlined',
              margin: 'none',
              placeholder: 'Start Date',
            },
          }}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          disabled={fetchingPlan}
          value={dayjs(dateRange?.end_date)}
          minDate={dayjs(dateRange?.start_date)}
          maxDate={dayjs(dateRange?.start_date).add(1, 'month')}
          onChange={(newValue) => {
            setDateRange({
              start_date: dateRange?.start_date,
              end_date: dayjs(newValue)?.toISOString(),
            });
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              variant: 'outlined',
              margin: 'none',
              placeholder: 'End Date',
            },
          }}
        />
      </LocalizationProvider>
      <ScheduleNowButton
        onClickMySelf={{
          onClick: async () => {
            if (dateRange.start_date && dateRange.end_date && !fetchingPlan) {
              await findScheduleOptions({
                dateRange: dateRange,
                session_ids: selectedSessionIds,
                rec_id: recruiter.id,
              });
            }
          },
        }}
        isHoverScheduleVisible={!isDebrief}
        isLoaderVisible={fetchingPlan}
        slotLoaderIcon={
          <Stack p={1.5}>
            <LoaderGrey />
          </Stack>
        }
        onClickScheduleManually={{
          onClick: async () => {
            if (dateRange.start_date && dateRange.end_date && !fetchingPlan) {
              await findScheduleOptions({
                dateRange: dateRange,
                session_ids: selectedSessionIds,
                rec_id: recruiter.id,
              });
            }
          },
        }}
        isScheduleManuallyVisible={true}
        onClickEmailAgent={{
          onClick: async () => {
            if (!fetchingPlan) onClickScheduleAgent('email_agent');
          },
        }}
        onClickPhoneAgent={{
          onClick: async () => {
            if (!fetchingPlan) onClickScheduleAgent('phone_agent');
          },
        }}
      />
    </>
  );
}

export default ScheduleNowTopbar;
