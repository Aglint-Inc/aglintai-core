import { Stack, Typography } from '@mui/material';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { PageLayout } from '@/devlink2/PageLayout';
import { GlobalCta } from '@/devlink3/GlobalCta';
import { useJobs } from '@/src/context/JobsContext';

import { ShowCode } from '../Common/ShowCode';
import TaskBody from './TaskBody';
import GroupBy from './TaskBody/GroupBy';
import { TaskStatesProvider } from './TaskStatesContext';

function Tasks() {
  const { jobs } = useJobs();
  return (
    <TaskStatesProvider>
      <ShowCode>
        <ShowCode.When isTrue={!!jobs?.data?.length}>
          <PageLayout
            slotTopbarLeft={
              <Typography variant='body1medium'>Tasks</Typography>
            }
            slotTopbarRight={
              <Stack
                direction={'row'}
                alignItems={'center'}
                spacing={'var(--space-2)'}
              >
                <Typography variant='body1'>Group by</Typography>
                <GroupBy />
              </Stack>
            }
            slotBody={<TaskBody />}
          />
        </ShowCode.When>
        <ShowCode.Else>
          <GlobalCta
            color={'info'}
            iconName='work'
            textTitle='Please add a job to create a task.'
            textDescription='Click here to add a new job.'
            slotButton={
              <ButtonSoft color={'neutral'} size={1} textButton={'Add Job'} />
            }
          />
        </ShowCode.Else>
      </ShowCode>
    </TaskStatesProvider>
  );
}

export default Tasks;
