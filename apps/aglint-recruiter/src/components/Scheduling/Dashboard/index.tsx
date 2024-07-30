import { Stack } from '@mui/material';

import { SchedulingDashboard as SchedulingDashboardDev } from '@/devlink3/SchedulingDashboard';

import CancelReasons from './CancelReasons';
import CompletedInterviewBarChart from './CompletedInterview';
import InterviewersAnalyticCards from './InterviewersAnalyticCards';
import InterviewMeetingStatus from './InterviewMeetingStatus';
import LeaderBoardWidget from './LeaderBoardWidget';
import RecentRescheduleCancel from './RecentRescheduleCancel';
import ScheduleAnalyticsCards from './ScheduleAnalyticsCards';
import TrainingProgress from './TrainingProgress';
import InterviewTrainingStatus from './TrainingStatus';

const SchedulingDashboard = () => {

  return (
    <Stack>
      <SchedulingDashboardDev
        slotFirstGrid={
          <>
            <CancelReasons />
            <LeaderBoardWidget />
          </>
        }
        slotGridInterviewDetail={
          <>
            <InterviewMeetingStatus />
            <InterviewTrainingStatus />
          </>
        }
        slotTrainingProgress={<TrainingProgress />}
        slotScheduleCount={<ScheduleAnalyticsCards />}
        slotRecentReschedule={<RecentRescheduleCancel />}
        slotCompletedInterview={
          <>
            <CompletedInterviewBarChart />
            <InterviewersAnalyticCards />
          </>
        }
      />
    </Stack>
  );
};

export default SchedulingDashboard;
