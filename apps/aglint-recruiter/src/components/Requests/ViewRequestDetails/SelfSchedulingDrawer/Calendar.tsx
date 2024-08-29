import CalendarResourceView from '@/src/components/Common/CalendarResourceView';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelfSchedulingFlowStore } from './store';
import { Event } from '@/src/components/Common/CalendarResourceView/types';
import { getFullName } from '@aglint/shared-utils';
import { getStringColor } from '@/src/components/Common/MuiAvatar';

function Calendar() {
  const {
    schedulingOptions,
    selectedCombIds,
    availabilities,
    dateRange,
    fetchingPlan,
  } = useSelfSchedulingFlowStore((state) => ({
    availabilities: state.availabilities,
    dateRange: state.dateRange,
    selectedCombIds: state.selectedCombIds,
    schedulingOptions: state.schedulingOptions,
    fetchingPlan: state.fetchingPlan,
  }));

  const memoizedSelectedEvents = useMemo(() => {
    const selectedSessions = schedulingOptions
      .flatMap((option) => option.interview_rounds)
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

  console.log(
    availabilities?.events.filter(
      (event) => event.resourceId === '10ee2995-f932-4a85-960b-f666ddea3d97',
    ),
  );

  return (
    <>
      {!fetchingPlan && availabilities && (
        <CalendarResourceView
          events={[...memoisedEvents, ...memoizedSelectedEvents]}
          resources={availabilities.resources}
          dateRange={{
            start: dateRange.start_date,
            end: dateRange.end_date,
          }}
        />
      )}
    </>
  );
}

export default Calendar;
