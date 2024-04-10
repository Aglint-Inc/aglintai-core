import { IconPlus } from '@tabler/icons-react';
import React from 'react';

import { ButtonPrimaryDefaultRegular } from '@/devlink3';

import { useTaskStatesContext } from '../TaskStatesContext';

function AddTaskButton() {
  const { setAddTaskPopUp } = useTaskStatesContext();

  return (
    <ButtonPrimaryDefaultRegular
      buttonProps={{
        onClick: () => {
          setAddTaskPopUp(true);
        },
      }}
      startIconSlot={<IconPlus size={20} display={'flex'} />}
      buttonText={'New List'}
    />
  );
}

export default AddTaskButton;
