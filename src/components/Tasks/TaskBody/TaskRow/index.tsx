import { Checkbox, Stack } from '@mui/material';
import { capitalize } from 'lodash';
import { useRouter } from 'next/router';

import {
  AvatarWithName,
  ListCard,
  PriorityPill,
  TaskTableCard,
} from '@/devlink3';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { TasksAgentContextType } from '@/src/context/TasksContextProvider/TasksContextProvider';
import { pageRoutes } from '@/src/utils/pageRouting';
import { capitalizeAll } from '@/src/utils/text/textUtils';

import AssigneeChip from '../../Components/AssigneeChip';
import StatusChip from '../../Components/StatusChip';
import { useTaskStatesContext } from '../../TaskStatesContext';

function TaskRow({ task }: { task: TasksAgentContextType['tasks'][number] }) {
  const route = useRouter();
  const { setTaskId, selectedTasksIds, setSelectedTasksIds } =
    useTaskStatesContext();

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
        textTask={capitalize(task.name) || 'Untitled'}
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
                      isAvatarVisible={false}
                      isCandidateIconVisible={true}
                      isRoleVisible={false}
                      isReverseShadowVisible={false}
                      isShadowVisible={false}
                      slotAvatar={<></>}
                      isTickVisible={false}
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
        slotStatus={<StatusChip status={task.status} />}
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
