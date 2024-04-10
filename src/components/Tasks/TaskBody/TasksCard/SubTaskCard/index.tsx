import { Checkbox } from '@mui/material';
import dayjs from 'dayjs';
import { capitalize } from 'lodash';

import { TaskInline } from '@/devlink3';
import { TasksAgentContextType } from '@/src/context/TaskContext/TaskContextProvider';

import AssigneeChip from '../../../Components/AssigneeChip';
import StatusChip from '../../../Components/StatusChip';
import { useTaskStatesContext } from '../../../TaskStatesContext';

function SubTaskCard({
  subTask,
  subTaskIndex,
  taskId,
}: {
  subTask: TasksAgentContextType['tasks'][number]['sub_tasks'][number];
  subTaskIndex: number;
  taskId: string;
}) {
  const { setOpenViewTask, setSelectedSubTaskId, setTaskId } =
    useTaskStatesContext();

  return (
    <TaskInline
      onClickEdit={{
        onClick: () => {
          setSelectedSubTaskId(subTask.id);
        },
      }}
      onClickOpen={{
        onClick: () => {
          setOpenViewTask(true);
          setSelectedSubTaskId(subTask.id);
          setTaskId(taskId);
        },
      }}
      key={subTaskIndex}
      textTaskName={
        <>
          <div
            dangerouslySetInnerHTML={{ __html: capitalize(subTask.name) }}
          ></div>
        </>
      }
      textDate={
        subTask.completion_date
          ? dayjs(subTask.completion_date).format('ddd, MMMM D YYYY')
          : 'Time not mentioned'
      }
      slotCheckbox={
        <Checkbox
          // onChange={(e) => {
          //   console.log(e.target.checked);
          // }}
          size='medium'
          color='info'
        />
      }
      slotPill={<AssigneeChip assigneeId={subTask.assignee[0]} />}
      slotTaskStatus={<StatusChip status={subTask.status} />}
    />
  );
}

export default SubTaskCard;
