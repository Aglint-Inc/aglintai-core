import { Typography } from '@mui/material';
import React, { Dispatch } from 'react';

import { AllInterviewEmpty } from '@/devlink2/AllInterviewEmpty';

import { PauseDialog } from '../../type';
import ListCardInterviewerModules from './ListCard';

function TraininingModules({
  trainingModulesList,
  setPauseResumeDialog,
  user_id,
}: {
  trainingModulesList: any;
  setPauseResumeDialog: Dispatch<React.SetStateAction<PauseDialog>>;
  user_id: string;
}) {
  return (
    <>
      {trainingModulesList?.length ? (
        trainingModulesList.map((module) => {
          return (
            <ListCardInterviewerModules
              key={module.id}
              module={module}
              setPauseResumeDialog={setPauseResumeDialog}
              status='training'
              user_id={user_id}
            />
          );
        })
      ) : (
        <AllInterviewEmpty textDynamic='No Interview Types Found' />
      )}
    </>
  );
}

export default TraininingModules;
