/* eslint-disable no-unused-vars */
import { Drawer, Stack, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { ViewTask } from '@/devlink3';
import Loader from '@/src/components/Common/Loader';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { useTasksContext } from '@/src/context/TasksContextProvider/TasksContextProvider';
import { pageRoutes } from '@/src/utils/pageRouting';

import { useTaskStatesContext } from '../../TaskStatesContext';
import { taskUpdateDebounce, UpdateFunction } from '../../utils';
import SubTaskProgress from './Progress';
import TaskCard from './TaskCard';

function ViewTaskDrawer() {
  const route = useRouter();
  const { openViewTask, setOpenViewTask } = useTaskStatesContext();
  const { tasks, handelUpdateTask } = useTasksContext();
  let taskId = route.query.task_id ? (route.query.task_id as string) : null;

  let selectedTask = tasks.find((item) => item.id === taskId);

  const debouncedUpdateTask: UpdateFunction = taskUpdateDebounce(
    (taskId: string, changeValue: string) => {
      handelUpdateTask({
        id: taskId,
        data: {
          name: changeValue,
        },
      });
    },
    1000,
  );

  useEffect(() => {
    if (taskId) setOpenViewTask(true);
    else setOpenViewTask(false);
  }, [route.query.task_id]);
  return (
    <Drawer
      anchor={'right'}
      open={openViewTask}
      onClose={() => {
        route.push(pageRoutes.TASKS);
      }}
    >
      <Stack>
        <ShowCode>
          <ShowCode.When isTrue={!selectedTask}>
            <Loader />
          </ShowCode.When>
          <ShowCode.Else>
            <ViewTask
              textTaskDetail={
                <TextField
                  onChange={({ currentTarget: { value: changeValue } }) => {
                    debouncedUpdateTask(taskId, changeValue);
                  }}
                  multiline
                  minRows={1}
                  maxRows={3}
                  fullWidth
                  defaultValue={selectedTask?.name}
                  sx={{
                    '& .MuiInputBase-root': {
                      border: 'none',
                      fontSize: '1.2rem',
                    },
                  }}
                />
              }
              slotTaskCard={<TaskCard task={selectedTask} />}
              slotTaskProgress={<SubTaskProgress />}
              onClickClose={{
                onClick: () => {
                  route.push(pageRoutes.TASKS);
                },
              }}
            />
          </ShowCode.Else>
        </ShowCode>
      </Stack>
    </Drawer>
  );
}

export default ViewTaskDrawer;
