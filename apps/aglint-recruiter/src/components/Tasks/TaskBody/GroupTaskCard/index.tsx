import {
  Checkbox,
  Stack,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import { AvatarWithName } from '@/devlink3/AvatarWithName';
import { PriorityPill } from '@/devlink3/PriorityPill';
import { TaskTableJobSubCard } from '@/devlink3/TaskTableJobSubCard';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { TasksAgentContextType } from '@/src/context/TasksContextProvider/TasksContextProvider';
import { getFullName } from '@/src/utils/jsonResume';
import ROUTES from '@/src/utils/routing/routes';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

import AssigneeChip from '../../Components/AssigneeChip';
import TaskStatusTag from '../../Components/TaskStatusTag';
import { useTaskStatesContext } from '../../TaskStatesContext';

function GroupTaskCard({
  task,
}: {
  task: TasksAgentContextType['tasks'][number];
}) {
  const route = useRouter();
  const {
    setTaskId,
    taskId,
    selectedTasksIds,
    setSelectedTasksIds,
    selectedGroupBy,
  } = useTaskStatesContext();
  let toDayDateTime = dayjs();
  const tomorrowDate = toDayDateTime.add(1, 'day');
  let dueDateTime = dayjs(task.due_date);

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
        bgcolor: taskId === task.id && 'var(--neutral-3)',
        '&:hover': {
          bgcolor: 'var(--neutral-3)',
          '& div:first-child div .checkboxClass': {
            opacity: 1,
          },
        },
      }}
    >
      <TaskTableJobSubCard
        gridProps={{
          style: {
            padding: '1%',
            gridTemplateColumns:
              selectedGroupBy.label === 'job'
                ? `20px 1fr 150px 110px 160px 180px 1px`
                : selectedGroupBy.label === 'candidate'
                  ? `20px 1fr 150px 110px 160px 1px 180px`
                  : selectedGroupBy.label === 'assignee'
                    ? `20px 1fr 150px 110px 1px 160px 180px`
                    : selectedGroupBy.label === 'priority'
                      ? `20px 1fr 150px 1px 160px 160px 180px`
                      : selectedGroupBy.label === 'status'
                        ? `20px 1fr 1px 160px 160px 160px 180px`
                        : null,
          },
        }}
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
            route.replace(ROUTES['/tasks']() + '?task_id=' + task.id);
            setTaskId(task.id);
          },
        }}
        slotAssignedTo={
          <ShowCode>
            <ShowCode.When isTrue={selectedGroupBy.label === 'assignee'}>
              {''}
            </ShowCode.When>
            <ShowCode.Else>
              <AssigneeChip assigneeId={task.assignee[0]} />
            </ShowCode.Else>
          </ShowCode>
        }
        slotStatus={
          <ShowCode>
            <ShowCode.When isTrue={selectedGroupBy.label === 'status'}>
              {''}
            </ShowCode.When>
            <ShowCode.Else>
              <TaskStatusTag task={task} />
            </ShowCode.Else>
          </ShowCode>
        }
        textTask={
          <LightTooltip
            enterDelay={100}
            enterNextDelay={100}
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
              sx={{ color: 'var(--accent-9)' }}
            />
          </Stack>
        }
        slotPriorityPill={
          <ShowCode>
            <ShowCode.When isTrue={selectedGroupBy.label === 'priority'}>
              {''}
            </ShowCode.When>
            <ShowCode.Else>
              <PriorityPill
                isHighVisible={task.priority === 'high'}
                isLowVisible={task.priority === 'low'}
                isMediumVisible={task.priority === 'medium'}
              />
            </ShowCode.Else>
          </ShowCode>
        }
        slotCandidate={
          <ShowCode>
            <ShowCode.When isTrue={selectedGroupBy.label === 'candidate'}>
              {''}
            </ShowCode.When>
            <ShowCode.Else>
              <AvatarWithName
                isAvatarVisible={false}
                isCandidateIconVisible={true}
                textName={getFullName(
                  task?.applications?.candidates?.first_name,
                  task?.applications?.candidates?.last_name,
                )}
              />
            </ShowCode.Else>
          </ShowCode>
        }
        slotJob={
          <ShowCode>
            <ShowCode.When isTrue={selectedGroupBy.label === 'job'}>
              {''}
            </ShowCode.When>
            <ShowCode.Else>
              <Typography
                sx={{
                  cursor: 'pointer',
                }}
                fontSize={'14px'}
              >
                {capitalizeFirstLetter(
                  task.applications?.public_jobs?.job_title,
                )}
              </Typography>
            </ShowCode.Else>
          </ShowCode>
        }
      />
    </Stack>
  );
}

export default GroupTaskCard;
