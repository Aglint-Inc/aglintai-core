import {
  Checkbox,
  Stack,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
} from '@mui/material';
import { useRouter } from 'next/router';

import { AvatarWithName } from '@/devlink3/AvatarWithName';
import { ListCard } from '@/devlink3/ListCard';
import { PriorityPill } from '@/devlink3/PriorityPill';
import { TaskTableCard } from '@/devlink3/TaskTableCard';
import { TasksAgentContextType } from '@/src/context/TasksContextProvider/TasksContextProvider';
import ROUTES from '@/src/utils/routing/routes';
import {
  capitalizeAll,
  capitalizeFirstLetter,
} from '@/src/utils/text/textUtils';

import AssigneeChip from '../../Components/AssigneeChip';
import TaskStatusTag from '../../Components/TaskStatusTag';
import { useTaskStatesContext } from '../../TaskStatesContext';

function TaskRow({ task }: { task: TasksAgentContextType['tasks'][number] }) {
  const route = useRouter();
  const { setTaskId, taskId, selectedTasksIds, setSelectedTasksIds } =
    useTaskStatesContext();
  // let toDayDateTime = dayjs();
  // const tomorrowDate = toDayDateTime.add(1, 'day');
  // let dueDateTime = dayjs(task.due_date);
  const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: 'var(--neutral-12)',
      border: '1px solid var(--neutral-6)',
      color: 'var(--neutral-1)',
      boxShadow: 'none',
      fontSize: 'var(--font-size-2)',
    },
  }));
  return (
    <Stack
      sx={{
        bgcolor:
          taskId === task.id || selectedTasksIds.includes(task.id)
            ? 'var(--orange-2)'
            : undefined,
        '&:hover': {
          bgcolor: 'var(--neutral-2)',
          '& div:first-child div .checkboxClass': {
            opacity: 1,
          },
        },
      }}
    >
      <TaskTableCard
        isOverdueVisible={
          false
          // (task.status === 'in_progress' &&
          //   (dueDateTime.isSame(tomorrowDate) ||
          //     dueDateTime.isSame(toDayDateTime, 'day'))) ||
          // task.status === 'scheduled'
        }
        // textOverdue={
        //   <ShowCode>
        //     <ShowCode.When isTrue={task.status === 'in_progress'}>
        //       <ShowCode>
        //         <ShowCode.When
        //           isTrue={!!dueDateTime.isSame(toDayDateTime, 'day')}
        //         >
        //           {`Due Today`}
        //         </ShowCode.When>
        //         <ShowCode.When
        //           isTrue={!!dueDateTime.isSame(tomorrowDate, 'day')}
        //         >
        //           {`Due Tomorrow`}
        //         </ShowCode.When>
        //         <ShowCode.Else>{''}</ShowCode.Else>
        //       </ShowCode>
        //     </ShowCode.When>
        //     <ShowCode.When isTrue={task.status === 'scheduled'}>
        //       <ShowCode>
        //         <ShowCode.When
        //           isTrue={!!dueDateTime.isSame(toDayDateTime, 'day')}
        //         >
        //           {`Today at ${dueDateTime.format('hh:mm A')}`}
        //         </ShowCode.When>
        //         <ShowCode.When
        //           isTrue={!!dueDateTime.isSame(tomorrowDate, 'day')}
        //         >
        //           {`Tomorrow at ${dueDateTime.format('hh:mm A')}`}
        //         </ShowCode.When>
        //         <ShowCode.Else>
        //           {`${dueDateTime.format(`MMMM D [at] hh:mm A`)}`}
        //         </ShowCode.Else>
        //       </ShowCode>
        //     </ShowCode.When>
        //   </ShowCode>
        // }
        onClickCard={{
          onClick: () => {
            route.replace(ROUTES['/tasks']() + '?task_id=' + task.id);
            setTaskId(task.id);
          },
        }}
        textTask={
          <LightTooltip
            enterDelay={100}
            enterNextDelay={100}
            title={
              <>
                <span
                  style={{
                    fontSize: 'var(--font-size-1)',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: task.name || 'Untitled',
                  }}
                ></span>
              </>
            }
          >
            <span
              dangerouslySetInnerHTML={{
                __html: task.name || 'Untitled',
              }}
            ></span>
          </LightTooltip>
        }
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
                          (task?.applications.candidates?.last_name ?? ''),
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
        slotStatus={<TaskStatusTag task={task} />}
        textJob={
          capitalizeFirstLetter(task?.applications?.public_jobs?.job_title) ||
          '--'
        }
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
                  setSelectedTasksIds((pre: any[]) => {
                    const selectedIds = [task.id, ...pre];
                    return selectedIds;
                  });
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
              sx={{ color: 'var(--accent-9)' }}
            />
          </Stack>
        }
      />
    </Stack>
  );
}

export default TaskRow;
