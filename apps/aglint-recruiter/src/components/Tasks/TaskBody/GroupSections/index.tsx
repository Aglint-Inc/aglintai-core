import { Box, Collapse, Stack, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';

import { GlobalIcon } from '@/devlink/GlobalIcon';
import { AvatarWithName } from '@/devlink3/AvatarWithName';
import { PriorityPill } from '@/devlink3/PriorityPill';
import { TaskEmpty } from '@/devlink3/TaskEmpty';
import { TaskTableJobCard } from '@/devlink3/TaskTableJobCard';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { TasksAgentContextType } from '@/src/context/TasksContextProvider/TasksContextProvider';
import { getFullName } from '@/src/utils/jsonResume';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

import AssigneeChip from '../../Components/AssigneeChip';
import { GetTaskStatusBadge } from '../../Components/TaskStatusTag';
import { useTaskStatesContext } from '../../TaskStatesContext';
import GroupTaskCard from '../GroupTaskCard';

function GroupSections({
  item,
  index,
}: {
  item: {
    [key: string]: any;
    tasklist: TasksAgentContextType['tasks'];
  };
  index: any;
}) {
  const { setShowAddNew, setSelectedGroupTask, selectedGroupBy } =
    useTaskStatesContext();
  const [sectionIndex, setSectionIndex] = useState(false);

  return (
    <Collapse in={index === sectionIndex || sectionIndex} collapsedSize={60}>
      <TaskTableJobCard
        slotDropIcon={
          <ShowCode>
            <ShowCode.When isTrue={sectionIndex}>
              <Box
                sx={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onClick={() => {
                  setSectionIndex(false);
                }}
              >
                <GlobalIcon
                  iconName='arrow_drop_down'
                  size={6}
                  color='neutral-11'
                />
              </Box>
            </ShowCode.When>
            <ShowCode.Else>
              <Box
                sx={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
                onClick={() => {
                  setSectionIndex(true);
                }}
              >
                <GlobalIcon
                  iconName='arrow_right'
                  size={6}
                  color='neutral-11'
                />
              </Box>
            </ShowCode.Else>
          </ShowCode>
        }
        slotAvatarWithName={
          <ShowCode>
            <ShowCode.When isTrue={selectedGroupBy.label === 'job'}>
              <Stack
                alignItems={'center'}
                direction={'row'}
                spacing={'var(--space-2)'}
              >
                <Typography
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  {capitalizeFirstLetter(item.job)}
                </Typography>

                <Tooltip title='Task count'>
                  <Stack
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: 'var(--neutral-3)',
                      padding: 'var(--space-1)',
                      borderRadius: 'var(--radius-2)',
                      minWidth: 'var(--space-5)',
                    }}
                  >
                    <Typography
                      sx={{
                        cursor: 'pointer',
                      }}
                      variant='body2'
                    >
                      {item.tasklist.length}
                    </Typography>
                  </Stack>
                </Tooltip>
              </Stack>
            </ShowCode.When>
            <ShowCode.When isTrue={selectedGroupBy.label === 'candidate'}>
              <Stack
                alignItems={'center'}
                direction={'row'}
                spacing={'var(--space-2)'}
              >
                <AvatarWithName
                  isAvatarVisible={false}
                  isCandidateIconVisible={true}
                  textName={getFullName(
                    item?.applications?.candidates?.first_name,
                    item?.applications?.candidates?.last_name,
                  )}
                  isRoleVisible={false}
                  isRoleHorizontalVisible={true}
                  textRole={capitalizeFirstLetter(
                    item?.applications?.public_jobs?.job_title,
                  )}
                />

                <Tooltip title='Task count'>
                  <Stack
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: 'var(--neutral-3)',
                      padding: 'var(--space-1)',
                      borderRadius: 'var(--radius-2)',
                      minWidth: 'var(--space-5)',
                    }}
                  >
                    <Typography
                      sx={{
                        cursor: 'pointer',
                      }}
                      variant='body1'
                    >
                      {item.tasklist.length}
                    </Typography>
                  </Stack>
                </Tooltip>
              </Stack>
            </ShowCode.When>
            <ShowCode.When isTrue={selectedGroupBy.label === 'priority'}>
              Priority :
              <PriorityPill
                isHighVisible={item.priority === 'high'}
                isMediumVisible={item.priority === 'medium'}
                isLowVisible={item.priority === 'low'}
              />{' '}
              <Tooltip title='Task count'>
                <Stack
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'var(--neutral-3)',
                    padding: 'var(--space-1)',
                    borderRadius: 'var(--radius-2)',
                    minWidth: 'var(--space-5)',
                  }}
                >
                  <Typography
                    sx={{
                      cursor: 'pointer',
                    }}
                    variant='body2'
                  >
                    {item.tasklist.length}
                  </Typography>
                </Stack>
              </Tooltip>
            </ShowCode.When>
            <ShowCode.When isTrue={selectedGroupBy.label === 'status'}>
              Status :
              <GetTaskStatusBadge indicator={item.status} />
              <Tooltip title='Task count'>
                <Stack
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'var(--neutral-3)',
                    padding: 'var(--space-1)',
                    borderRadius: 'var(--radius-2)',
                    minWidth: 'var(--space-5)',
                  }}
                >
                  <Typography
                    sx={{
                      cursor: 'pointer',
                    }}
                    variant='body2'
                  >
                    {item.tasklist.length}
                  </Typography>
                </Stack>
              </Tooltip>
            </ShowCode.When>
            <ShowCode.When isTrue={selectedGroupBy.label === 'assignee'}>
              Assignee :
              <AssigneeChip assigneeId={item.assignee} />
              <Tooltip title='Task count'>
                <Stack
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'var(--neutral-3)',
                    padding: 'var(--space-1)',
                    borderRadius: 'var(--radius-2)',
                    minWidth: 'var(--space-5)',
                  }}
                >
                  <Typography
                    sx={{
                      cursor: 'pointer',
                    }}
                    variant='body2'
                  >
                    {item.tasklist.length}
                  </Typography>
                </Stack>
              </Tooltip>
            </ShowCode.When>
          </ShowCode>
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
              <Stack
                height={'calc(100vh - 136px)'}
                style={{ backgroundColor: 'var(--neutral-2)' }}
              >
                <TaskEmpty />
              </Stack>
            </ShowCode.When>
          </>
        }
        onClickNewTask={{
          onClick: () => {
            setShowAddNew(true);
            setSelectedGroupTask(item.tasklist[0]);
          },
        }}
      />
    </Collapse>
  );
}

export default GroupSections;
