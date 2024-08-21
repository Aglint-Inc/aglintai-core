import { memo } from 'react';

import { SchedulingDashboard as SchedulingDashboardDev } from '@/devlink3/SchedulingDashboard';
import { useSchedulingAnalytics } from '@/src/context/SchedulingAnalytics';

import Loader from '../../Common/Loader';
import CancelReasons from './CancelReasons';
import { Interviewers } from './interviewers';
import InterviewMeetingStatus from './InterviewMeetingStatus';
import { InterviewTypes } from './interviewTypes';
import { Leaderboard } from './leaderboard';
import { Tabs } from './tabs';
import { TrainingProgress } from './trainingProgress';
import { RecentDeclines } from './recentDeclines';
import { RecentReschedules } from './recentReschedules';
import { CompletedInterviews } from './completedInterviews';

const SchedulingDashboard = memo(() => {
  const { enabled } = useSchedulingAnalytics();
  if (!enabled) return <Loader />;
  return (
    <SchedulingDashboardDev
      slotFirstGrid={
        <>
          <CancelReasons />
          <Leaderboard />
        </>
      }
      slotGridInterviewDetail={
        <>
          <InterviewMeetingStatus />
          <InterviewTypes />
        </>
      }
      slotTrainingProgress={<TrainingProgress />}
      slotScheduleCount={<Tabs />}
      slotRecentReschedule={
        <>
          <RecentDeclines />
          <RecentReschedules />
        </>
      }
      slotCompletedInterview={
        <>
          <CompletedInterviews />
          <Interviewers />
        </>
      }
    />
  );
});
SchedulingDashboard.displayName = 'SchedulingDashboard';

export default SchedulingDashboard;
