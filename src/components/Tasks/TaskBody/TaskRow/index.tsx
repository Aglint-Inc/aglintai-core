import {
  Checkbox,
  Stack,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
} from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import {
  AvatarWithName,
  ListCard,
  PriorityPill,
  TaskTableCard,
} from '@/devlink3';
import { ShowCode } from '@/src/components/Common/ShowCode';
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
  let toDayDateTime = dayjs();
  const tomorrowDate = toDayDateTime.add(1, 'day');
  let dueDateTime = dayjs(task.due_date);
  const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
      color: 'rgba(255, 255, 255, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }));
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
        isOverdueVisible={
          (task.status === 'in_progress' &&
            (dueDateTime.isSame(tomorrowDate) ||
              dueDateTime.isSame(toDayDateTime, 'day'))) ||
          task.status === 'scheduled'
        }
        textOverdue={
          <ShowCode>
            <ShowCode.When isTrue={task.status === 'in_progress'}>
              <ShowCode>
                <ShowCode.When
                  isTrue={!!dueDateTime.isSame(toDayDateTime, 'day')}
                >
                  {`Due Today`}
                </ShowCode.When>
                <ShowCode.When
                  isTrue={!!dueDateTime.isSame(tomorrowDate, 'day')}
                >
                  {`Due Tomorrow`}
                </ShowCode.When>
                <ShowCode.Else>{''}</ShowCode.Else>
              </ShowCode>
            </ShowCode.When>
            <ShowCode.When isTrue={task.status === 'scheduled'}>
              <ShowCode>
                <ShowCode.When
                  isTrue={!!dueDateTime.isSame(toDayDateTime, 'day')}
                >
                  {`Today at ${dueDateTime.format('hh:mm A')}`}
                </ShowCode.When>
                <ShowCode.When
                  isTrue={!!dueDateTime.isSame(tomorrowDate, 'day')}
                >
                  {`Tomorrow at ${dueDateTime.format('hh:mm A')}`}
                </ShowCode.When>
                <ShowCode.Else>
                  {`${dueDateTime.format(`MMMM D [at] hh:mm A`)}`}
                </ShowCode.Else>
              </ShowCode>
            </ShowCode.When>
          </ShowCode>
        }
        onClickCard={{
          onClick: () => {
            route.push(pageRoutes.TASKS + '?task_id=' + task.id);
            setTaskId(task.id);
          },
        }}
        textTask={
          <LightTooltip
            enterDelay={1000}
            enterNextDelay={1000}
            title={
              <>
                <span
                  style={{
                    fontSize: '12px',
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
              color='info'
            />
          </Stack>
        }
      />
    </Stack>
  );
}

export default TaskRow;
