import React, { Dispatch } from 'react';

import { GlobalEmptyState } from '@/devlink/GlobalEmptyState';

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
        // <AllInterviewEmpty textDynamic='No interview types found.' />
        <GlobalEmptyState textDesc='No ongoing training.' size={6} iconName='filter_tilt_shift' />
      )}
    </>
  );
}

export default TraininingModules;
