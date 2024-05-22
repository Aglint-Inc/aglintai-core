import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { Dispatch } from 'react';

import { InterviewerDetailOverview } from '@/devlink3/InterviewerDetailOverview';

import { ScheduleListType } from '../../../Common/ModuleSchedules/hooks';
import ScheduleMeetingCard from '../../../Common/ModuleSchedules/ScheduleMeetingCard';
import { DetailsWithCount, PauseDialog } from '../../type';
import TraininingModules from '../TabModules/TraininingModules';

function Overview({
  detailsWithCount,
  setPauseResumeDialog,
  scheduleList,
}: {
  detailsWithCount: DetailsWithCount;
  setPauseResumeDialog: Dispatch<React.SetStateAction<PauseDialog>>;
  scheduleList: ScheduleListType;
}) {
  const router = useRouter();
  const upcomingScheduleList =
    scheduleList?.filter(
      (item) => item.interview_meeting.status === 'confirmed',
    ) || [];

  const trainingModulesList =
    detailsWithCount.modules.filter(
      (item) => item.training_status === 'training',
    ) || [];

  return (
    <>
      <InterviewerDetailOverview
        onClickViewAllModule={{
          onClick: () => {
            router.push(
              `/scheduling/interviewer/${detailsWithCount.interviewer.user_id}?tab=interviewtypes`,
            );
          },
        }}
        onClickViewAllSchedule={{
          onClick: () => {
            router.push(
              `/scheduling/interviewer/${detailsWithCount.interviewer.user_id}?tab=allschedules`,
            );
          },
        }}
        slotUpcomingSchedule={
          upcomingScheduleList.length > 0 ? (
            upcomingScheduleList.map((meetingDetails, i) => {
              return (
                <ScheduleMeetingCard key={i} meetingDetails={meetingDetails} />
              );
            })
          ) : (
            <Typography variant='body2'>No Schedules</Typography>
          )
        }
        slotTrainingModules={
          <TraininingModules
            user_id={detailsWithCount.interviewer.user_id}
            trainingModulesList={trainingModulesList}
            setPauseResumeDialog={setPauseResumeDialog}
          />
        }
      />
    </>
  );
}

export default Overview;
