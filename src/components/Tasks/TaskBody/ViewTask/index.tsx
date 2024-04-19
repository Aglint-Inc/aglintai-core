/* eslint-disable no-unused-vars */
import { Drawer, Stack, TextField } from '@mui/material';

import { ViewTask } from '@/devlink3';
import Loader from '@/src/components/Common/Loader';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { useTasksContext } from '@/src/context/TasksContextProvider/TasksContextProvider';

import { useTaskStatesContext } from '../../TaskStatesContext';
import { taskUpdateDebounce, UpdateFunction } from '../../utils';
import SubTaskProgress from './Progress';
import TaskCard from './TaskCard';

function ViewTaskDrawer() {
  const { openViewTask, setOpenViewTask, taskId } = useTaskStatesContext();
  const { tasks, handelUpdateTask } = useTasksContext();

  const selectedTask = tasks.find((item) => item.id === taskId);

  // Assuming handelUpdateTask is your update function and taskId is the task ID
  const debouncedUpdateTask: UpdateFunction = taskUpdateDebounce(
    (taskId: string, changeValue: string) => {
      handelUpdateTask({
        id: taskId,
        data: {
          name: changeValue,
        },
      });
    },
    1000, // Delay of 1000ms (1 second)
  );
  return (
    <Drawer
      anchor={'right'}
      open={openViewTask}
      onClose={() => {
        setOpenViewTask(false);
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
                  setOpenViewTask(false);
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
