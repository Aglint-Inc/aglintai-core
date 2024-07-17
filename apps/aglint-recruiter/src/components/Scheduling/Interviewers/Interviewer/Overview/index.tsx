import { useRouter } from 'next/router';
import React, { Dispatch } from 'react';

import { ButtonSurface } from '@/devlink/ButtonSurface';
import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';
import { InterviewerDetailOverview } from '@/devlink3/InterviewerDetailOverview';

import ScheduleMeetingCard from '../../../Common/ModuleSchedules/ScheduleMeetingCard';
import { SchedulesSupabase } from '../../../schedules-query';
import { DetailsWithCount, PauseDialog } from '../../type';
import TraininingModules from '../TabModules/TraininingModules';

function Overview({
  detailsWithCount,
  setPauseResumeDialog,
  scheduleList,
}: {
  detailsWithCount: DetailsWithCount;
  setPauseResumeDialog: Dispatch<React.SetStateAction<PauseDialog>>;
  scheduleList: SchedulesSupabase;
}) {
  const router = useRouter();
  const upcomingScheduleList =
    scheduleList?.filter((item) => item.status === 'confirmed') || [];

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
          ) : (
            <></>
          )
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
          ) : (
            <></>
          )
        }
        slotUpcomingSchedule={
          upcomingScheduleList.length > 0 ? (
            upcomingScheduleList.map((meetingDetails, i) => {
              return (
                <ScheduleMeetingCard key={i} meetingDetails={meetingDetails} />
              );
            })
          ) : (
            // <AllInterviewEmpty textDynamic='No upcoming schedules found.' />
            <GlobalEmptyState
              textDesc='No upcoming schedules found.'
              size={6}
              iconName='event'
            />
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
