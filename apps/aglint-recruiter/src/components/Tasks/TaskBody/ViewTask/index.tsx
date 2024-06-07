/* eslint-disable no-unused-vars */
import { DatabaseEnums } from '@aglint/shared-types';
import { EmailAgentId, PhoneAgentId } from '@aglint/shared-utils';
import { Button, Drawer, Stack, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { ViewTask } from '@/devlink3/ViewTask';
import Loader from '@/src/components/Common/Loader';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { useKeyPress } from '@/src/components/JobApplicationsDashboard/hooks';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useTasksContext } from '@/src/context/TasksContextProvider/TasksContextProvider';
import ROUTES from '@/src/utils/routing/routes';
import toast from '@/src/utils/toast';

import { useTaskStatesContext } from '../../TaskStatesContext';
import { createTaskProgress } from '../../utils';
import SubTaskProgress from './Progress';
import TaskCard from './TaskCard';

function ViewTaskDrawer() {
  const route = useRouter();
  const { openViewTask, setOpenViewTask } = useTaskStatesContext();
  const { tasks: taskList, handelUpdateTask } = useTasksContext();
  const { recruiterUser } = useAuthDetails();
  const tasks = taskList.filter(
    (ele) => ele.type !== 'empty' && ele.application_id,
  );
  let taskId = route.query.task_id ? (route.query.task_id as string) : null;
  let selectedTask = tasks.find((item) => item.id === taskId);
  const [inputValue, setInputValue] = useState(selectedTask?.name);

  const [disableNext, setDisableNext] = useState(false);
  const [disablePrev, setDisablePrev] = useState(false);

  useEffect(() => {
    if (taskId) {
      setOpenViewTask(true);
      if (tasks.findIndex((ele) => ele.id === taskId) === 0) {
        setDisablePrev(true);
      }
      if (tasks.findIndex((ele) => ele.id === taskId) === tasks.length - 1) {
        setDisableNext(true);
      }
    } else setOpenViewTask(false);
    setInputValue(selectedTask?.name);
  }, [route.query.task_id]);

  function updateTask({
    status,
    currentStatus,
  }: {
    status: DatabaseEnums['task_status'];
    currentStatus: DatabaseEnums['task_status'];
  }) {
    handelUpdateTask([
      {
        status: status,
        id: taskId,
      },
    ]);
    createTaskProgress({
      type: 'status_update',
      data: {
        task_id: route.query.task_id as string,
        created_by: {
          name: recruiterUser.first_name as string,
          id: recruiterUser.user_id as string,
        },
        progress_type: 'standard',
      },
      optionData: {
        currentStatus: currentStatus,
        status: status,
      },
    });
    toast.action('Task closed.', () => {
      handelUpdateTask([
        {
          status: currentStatus,
          id: taskId,
        },
      ]);
      createTaskProgress({
        type: 'status_update',
        data: {
          task_id: route.query.task_id as string,
          created_by: {
            name: recruiterUser.first_name as string,
            id: recruiterUser.user_id as string,
          },
          progress_type: 'standard',
        },
        optionData: {
          currentStatus: status,
          status: currentStatus,
        },
      });
    });
  }

  function nextTask() {
    const nextIndex = tasks.findIndex((ele) => ele.id === taskId) + 1;
    if (nextIndex < tasks.length) {
      {
        setDisableNext(false);
        setDisablePrev(false);

        const nextTask = tasks.find(
          (ele) => ele.id === tasks[Number(nextIndex)].id,
        );
        route.push(ROUTES['/tasks']() + '?task_id=' + nextTask.id);
      }
    } else {
      setDisableNext(true);
    }
  }

  function prevTask() {
    const prevIndex = tasks.findIndex((ele) => ele.id === taskId) - 1;
    if (prevIndex >= 0) {
      {
        setDisablePrev(false);
        setDisableNext(false);
        const nextTask = tasks.find(
          (ele) => ele.id === tasks[Number(prevIndex)].id,
        );
        route.push(ROUTES['/tasks']() + '?task_id=' + nextTask.id);
      }
    } else {
      setDisablePrev(true);
    }
  }
  const { pressed: shift } = useKeyPress('Shift');
  const { pressed: up } = useKeyPress('ArrowUp');
  const { pressed: down } = useKeyPress('ArrowDown');

  const upShift = shift && up;
  const downShift = shift && down;

  useEffect(() => {
    if (upShift) {
      prevTask();
    }
    if (downShift) {
      nextTask();
    }
  }, [upShift, downShift]);
  return (
    <Drawer
      anchor={'right'}
      open={openViewTask}
      onClose={() => {
        route.push(ROUTES['/tasks']());
        setDisableNext(false);
        setDisablePrev(false);
      }}
      sx={{
        '& .MuiPaper-root': {
          overflowY: 'hidden',
        },
      }}
    >
      <ShowCode>
        <ShowCode.When isTrue={!selectedTask}>
          <Stack height={'100vh'} width={600}>
            <Loader />
          </Stack>
        </ShowCode.When>
        <ShowCode.Else>
          <ViewTask
            isCompleteTaskVisible={
              selectedTask?.assignee[0] !== EmailAgentId &&
              selectedTask?.assignee[0] !== PhoneAgentId &&
              selectedTask?.status !== 'closed' &&
              selectedTask?.status !== 'completed'
            }
            onClickCompleteTask={{
              onClick: () => {
                updateTask({
                  status: 'completed',
                  currentStatus: selectedTask.status,
                });
              },
            }}
            isCancelTaskVisible={
              selectedTask?.status !== 'closed' &&
              selectedTask?.status !== 'completed'
            }
            onClickCancelTask={{
              onClick: () => {
                updateTask({
                  status: 'closed',
                  currentStatus: selectedTask.status,
                });
              },
            }}
            isDisableNext={disableNext}
            isDisablePrev={disablePrev}
            onClickNext={{
              onClick: nextTask,
            }}
            onClickPrev={{
              onClick: prevTask,
            }}
            textTaskDetail={
              <TextField
                placeholder='Untitled'
                onChange={({ currentTarget: { value: changeValue } }) => {
                  setInputValue(changeValue);
                }}
                onBlur={() => {
                  handelUpdateTask([
                    {
                      id: taskId,
                      name: inputValue,
                    },
                  ]);
                }}
                multiline
                minRows={1}
                maxRows={3}
                fullWidth
                value={inputValue}
                sx={{
                  '& .MuiInputBase-root': {
                    border: 'none',
                    fontSize: '18px',
                    lineHeight: '24px',
                    fontWeight: 400,
                    padding: '10px',
                    bgcolor: '#F7F9FB',
                    borderRadius: '10px',
                  },
                }}
              />
            }
            slotTaskCard={<TaskCard task={selectedTask} />}
            slotTaskProgress={<SubTaskProgress />}
            onClickClose={{
              onClick: () => {
                route.push(ROUTES['/tasks']());
              },
            }}
          />
        </ShowCode.Else>
      </ShowCode>
    </Drawer>
  );
}

export default ViewTaskDrawer;
