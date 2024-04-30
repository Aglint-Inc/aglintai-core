import { Collapse, Stack, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';

import { TaskEmpty, TaskTableJobCard } from '@/devlink3';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { TasksAgentContextType } from '@/src/context/TasksContextProvider/TasksContextProvider';
import { capitalizeAll } from '@/src/utils/text/textUtils';

import { useTaskStatesContext } from '../../TaskStatesContext';
import GroupTaskCard from '../GroupTaskCard';

function GroupSections({
  item,
  index,
}: {
  item: {
    applications: TasksAgentContextType['tasks'][number]['applications'];
    tasklist: TasksAgentContextType['tasks'];
  };
  index: any;
}) {
  const { setShowAddNew, setSelectedApplication } = useTaskStatesContext();
  const [sectionIndex, setSectionIndex] = useState(true);

  return (
    <Collapse in={index === sectionIndex || sectionIndex} collapsedSize={41}>
      <TaskTableJobCard
        onClickDropIcon={{
          onClick: () => {
            if (sectionIndex) setSectionIndex(false);
            else setSectionIndex(true);
          },
        }}
        textRole={capitalizeAll(item.applications.public_jobs.job_title)}
        slotAvatarWithName={
          <Stack alignItems={'center'} direction={'row'} spacing={'10px'}>
            <Typography>
              {capitalizeAll(item.applications.public_jobs.job_title)}
            </Typography>
            <Typography
              alignItems={'center'}
              display={'flex'}
              fontSize={'14px'}
            >
              (
              {capitalizeAll(
                item.applications.candidates.first_name +
                  ' ' +
                  (item.applications.candidates.last_name ?? ''),
              )}
              )
            </Typography>
            <Tooltip title='Task count'>
              <Typography
                sx={{
                  cursor: 'pointer',
                }}
                variant='caption'
                fontSize={'16px'}
              >
                {item.tasklist.length}
              </Typography>
            </Tooltip>
          </Stack>
        }
        key={index}
        slotTaskTableJobCard={
          <>
            {item.tasklist
              .filter((ele) => ele.type !== 'empty')
              .map((ele, i) => {
                return <GroupTaskCard key={i} task={ele} />;
              })}
            <ShowCode.When
              isTrue={
                item.tasklist.filter((ele) => ele.type !== 'empty').length === 0
              }
            >
              <Stack height={100}>
                <TaskEmpty />
              </Stack>
            </ShowCode.When>
          </>
        }
        onClickNewTask={{
          onClick: () => {
            setShowAddNew(true);
            setSelectedApplication(item.applications);
            setSectionIndex(true);
          },
        }}
      />
    </Collapse>
  );
}

export default GroupSections;
