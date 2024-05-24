import { ApiFindAvailability } from '@aglint/shared-types';
import axios from 'axios';
import dayjs from 'dayjs';

import { DatePickerBody } from '@/devlink3/DatePickerBody';
import DateRange from '@/src/components/Tasks/Components/DateRange';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import toast from '@/src/utils/toast';

import {
  setDateRange,
  setFetchingPlan,
  setNoOptions,
  setSchedulingOptions,
  setStepScheduling,
  setTotalSlots,
  useSchedulingApplicationStore,
} from '../store';
import { ApiResponseFindAvailability } from '../types';

function SelectDateRange() {
  const { recruiter } = useAuthDetails();
  const { dateRange, initialSessions, selectedSessionIds, fetchingPlan } =
    useSchedulingApplicationStore((state) => ({
      dateRange: state.dateRange,
      initialSessions: state.initialSessions,
      selectedSessionIds: state.selectedSessionIds,
      fetchingPlan: state.fetchingPlan,
    }));

  const isDebrief = initialSessions
    .filter((ses) => selectedSessionIds.includes(ses.id))
    .some((ses) => ses.session_type === 'debrief');

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
      } as ApiFindAvailability);

      if (res.status === 200) {
        const respTyped = res.data as ApiResponseFindAvailability;
        if (respTyped.plan_combs.length === 0) {
          toast.error('No availability found.');
        } else {
          setTotalSlots(respTyped.total);
          setSchedulingOptions(respTyped.plan_combs);
          setStepScheduling('slot_options');
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

  return (
    <>
      <DatePickerBody
        slotMuiDatePicker={
          <DateRange
            onChange={(val) => {
              setDateRange({
                start_date: val[0].toISOString(),
                end_date: val[1].toISOString(),
              });
            }}
            value={[dayjs(dateRange.start_date), dayjs(dateRange.end_date)]}
            calendars={2}
          />
        }
        isEmailAgent={false}
        isPhoneAgent={false}
        isRequestAvailability={false}
        isContinueButton={true}
        isSelfScheduling={true}
        onClickButton={{
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
      />
    </>
  );
}

export default SelectDateRange;
