import { useQueries } from '@tanstack/react-query';
import { type PropsWithChildren, createContext, memo, useContext } from 'react';

import { schedulingAnalyticsQueries } from '@/src/queries/scheduling-analytics';

import { useAuthDetails } from '../AuthContext/AuthContext';

const useActions = () => {
  const { recruiter_id } = useAuthDetails();
  const [
    completed_interviews,
    decline_requests,
    interview_types,
    interviewers,
    leaderboard,
    reasons,
    recent_decline_reschedule,
    tabs,
    training_progress,
  ] = useQueries({
    queries: [
      schedulingAnalyticsQueries.completed_interviews({ recruiter_id }),
      schedulingAnalyticsQueries.decline_requests({ recruiter_id }),
      schedulingAnalyticsQueries.interview_types({ recruiter_id }),
      schedulingAnalyticsQueries.interviewers({ recruiter_id }),
      schedulingAnalyticsQueries.leaderboard({ recruiter_id }),
      schedulingAnalyticsQueries.reasons({ recruiter_id }),
      schedulingAnalyticsQueries.recent_decline_reschedule({ recruiter_id }),
      schedulingAnalyticsQueries.tabs({ recruiter_id }),
      schedulingAnalyticsQueries.training_progress({ recruiter_id }),
    ],
  });
  return {
    completed_interviews,
    decline_requests,
    interview_types,
    interviewers,
    leaderboard,
    reasons,
    recent_decline_reschedule,
    tabs,
    training_progress,
  };
};

const SchedulingAnalyticsContext =
  createContext<ReturnType<typeof useActions>>(undefined);

export const SchedulingAnalyticsContextProvider = memo(
  (props: PropsWithChildren) => {
    const values = useActions();
    return (
      <SchedulingAnalyticsContext.Provider value={values}>
        {props.children}
      </SchedulingAnalyticsContext.Provider>
    );
  },
);
SchedulingAnalyticsContextProvider.displayName =
  'SchedulingAnalyticsContextProvider';

export const useSchedulingAnalytics = () => {
  const values = useContext(SchedulingAnalyticsContext);
  if (!values) throw new Error('SchedulingAnalyticsContextProvider not found');
  return values;
};
