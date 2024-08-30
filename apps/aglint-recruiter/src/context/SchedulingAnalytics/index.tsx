import { DatabaseTable } from '@aglint/shared-types';
import {
  type PropsWithChildren,
  createContext,
  memo,
  useContext,
  useMemo,
  useState,
} from 'react';

import { SchedulingAnalysisSchema } from '@/src/server/api/routers/scheduling/analytics';
import { api, TRPC_CLIENT_CONTEXT } from '@/src/trpc/client';

import { useAuthDetails } from '../AuthContext/AuthContext';

const useActions = () => {
  const { recruiter_id } = useAuthDetails();

  const [jobs, setJobs] = useState<DatabaseTable['public_jobs']['id'][]>([]);

  const [departments, setDepartments] = useState<
    DatabaseTable['departments']['id'][]
  >([]);

  const [completedInterviewType, setCompletedInterviewType] =
    useState<SchedulingAnalysisSchema<'completed_interviews'>['type']>('month');

  const [interviewersType, setInterviewersType] =
    useState<SchedulingAnalysisSchema<'interviewers'>['type']>('qualified');

  const [leaderboardType, setLeaderboardType] =
    useState<SchedulingAnalysisSchema<'leaderboard'>['type']>('all_time');

  const [reasonsType, setReasonsType] =
    useState<SchedulingAnalysisSchema<'reasons'>['type']>('reschedule');

  const enabled = useMemo(() => !!recruiter_id, [recruiter_id]);

  const filters = api.scheduling.analytics.filters.useQuery(
    { recruiter_id },
    {
      enabled,
      trpc: TRPC_CLIENT_CONTEXT,
    },
  );

  const completed_interviews =
    api.scheduling.analytics.completed_interviews.useQuery(
      { recruiter_id, departments, jobs, type: completedInterviewType },
      {
        enabled,
        trpc: TRPC_CLIENT_CONTEXT,
      },
    );

  const decline_requests = api.scheduling.analytics.decline_requests.useQuery(
    { recruiter_id, departments, jobs },
    {
      enabled,
      trpc: TRPC_CLIENT_CONTEXT,
    },
  );

  const interview_types = api.scheduling.analytics.interview_types.useQuery(
    { recruiter_id, departments, jobs },
    {
      enabled,
      trpc: TRPC_CLIENT_CONTEXT,
    },
  );

  const interviewers = api.scheduling.analytics.interviewers.useQuery(
    { recruiter_id, departments, jobs, type: interviewersType },
    {
      enabled,
      trpc: TRPC_CLIENT_CONTEXT,
    },
  );

  const leaderboard = api.scheduling.analytics.leaderboard.useQuery(
    { recruiter_id, departments, jobs, type: leaderboardType },
    {
      enabled,
      trpc: TRPC_CLIENT_CONTEXT,
    },
  );

  const reasons = api.scheduling.analytics.reasons.useQuery(
    { recruiter_id, departments, jobs, type: reasonsType },
    {
      enabled,
      trpc: TRPC_CLIENT_CONTEXT,
    },
  );

  const recent_decline_reschedule =
    api.scheduling.analytics.recent_decline_reschedule.useQuery(
      { recruiter_id, departments, jobs },
      {
        enabled,
        trpc: TRPC_CLIENT_CONTEXT,
      },
    );

  const tabs = api.scheduling.analytics.tabs.useQuery(
    { recruiter_id, departments, jobs },
    {
      enabled,
      trpc: TRPC_CLIENT_CONTEXT,
    },
  );

  const training_progress = api.scheduling.analytics.training_progress.useQuery(
    { recruiter_id, departments, jobs },
    {
      enabled,
      trpc: TRPC_CLIENT_CONTEXT,
    },
  );

  return {
    enabled,
    filters,
    completed_interviews,
    decline_requests,
    interview_types,
    interviewers,
    leaderboard,
    reasons,
    recent_decline_reschedule,
    tabs,
    training_progress,
    completedInterviewType,
    setCompletedInterviewType,
    interviewersType,
    setInterviewersType,
    leaderboardType,
    setLeaderboardType,
    reasonsType,
    setReasonsType,
    jobs,
    setJobs,
    departments,
    setDepartments,
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
