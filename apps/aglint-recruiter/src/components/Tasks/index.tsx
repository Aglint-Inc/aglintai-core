import { Stack, Typography } from '@mui/material';

import { PageLayout } from '@/devlink2/PageLayout';

import TaskBody from './TaskBody';
import GroupBy from './TaskBody/GroupBy';
import { TaskStatesProvider } from './TaskStatesContext';

function Tasks() {
  return (
    <TaskStatesProvider>
      <PageLayout
        slotTopbarLeft={<Typography variant='body1bold'>Tasks</Typography>}
        slotTopbarRight={
          <Stack direction={'row'} alignItems={'center'} spacing={'var(--space-2)'}>
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
