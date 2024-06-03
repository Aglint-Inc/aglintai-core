import { Typography } from '@mui/material';
import React, { Dispatch } from 'react';

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
        <Typography variant='body1'>No Interview Types Added Yet</Typography>
      )}
    </>
  );
}

export default TraininingModules;
