import { DatabaseTable } from '@aglint/shared-types';
import { useQuery } from '@tanstack/react-query';
import {
  type PropsWithChildren,
  createContext,
  memo,
  useContext,
  useMemo,
  useState,
} from 'react';

import { schedulingAnalyticsQueries } from '@/src/queries/scheduling-analytics';
import { SchedulingAnalysisSchema } from '@/src/server/api/routers/scheduling/analytics';

import { useAuthDetails } from '../AuthContext/AuthContext';

const useActions = () => {
  const { recruiter_id } = useAuthDetails();

  const [jobs, setJobs] = useState<DatabaseTable['public_jobs']['id'][]>([]);

  const [departments, setDepartments] = useState<
    DatabaseTable['departments']['id'][]
  >([]);

  const [completedInterviewType, setCompletedInterviewType] =
    useState<SchedulingAnalysisSchema<'completed_interviews'>['type']>('day');

  const [interviewersType, setInterviewersType] =
    useState<SchedulingAnalysisSchema<'interviewers'>['type']>('qualified');

  const [leaderboardType, setLeaderboardType] =
    useState<SchedulingAnalysisSchema<'leaderboard'>['type']>('all_time');

  const [reasonsType, setReasonsType] =
    useState<SchedulingAnalysisSchema<'reasons'>['type']>('reschedule');

  const [trainingProgressType, setTrainingProgressType] =
    useState<SchedulingAnalysisSchema<'training_progress'>['type']>(
      'qualified',
    );

  const enabled = useMemo(() => !!recruiter_id, [recruiter_id]);

  const filters = useQuery(
    schedulingAnalyticsQueries.filters({ recruiter_id }, enabled),
  );

  const completed_interviews = useQuery(
    schedulingAnalyticsQueries.completed_interviews(
      { recruiter_id, departments, jobs, type: completedInterviewType },
      enabled,
    ),
  );

  const decline_requests = useQuery(
    schedulingAnalyticsQueries.decline_requests(
      { recruiter_id, departments, jobs },
      enabled,
    ),
  );

  const interview_types = useQuery(
    schedulingAnalyticsQueries.interview_types(
      { recruiter_id, departments, jobs },
      enabled,
    ),
  );

  const interviewers = useQuery(
    schedulingAnalyticsQueries.interviewers(
      { recruiter_id, departments, jobs, type: interviewersType },
      enabled,
    ),
  );

  const leaderboard = useQuery(
    schedulingAnalyticsQueries.leaderboard(
      { recruiter_id, departments, jobs, type: leaderboardType },
      enabled,
    ),
  );

  const reasons = useQuery(
    schedulingAnalyticsQueries.reasons(
      { recruiter_id, departments, jobs, type: reasonsType },
      enabled,
    ),
  );

  const recent_decline_reschedule = useQuery(
    schedulingAnalyticsQueries.recent_decline_reschedule(
      { recruiter_id, departments, jobs },
      enabled,
    ),
  );

  const tabs = useQuery(
    schedulingAnalyticsQueries.tabs(
      { recruiter_id, departments, jobs },
      enabled,
    ),
  );

  const training_progress = useQuery(
    schedulingAnalyticsQueries.training_progress(
      { recruiter_id, departments, jobs, type: trainingProgressType },
      enabled,
    ),
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
    trainingProgressType,
    setTrainingProgressType,
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
