import { getFullName } from '@aglint/shared-utils';
import { useMemo } from 'react';

import CalendarResourceView from '@/src/components/Common/CalendarResourceView';
import { type Event } from '@/src/components/Common/CalendarResourceView/types';
import { getStringColor } from '@/src/components/Common/MuiAvatar';

import { setCalendarDate, useSelfSchedulingFlowStore } from './store';

function Calendar() {
  const {
    filteredSchedulingOptions,
    selectedCombIds,
    availabilities,
    dateRange,
    fetchingPlan,
    calendarDate,
  } = useSelfSchedulingFlowStore((state) => ({
    availabilities: state.availabilities,
    dateRange: state.dateRange,
    selectedCombIds: state.selectedCombIds,
    filteredSchedulingOptions: state.filteredSchedulingOptions,
    fetchingPlan: state.fetchingPlan,
    calendarDate: state.calendarDate,
  }));

  const memoizedSelectedEvents = useMemo(() => {
    const selectedSessions = filteredSchedulingOptions
      .flatMap((round) => round.plans)
      .filter((plan) => selectedCombIds.includes(plan.plan_comb_id))
      .flatMap((plan) => plan.sessions);

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
  }, [selectedCombIds]);

  const memoisedEvents = useMemo(() => {
    return availabilities?.events || [];
  }, [availabilities?.events]);

  return (
    <>
      {availabilities && (
        <CalendarResourceView
          events={[...memoisedEvents, ...memoizedSelectedEvents]}
          resources={availabilities.resources}
          dateRange={{
            start: dateRange.start_date,
            end: dateRange.end_date,
          }}
          currentDate={calendarDate}
          setCurrentDate={setCalendarDate}
          isLoading={fetchingPlan}
        />
      )}
    </>
  );
}

export default Calendar;
