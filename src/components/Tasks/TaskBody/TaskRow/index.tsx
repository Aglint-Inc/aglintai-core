import { Checkbox, Stack } from '@mui/material';
import { capitalize } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import {
  AvatarWithName,
  ListCard,
  PriorityPill,
  TaskTableCard,
} from '@/devlink3';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import {
  TasksAgentContextType,
  useTasksContext,
} from '@/src/context/TasksContextProvider/TasksContextProvider';
import { CustomDatabase } from '@/src/types/customSchema';
import { pageRoutes } from '@/src/utils/pageRouting';
import { capitalizeAll } from '@/src/utils/text/textUtils';

import AssigneeChip from '../../Components/AssigneeChip';
import SelectStatus from '../../Components/SelectStatus';
import { useTaskStatesContext } from '../../TaskStatesContext';

function TaskRow({ task }: { task: TasksAgentContextType['tasks'][number] }) {
  const route = useRouter();
  const { setTaskId, selectedTasksIds, setSelectedTasksIds } =
    useTaskStatesContext();
  const { handelUpdateTask } = useTasksContext();
  const [selectedStatus, setSelectedStatus] = useState<
    CustomDatabase['public']['Enums']['task_status'] | null
  >(null);

  useEffect(() => {
    if (selectedStatus) {
      handelUpdateTask({ id: task.id, data: { status: selectedStatus } });
    }
  }, [selectedStatus]);
  return (
    <Stack
      sx={{
        bgcolor: selectedTasksIds.includes(task.id) && 'grey.100',
        '&:hover': {
          bgcolor: 'grey.100',
          '& div:first-child div .checkboxClass': {
            opacity: 1,
          },
        },
      }}
    >
      <TaskTableCard
        onClickCard={{
          onClick: () => {
            route.push(pageRoutes.TASKS + '?task_id=' + task.id);
            setTaskId(task.id);
          },
        }}
        textTask={capitalize(task.name)}
        //   slotAvatarWithName={<AssigneeChip assigneeId={task.assignee[0]} />}
        slotAssignedToCard={<AssigneeChip assigneeId={task.assignee[0]} />}
        slotCandidate={
          task.application_id ? (
            <>
              <ListCard
                isAvatarWithNameVisible={true}
                isListVisible={false}
                slotAvatarWithName={
                  task?.applications && (
                    <AvatarWithName
                      slotAvatar={
                        <MuiAvatar
                          height={'25px'}
                          width={'25px'}
                          src={task?.applications?.candidates.avatar}
                          variant='circular'
                          fontSize='14px'
                          level={capitalizeAll(
                            task?.applications.candidates?.first_name +
                              ' ' +
                              task?.applications.candidates?.last_name,
                          )}
                        />
                      }
                      textName={capitalizeAll(
                        task?.applications.candidates?.first_name +
                          ' ' +
                          task?.applications.candidates?.last_name,
                      )}
                    />
                  )
                }
              />
            </>
          ) : (
            '--'
          )
        }
        slotStatus={
          <SelectStatus
            status={task.status}
            setSelectedStatus={setSelectedStatus}
          />
        }
        textJob={task?.applications?.public_jobs?.job_title || '--'}
        slotPriority={
          <PriorityPill
            isHighVisible={task.priority === 'high'}
            isLowVisible={task.priority === 'low'}
            isMediumVisible={task.priority === 'medium'}
          />
        }
        slotCheckbox={
          <Stack
            className='checkboxClass'
            sx={{
              opacity: selectedTasksIds.includes(task.id) ? 1 : 0,
              '&:hover': {
                opacity: 1,
              },
              transition: 'ease-in-out 0.4s opacity',
              cursor: 'pointer',
            }}
          >
            <Checkbox
              checked={selectedTasksIds.includes(task.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  //@ts-ignore
                  setSelectedTasksIds((pre: any[]) => [task.id, ...pre]);
                } else {
                  //@ts-ignore
                  setSelectedTasksIds((pre: any[]) => {
                    const filteredIds = pre.filter(
                      (ele: string) => ele !== task.id,
                    );
                    return [...filteredIds] as string[];
                  });
                }
              }}
              size='small'
              color='info'
            />
          </Stack>
        }
      />
    </Stack>
  );
}

export default TaskRow;
