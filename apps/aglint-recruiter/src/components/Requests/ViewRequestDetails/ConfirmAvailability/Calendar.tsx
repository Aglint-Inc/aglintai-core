import { getFullName } from '@aglint/shared-utils';
import { useEffect, useMemo } from 'react';

import CalendarResourceView from '@/src/components/Common/CalendarResourceView';
import { type Event } from '@/src/components/Common/CalendarResourceView/types';
import { getStringColor } from '@/src/components/Common/MuiAvatar';

import { transformAvailability } from '../SelfSchedulingDrawer/utils';
import { useRequestAvailabilityDetails } from './hooks';
import { useAvailabilityContext } from './RequestAvailabilityContext';
import {
  setCalendarDate,
  useConfirmAvailabilitySchedulingFlowStore,
} from './store';

function Calendar() {
  const { candidateAvailabilityId, calendarDate } =
    useConfirmAvailabilitySchedulingFlowStore();
  const { selectedDateSlots, selectedDayAvailableBlocks } =
    useAvailabilityContext();
  const { data: availableSlots, isLoading } = useRequestAvailabilityDetails({
    request_id: candidateAvailabilityId,
  });

  useEffect(() => {
    if (selectedDayAvailableBlocks && selectedDayAvailableBlocks[0]?.curr_date)
      setCalendarDate(selectedDayAvailableBlocks[0].curr_date);
  }, [selectedDayAvailableBlocks]);

  const { events, resources } = transformAvailability(
    availableSlots?.availabilities,
  );

  const selectedIds = selectedDateSlots
    .map((ele) => ele.selected_dates)
    .flat()
    .map((ele) => ele.plans)
    .flat()
    .map((ele) => ele.plan_comb_id)
    .flat();

  const memoizedSelectedEvents = useMemo(() => {
    const selectedSessions =
      availableSlots?.slots
        .flatMap((item) => item.selected_dates)
        .flatMap((item) => item.plans)
        .filter((plan) => selectedIds.includes(plan.plan_comb_id))
        .flatMap((plan) => plan.sessions) || [];

    const convertSelectedSessionsToEvents: Event[] = selectedSessions
      .map((session) => {
        const ints = [...session.qualifiedIntervs, ...session.trainingIntervs];
        return ints.map(
          (int) =>
            ({
              start: session.start_time,
              end: session.end_time,
              title: session.session_name,
              resourceId: int.user_id,
              id: crypto.randomUUID(),
              extendedProps: {
                conferenceData: null,
                color: getStringColor(
                  getFullName(int.first_name, int.last_name).charCodeAt(0),
                ).text,
                attendees: ints.map((interv) => ({
                  email: interv.email,
                  organizer: false,
                  responseStatus: 'needsAction',
                })),
                isSelected: true,
                session_id:
                  session.session_id + session.qualifiedIntervs[0].user_id,
              },
            }) as Event,
        );
      })
      .flat();

    return convertSelectedSessionsToEvents;
  }, [selectedIds]);

  const dateRange = {
    start: selectedDayAvailableBlocks[0]?.curr_date,
    end: selectedDayAvailableBlocks[selectedDayAvailableBlocks.length - 1]
      ?.curr_date,
  };

  return (
    <>
      {availableSlots?.availabilities &&
        selectedDayAvailableBlocks &&
        selectedDayAvailableBlocks[0]?.curr_date && (
          <CalendarResourceView
            events={[...events, ...memoizedSelectedEvents]}
            resources={resources}
            dateRange={dateRange}
            currentDate={calendarDate}
            setCurrentDate={setCalendarDate}
            isLoading={isLoading}
          />
        )}
    </>
  );
}

export default Calendar;
