import { Typography } from '@mui/material';

import { PageLayout } from '@/devlink2';

import AddTaskButton from './Components/AddTaskButton';
import TaskBody from './TaskBody';
import { TaskStatesProvider } from './TaskStatesContext';

const Tasks = () => {
  return (
    <TaskStatesProvider>
      <PageLayout
        slotTopbarLeft={<Typography variant='body1'>Tasks</Typography>}
        slotTopbarRight={<AddTaskButton />}
        slotBody={<TaskBody />}
      />
    </TaskStatesProvider>
  );
};

export default Tasks;
