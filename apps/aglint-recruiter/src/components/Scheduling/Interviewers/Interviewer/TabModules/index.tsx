import { Typography } from '@mui/material';
import React, { Dispatch } from 'react';

import { InterviewerDetailOverview } from '@/devlink3/InterviewerDetailOverview';

import { DetailsWithCount, PauseDialog } from '../../type';
import ListCardInterviewerModules from './ListCard';
import TraininingModules from './TraininingModules';

function TabInterviewModules({
  detailsWithCount,
  setPauseResumeDialog,
}: {
  detailsWithCount: DetailsWithCount;
  setPauseResumeDialog: Dispatch<React.SetStateAction<PauseDialog>>;
}) {
  const qualifiedModulesList =
    detailsWithCount.modules.filter(
      (item) => item.training_status === 'qualified',
    ) || [];

  const trainingModulesList =
    detailsWithCount.modules.filter(
      (item) => item.training_status === 'training',
    ) || [];

  return (
    <>
      <InterviewerDetailOverview
        textButton1={'Add'}
        textButton2={'Add'}
        textHeader1={'Qualified Interview Types'}
        textHeader2={'Training Interview Types'}
        slotUpcomingSchedule={
          qualifiedModulesList.length ? (
            qualifiedModulesList.map((module) => {
              return (
                <ListCardInterviewerModules
                  key={module.id}
                  module={module}
                  setPauseResumeDialog={setPauseResumeDialog}
                  status='qualified'
                  user_id={detailsWithCount.interviewer.user_id}
                />
              );
            })
          ) : (
            <Typography variant='body2'>
              No Interview Types Added Yet
            </Typography>
          )
        }
        slotTrainingModules={
          <TraininingModules
            setPauseResumeDialog={setPauseResumeDialog}
            trainingModulesList={trainingModulesList}
            user_id={detailsWithCount.interviewer.user_id}
          />
        }
        onClickViewAllModule={{
          onClick: () => {
            setPauseResumeDialog((pre) => ({
              ...pre,
              isOpen: true,
              type: 'addTrainingModule',
              isLoading: false,
            }));
          },
        }}
        onClickViewAllSchedule={{
          onClick: () => {
            setPauseResumeDialog((pre) => ({
              ...pre,
              isOpen: true,
              type: 'addQualifiedModule',
              isLoading: false,
            }));
          },
        }}
      />
    </>
  );
}

export default TabInterviewModules;
