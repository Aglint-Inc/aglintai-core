import { Drawer, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { capitalize } from 'lodash';

import { PanelMemberPill } from '@/devlink2';
import { ViewTask, ViewTaskCard } from '@/devlink3';
import Loader from '@/src/components/Common/Loader';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { useTasksAgentContext } from '@/src/context/TaskContext/TaskContextProvider';

import AssigneeChip from '../../Components/AssigneeChip';
import StatusChip from '../../Components/StatusChip';
import { useTaskStatesContext } from '../../TaskStatesContext';
import SubTaskProgress from './Progress';

function ViewTaskDrawer() {
  const {
    openViewTask,
    setOpenViewTask,
    setSelectedSubTaskId,
    selectedSubTaskId,
    taskId,
  } = useTaskStatesContext();
  const { tasks } = useTasksAgentContext();

  const subTasks = tasks
    .map((task) => task.sub_tasks.map((subTask) => subTask))
    .flat(1);
  let selectedSubTask = subTasks.find((item) => item.id === selectedSubTaskId);
  const selectedTask = tasks.find((item) => item.id === taskId);

  return (
    <Drawer
      anchor={'right'}
      open={openViewTask}
      onClose={() => {
        setOpenViewTask(false);
        setSelectedSubTaskId(null);
      }}
    >
      <Stack>
        <ShowCode>
          <ShowCode.When isTrue={!selectedSubTask}>
            <Loader />
          </ShowCode.When>
          <ShowCode.Else>
            <ViewTask
              slotTaskCard={
                <ViewTaskCard
                  textDate={dayjs(selectedSubTask?.completion_date).format(
                    'ddd, MMMM D YYYY',
                  )}
                  textTaskName={selectedSubTask?.name}
                  isMarkVisible={false}
                  textMark={'Mark this task as completed'}
                  slotAgentPill={
                    <AssigneeChip assigneeId={selectedSubTask?.assignee[0]} />
                  }
                  slotOwner={
                    <PanelMemberPill
                      isCloseVisible={false}
                      slotImage={
                        <MuiAvatar
                          height={'25px'}
                          width={'25px'}
                          src={selectedTask?.created_by.name}
                          variant='circular'
                          fontSize='14px'
                          level={capitalize(selectedTask?.created_by.name)}
                        />
                      }
                      textMemberName={selectedTask?.created_by.name}
                    />
                  }
                  slotTaskStatus={
                    <StatusChip status={selectedSubTask?.status} />
                  }
                />
              }
              slotTaskProgress={<SubTaskProgress />}
              onClickClose={{
                onClick: () => {
                  setOpenViewTask(false);
                  setSelectedSubTaskId(null);
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
