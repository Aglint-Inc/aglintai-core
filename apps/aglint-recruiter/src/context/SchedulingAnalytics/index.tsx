import { useQuery } from '@tanstack/react-query';
import {
  type PropsWithChildren,
  createContext,
  memo,
  useContext,
  useMemo,
} from 'react';

import { schedulingAnalyticsQueries } from '@/src/queries/scheduling-analytics';

import { useAuthDetails } from '../AuthContext/AuthContext';

const useActions = () => {
  const { recruiter_id } = useAuthDetails();

  const enabled = useMemo(() => !!recruiter_id, [recruiter_id]);

  const completed_interviews = useQuery(
    schedulingAnalyticsQueries.completed_interviews({ recruiter_id }, enabled),
  );

  const decline_requests = useQuery(
    schedulingAnalyticsQueries.decline_requests({ recruiter_id }, enabled),
  );

  const interview_types = useQuery(
    schedulingAnalyticsQueries.interview_types({ recruiter_id }, enabled),
  );

  const interviewers = useQuery(
    schedulingAnalyticsQueries.interviewers({ recruiter_id }, enabled),
  );

  const leaderboard = useQuery(
    schedulingAnalyticsQueries.leaderboard({ recruiter_id }, enabled),
  );

  const reasons = useQuery(
    schedulingAnalyticsQueries.reasons({ recruiter_id }, enabled),
  );

  const recent_decline_reschedule = useQuery(
    schedulingAnalyticsQueries.recent_decline_reschedule(
      { recruiter_id },
      enabled,
    ),
  );

  const tabs = useQuery(
    schedulingAnalyticsQueries.tabs({ recruiter_id }, enabled),
  );

  const training_progress = useQuery(
    schedulingAnalyticsQueries.training_progress({ recruiter_id }, enabled),
  );

  return {
    enabled,
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
  createContext<SchedulingAnalyticsContextType>(undefined);

export type SchedulingAnalyticsContextType = ReturnType<typeof useActions>;

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
