import { memo } from 'react';

import { SchedulingDashboard as SchedulingDashboardDev } from '@/devlink3/SchedulingDashboard';
import { useSchedulingAnalytics } from '@/src/context/SchedulingAnalytics';

import Loader from '../../Common/Loader';
import CancelReasons from './CancelReasons';
import { Interviewers } from './interviewers';
import { InterviewTypes } from './interviewTypes';
import { Leaderboard } from './leaderboard';
import { Tabs } from './tabs';
import { TrainingProgress } from './trainingProgress';
import { RecentDeclines } from './recentDeclines';
import { RecentReschedules } from './recentReschedules';
import { CompletedInterviews } from './completedInterviews';
import { DeclineRequests } from './declineRequests';
import { Interviewes } from './interviews';
import Stack from '@mui/material/Stack';
import { Reasons } from './reasons';

const SchedulingDashboard = memo(() => {
  const { enabled } = useSchedulingAnalytics();
  if (!enabled) return <Loader />;
  return (
    <SchedulingDashboardDev
      slotFirstGrid={
        <>
          <Reasons />
          <Leaderboard />
        </>
      }
      slotGridInterviewDetail={
        <>
          <DeclineRequests />
          <InterviewTypes />
        </>
      }
      slotTrainingProgress={
        <Stack direction={'row'} justifyContent={'space-between'} gap={2}>
          <TrainingProgress />
          <Interviewes />
        </Stack>
      }
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
