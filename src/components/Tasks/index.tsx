import { Stack, Typography } from '@mui/material';

import { PageLayout } from '@/devlink2';

import TaskBody from './TaskBody';
import GroupBy from './TaskBody/GroupBy';
import { TaskStatesProvider } from './TaskStatesContext';

function Tasks() {
  return (
    <TaskStatesProvider>
      <PageLayout
        slotTopbarLeft={<Typography variant='body1'>Tasks</Typography>}
        slotTopbarRight={
          <Stack direction={'row'} alignItems={'center'} spacing={'10px'}>
            <Typography
              variant='caption'
              fontSize={'14px'}
              fontWeight={'400px'}
            >
              Group by
            </Typography>
            <GroupBy />
          </Stack>
        }
        slotBody={<TaskBody />}
      />
    </TaskStatesProvider>
  );
}

export default Tasks;
