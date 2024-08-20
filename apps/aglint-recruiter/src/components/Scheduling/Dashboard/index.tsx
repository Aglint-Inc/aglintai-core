import { SchedulingDashboard as SchedulingDashboardDev } from '@/devlink3/SchedulingDashboard';
import { useSchedulingAnalytics } from '@/src/context/SchedulingAnalytics';

import Loader from '../../Common/Loader';
import CancelReasons from './CancelReasons';
import CompletedInterviewBarChart from './CompletedInterview';
import InterviewersAnalyticCards from './InterviewersAnalyticCards';
import InterviewMeetingStatus from './InterviewMeetingStatus';
import { Leaderboard } from './leaderboard';
import RecentRescheduleCancel from './RecentRescheduleCancel';
import { Tabs } from './tabs';
// import TrainingProgress from './TrainingProgress';
import InterviewTrainingStatus from './TrainingStatus';

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
      slotTrainingProgress={<></>}
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
