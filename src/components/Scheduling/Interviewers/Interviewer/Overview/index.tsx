import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { Dispatch } from 'react';

import { InterviewerDetailOverview } from '@/devlink3';

import { ScheduleListType } from '../../../Common/ModuleSchedules';
import ScheduleMeetingCard from '../../../Common/ModuleSchedules/ScheduleMeetingCard';
import { InterviewerDetailsType, PauseDialog } from '../../type';
import { getMeetingsByUserIdModuleId } from '..';
import TraininingModules from '../TabModules/TraininingModules';

function Overview({
  interviewerDetails,
  setPauseResumeDialog,
  userMeetings,
  scheduleList,
}: {
  interviewerDetails: InterviewerDetailsType;
  setPauseResumeDialog: Dispatch<React.SetStateAction<PauseDialog>>;
  userMeetings: Awaited<ReturnType<typeof getMeetingsByUserIdModuleId>>;
  scheduleList: ScheduleListType;
}) {
  const router = useRouter();
  const upcomingScheduleList =
    scheduleList?.filter(
      (item) => item.interview_meeting.status === 'confirmed',
    ) || [];

  return (
    <>
      <InterviewerDetailOverview
        onClickViewAllModule={{
          onClick: () => {
            router.push(
              `/scheduling/interviewer/${interviewerDetails.interviewer.user_id}?tab=interviewtypes`,
            );
          },
        }}
        onClickViewAllSchedule={{
          onClick: () => {
            router.push(
              `/scheduling/interviewer/${interviewerDetails.interviewer.user_id}?tab=allschedules`,
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
            interviewerDetails={interviewerDetails}
            setPauseResumeDialog={setPauseResumeDialog}
            userMeetings={userMeetings}
          />
        }
      />
    </>
  );
}

export default Overview;
