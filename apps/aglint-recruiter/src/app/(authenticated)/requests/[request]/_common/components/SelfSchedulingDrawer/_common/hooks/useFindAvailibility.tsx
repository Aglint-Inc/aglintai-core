import {
  dayjsLocal,
  type schema_find_availability_payload,
} from '@aglint/shared-utils';
import { useToast } from '@components/hooks/use-toast';
import { useRequest } from '@request/hooks';
import { useMeetingList } from '@requests/hooks';
import { type ApiResponseFindAvailability } from '@requests/types';
import axios from 'axios';
import { type z } from 'zod';

import { useTenant } from '@/company/hooks';

import {
  initialFilters,
  type SelfSchedulingFlow,
  setAvailabilities,
  setCalendarDate,
  setFetchingPlan,
  setFilteredSchedulingOptions,
  setFilters,
  setLocalFilters,
  setNoOptions,
  setNoSlotsReasons,
  setSchedulingOptions,
} from '../store/store';
import { filterSchedulingOptionsArray } from '../utils/filterSchedulingOptionsArray';
import { transformAvailability } from '../utils/transformAvailability';

export const useFindAvailibility = () => {
  const { toast } = useToast();
  const { recruiter } = useTenant();
  const { data: allSessions } = useMeetingList();
  const { requestDetails } = useRequest();

  const selectedSessionIds = allSessions?.map(
    (session) => session.interview_session.id,
  );

  //it is called when filters changed
  const findAvailibility = async ({
    filters,
  }: {
    filters: SelfSchedulingFlow['filters'];
  }) => {
    setNoOptions(false);
    const resOptions = await findScheduleOptions({
      dateRange: {
        start_date: filters.dateRange.start,
        end_date: filters.dateRange.end,
      },
      session_ids: selectedSessionIds,
      rec_id: recruiter?.id || '',
      selected_ints: filters.preferredInterviewers.map((ele) => ({
        session_id: ele.session_id,
        qualified_ints: ele.user_ids.map((ele) => ({
          user_id: ele,
        })),
      })),
    });

    if (!resOptions) {
      return;
    }

    //calendar resourrce view
    if (resOptions?.availabilities) {
      const { events, resources } = transformAvailability(
        resOptions.availabilities,
      );
      setAvailabilities({
        events,
        resources,
      });
      setCalendarDate(filters.dateRange.start);
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
    selected_ints,
  }: {
    session_ids: string[];
    rec_id: string;
    dateRange: {
      start_date: string;
      end_date: string;
    };
    isNoConflictsOnly?: boolean;
    selected_ints?: z.input<
      typeof schema_find_availability_payload
    >['selected_ints'];
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
        selected_ints,
      };
      if (isNoConflictsOnly) {
        delete bodyParams.options;
      }
      const res = await axios.post(
        '/api/scheduling/v1/find_availability',
        bodyParams,
      );

      if (res.data.slots) {
        const resAvail = res.data as ApiResponseFindAvailability;
        return resAvail;
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: error?.response?.data?.error || 'Error retrieving availability.',
      });
      return null;
    } finally {
      setFetchingPlan(false);
    }
  };

  //it is called send self scheduling button clicked
  const onClickFindAvailability = async () => {
    const preferredInterviewers = allSessions.map((session) => ({
      session_id: session.interview_session.id,
      user_ids: session.users
        .filter(
          (user) =>
            user.interview_session_relation.interviewer_type === 'qualified',
        )
        .slice(0, session.interview_session.interviewer_cnt)
        .map((user) => user.user_details.user_id),
    }));
    setFilters({
      preferredInterviewers,
    });
    setLocalFilters({
      preferredInterviewers,
    });
    await findAvailibility({
      filters: {
        ...initialFilters,
        dateRange: dayjsLocal(requestDetails.schedule_start_date).isBefore(
          dayjsLocal(),
          'day',
        )
          ? {
              start: requestDetails.schedule_start_date,
              end: requestDetails.schedule_end_date,
            }
          : {
              start: dayjsLocal().toISOString(),
              end: dayjsLocal().add(7, 'day').toISOString(),
            },
        preferredInterviewers,
      },
    });
  };

  return { findAvailibility, onClickFindAvailability };
};
