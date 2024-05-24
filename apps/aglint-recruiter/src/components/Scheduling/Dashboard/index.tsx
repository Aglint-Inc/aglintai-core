import { Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

import { SchedulingDashboard as SchedulingDashboardDev } from '@/devlink3/SchedulingDashboard';
import PAGES from '@/src/utils/routing/pageRouting';

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
            router.push(`${PAGES['/scheduling']()}?tab=candidates`),
        }}
        onClickInterviewTypes={{
          onClick: () =>
            router.push(`${PAGES['/scheduling']()}?tab=interviewtypes`),
        }}
        onClickInterviewers={{
          onClick: () =>
            router.push(`${PAGES['/scheduling']()}?tab=interviewers`),
        }}
        onClickMySchedule={{
          onClick: () => router.push(`${PAGES['/scheduling']()}?tab=schedules`),
        }}
        onClickScheduleSetting={{
          onClick: () =>
            router.push(
              `${PAGES['/scheduling']()}?tab=settings&subtab=interviewLoad`,
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
