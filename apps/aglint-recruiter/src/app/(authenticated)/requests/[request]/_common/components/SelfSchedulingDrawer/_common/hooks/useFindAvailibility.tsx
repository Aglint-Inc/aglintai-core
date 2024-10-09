import {
  dayjsLocal,
  type schema_find_availability_payload,
} from '@aglint/shared-utils';
import { useToast } from '@components/hooks/use-toast';
import { useMeetingList } from '@requests/hooks';
import { type ApiResponseFindAvailability } from '@requests/types';
import axios from 'axios';
import { type z } from 'zod';

import { useTenant } from '@/company/hooks';

import { filterSchedulingOptionsArray } from '../components/BodyDrawer/ScheduleFilter/utils';
import {
  type SelfSchedulingFlow,
  setAvailabilities,
  setCalendarDate,
  setFetchingPlan,
  setFilteredSchedulingOptions,
  setNoOptions,
  setNoSlotsReasons,
  setSchedulingOptions,
} from '../store/store';
import { transformAvailability } from '../utils/utils';

export const useFindAvailibility = () => {
  const { toast } = useToast();
  const { recruiter } = useTenant();
  const { data: allSessions } = useMeetingList();

  const selectedSessionIds = allSessions?.map(
    (session) => session.interview_session.id,
  );

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
      rec_id: recruiter?.id || '',
    });

    //calendar resourrce view
    if (resOptions?.availabilities) {
      const { events, resources } = transformAvailability(
        resOptions.availabilities,
      );
      setAvailabilities({
        events,
        resources,
      });
      setCalendarDate(dateRange.start_date);
    }
    //calendar resourrce view

    // if api return empty array if user select same date and break duration is more than 1 day
    if (resOptions?.slots?.length === 0) {
      setNoOptions(true);
      return;
    }

    setSchedulingOptions(resOptions?.slots || []); // this is global state which we dont alter in self scheduling flow

    const filterSlots = filterSchedulingOptionsArray({
      schedulingOptions: resOptions?.slots || [],
      filters,
    }); // before taking to preference step we generate combinations with all filters true to check if there are any slots available

    // numberTotal is the total number of slots available (including conflicts)
    if (filterSlots.numberTotal < 5) {
      setNoSlotsReasons(
        filterSlots.combs.filter((comb) =>
          comb.plans.some((plan) => plan.no_slot_reasons.length > 0),
        ),
      );
      setNoOptions(true);
      return;
    } else {
      setNoOptions(false);
      setNoSlotsReasons([]);
      setFilteredSchedulingOptions(filterSlots.combs);
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
      const bodyParams: z.input<typeof schema_find_availability_payload> = {
        session_ids: session_ids,
        recruiter_id: rec_id,
        start_date_str: dayjsLocal(dateRange.start_date).format('DD/MM/YYYY'),
        end_date_str: dayjsLocal(dateRange.end_date).format('DD/MM/YYYY'),
        candidate_tz: dayjsLocal.tz.guess(),
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
      if (error instanceof Error) {
        toast({
          variant: 'destructive',
          title: error?.message
            ? error.message
            : 'Error retrieving availability.',
        });
      }
      return null;
    } finally {
      setFetchingPlan(false);
    }
  };

  return { findAvailibility };
};
