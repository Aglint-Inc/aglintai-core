import { useRouter } from 'next/router';
import React, { Dispatch } from 'react';

import { ButtonSurface } from '@/devlink/ButtonSurface';
import { AllInterviewEmpty } from '@/devlink2/AllInterviewEmpty';
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
        slotButtonSchedule={
          upcomingScheduleList.length ? (
            <ButtonSurface
              textButton='View all'
              size={1}
              onClickButton={{
                onClick: () => {
                  router.push(
                    `/scheduling/interviewer/${detailsWithCount.interviewer.user_id}?tab=allschedules`,
                  );
                },
              }}
            />
          ) : null
        }
        slotButtonTraining={
          trainingModulesList.length ? (
            <ButtonSurface
              textButton='View all'
              size={1}
              onClickButton={{
                onClick: () => {
                  router.push(
                    `/scheduling/interviewer/${detailsWithCount.interviewer.user_id}?tab=interviewtypes`,
                  );
                },
              }}
            />
          ) : null
        }
        slotUpcomingSchedule={
          upcomingScheduleList.length > 0 ? (
            upcomingScheduleList.map((meetingDetails, i) => {
              return (
                <ScheduleMeetingCard key={i} meetingDetails={meetingDetails} />
              );
            })
          ) : (
            <AllInterviewEmpty textDynamic='No upcoming schedules found.' />
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
