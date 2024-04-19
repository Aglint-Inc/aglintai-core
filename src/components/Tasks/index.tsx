import { Typography } from '@mui/material';
import { useState } from 'react';

import { PageLayout } from '@/devlink2';
import { TaskSwitchButton } from '@/devlink3';

import TaskBody from './TaskBody';
import { TaskStatesProvider } from './TaskStatesContext';

function Tasks() {
  const [byGroup, setByGroup] = useState(true);
  return (
    <TaskStatesProvider>
      <PageLayout
        slotTopbarLeft={<Typography variant='body1'>Tasks</Typography>}
        slotTopbarRight={
          <TaskSwitchButton
            onClickJobCand={{
              onClick: () => {
                setByGroup(true);
              },
            }}
            onClickList={{
              onClick: () => {
                setByGroup(false);
              },
            }}
            isJobCandActive={byGroup}
            isListActive={!byGroup}
          />
        }
        slotBody={<TaskBody byGroup={byGroup} />}
      />
    </TaskStatesProvider>
  );
}

export default Tasks;
