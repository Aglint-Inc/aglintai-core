import { Stack } from '@mui/material';

import { SchedulingDashboard as SchedulingDashboardDev } from '@/devlink3/SchedulingDashboard';

import CancelReasons from './CancelReasons';
import CompletedInterviewBarChart from './CompletedInterview';
import InterviewersAnalyticCards from './InterviewersAnalyticCards';
import InterviewMeetingStatus from './InterviewMeetingStatus';
import RecentRescheduleCancel from './RecentRescheduleCancel';
import TrainingProgress from './TrainingProgress';
import InterviewTrainingStatus from './TrainingStatus';
import { useSchedulingAnalytics } from '@/src/context/SchedulingAnalytics';
import Loader from '../../Common/Loader';
import { Tabs } from './tabs';
import { Leaderboard } from './leaderboard';

const SchedulingDashboard = () => {
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
          <InterviewTrainingStatus />
        </>
      }
      slotTrainingProgress={<TrainingProgress />}
      slotScheduleCount={<Tabs />}
      slotRecentReschedule={<RecentRescheduleCancel />}
      slotCompletedInterview={
        <>
          <CompletedInterviewBarChart />
          <InterviewersAnalyticCards />
        </>
      }
    />
  );
};

export default SchedulingDashboard;
