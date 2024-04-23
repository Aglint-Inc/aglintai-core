import { Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

import {
  SchedulingDashboard as SchedulingDashboardDev,
  YourSchedules,
} from '@/devlink3';
import { pageRoutes } from '@/src/utils/pageRouting';

import InterviewConversion from './InterviewConversion';
import InterviewMeetingStatus from './InterviewMeetingStatus';
import LeaderBoardWidget from './LeaderBoardWidget';
import TrainingProgress from './TrainingProgress';
import InterviewTrainingStatus from './TrainingStatus';

const SchedulingDashboard = () => {
  const router = useRouter();
  return (
    <Stack>
      <SchedulingDashboardDev
        onClickCandidates={{
          onClick: () => router.push(`${pageRoutes.SCHEDULING}?tab=candidates`),
        }}
        onClickInterviewTypes={{
          onClick: () =>
            router.push(`${pageRoutes.SCHEDULING}?tab=interviewtypes`),
        }}
        onClickInterviewers={{
          onClick: () =>
            router.push(`${pageRoutes.SCHEDULING}?tab=interviewers`),
        }}
        onClickMySchedule={{
          onClick: () =>
            router.push(`${pageRoutes.SCHEDULING}?tab=myschedules`),
        }}
        onClickScheduleSetting={{
          onClick: () =>
            router.push(
              `${pageRoutes.SCHEDULING}?tab=settings&subtab=interviewLoad`,
            ),
        }}
        slotFirstGrid={
          <>
            <YourSchedules />
            <Stack>
              <InterviewConversion />
            </Stack>
          </>
        }
        slotGridInterviewDetail={
          <>
            <InterviewMeetingStatus />
            <LeaderBoardWidget />
          </>
        }
        slotInterviewStatic={<></>}
        slotInterviewModuleStats={<InterviewTrainingStatus />}
        slotTrainingProgress={<TrainingProgress />}
      />
    </Stack>
  );
};

export default SchedulingDashboard;
