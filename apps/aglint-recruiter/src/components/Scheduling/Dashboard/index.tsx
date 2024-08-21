import { memo } from 'react';

import { SchedulingDashboard as SchedulingDashboardDev } from '@/devlink3/SchedulingDashboard';
import { useSchedulingAnalytics } from '@/src/context/SchedulingAnalytics';

import Loader from '../../Common/Loader';
import CancelReasons from './CancelReasons';
import CompletedInterviewBarChart from './CompletedInterview';
import { Interviewers } from './interviewers';
import InterviewMeetingStatus from './InterviewMeetingStatus';
import { InterviewTypes } from './interviewTypes';
import { Leaderboard } from './leaderboard';
import { Tabs } from './tabs';
import { TrainingProgress } from './trainingProgress';
import { RecentDeclines } from './recentDeclines';

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
        </>
      }
      slotCompletedInterview={
        <>
          <CompletedInterviewBarChart />
          <Interviewers />
        </>
      }
    />
  );
});
SchedulingDashboard.displayName = 'SchedulingDashboard';

export default SchedulingDashboard;
