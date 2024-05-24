import { Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

import { SchedulingDashboard as SchedulingDashboardDev } from '@/devlink3/SchedulingDashboard';
import ROUTES from '@/src/utils/routing/routes';

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
          onClick: () =>
            router.push(`${ROUTES['/scheduling']()}?tab=candidates`),
        }}
        onClickInterviewTypes={{
          onClick: () =>
            router.push(`${ROUTES['/scheduling']()}?tab=interviewtypes`),
        }}
        onClickInterviewers={{
          onClick: () =>
            router.push(`${ROUTES['/scheduling']()}?tab=interviewers`),
        }}
        onClickMySchedule={{
          onClick: () =>
            router.push(`${ROUTES['/scheduling']()}?tab=schedules`),
        }}
        onClickScheduleSetting={{
          onClick: () =>
            router.push(
              `${ROUTES['/scheduling']()}?tab=settings&subtab=interviewLoad`,
            ),
        }}
        slotFirstGrid={
          <>
            <Stack>
              <InterviewConversion />
            </Stack>
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
      />
    </Stack>
  );
};

export default SchedulingDashboard;
