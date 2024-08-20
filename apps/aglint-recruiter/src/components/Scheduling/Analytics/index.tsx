import { memo } from 'react';

import { useSchedulingAnalytics } from '@/src/context/SchedulingAnalytics';

import Loader from '../../Common/Loader';
import { CompletedInterviews } from './completedInterviews';
import { DeclineRequests } from './declineRequests';
import { Interviewers } from './interviewers';
import { Interviews } from './interviews';
import { InterviewTypes } from './interviewTypes';
import { Leaderboard } from './leaderboard';
import { Reasons } from './reasons';
import { RecentDeclineReschedule } from './recentDeclineReschedule';
import { Tabs } from './tabs';
import { TrainingProgress } from './trainingProgress';

export const Analytics = memo(() => {
  const { enabled } = useSchedulingAnalytics();
  if (!enabled)
    return (
      <>
        <Loader />
      </>
    );
  return (
    <>
      <Interviews />
      <Tabs />
      <CompletedInterviews />
      <DeclineRequests />
      <InterviewTypes />
      <Interviewers />
      <Leaderboard />
      <Reasons />
      <RecentDeclineReschedule />
      <TrainingProgress />
    </>
  );
});
Analytics.displayName = 'Analytics';
