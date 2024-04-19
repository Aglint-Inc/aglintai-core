import { Checkbox } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { TaskTableJobSubCard } from '@/devlink3';
import {
  TasksAgentContextType,
  useTasksContext,
} from '@/src/context/TasksContextProvider/TasksContextProvider';
import { CustomDatabase } from '@/src/types/customSchema';

import AssigneeChip from '../../Components/AssigneeChip';
import SelectStatus from '../../Components/SelectStatus';
import { useTaskStatesContext } from '../../TaskStatesContext';

function GroupTaskCard({ task }: { task: TasksAgentContextType['tasks'][number] }) {
  const { setTaskId, setOpenViewTask } = useTaskStatesContext();
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
    <TaskTableJobSubCard
      onClickCard={{
        onClick: () => {
          setOpenViewTask(true);
          setTaskId(task.id);
        },
      }}
      slotAssignedTo={<AssigneeChip assigneeId={task.assignee[0]} />}
      slotStatus={
        <SelectStatus
          status={task.status}
          setSelectedStatus={setSelectedStatus}
        />
      }
      textTask={task.name}
      slotCheckbox={
        <Checkbox
          // onChange={(e) => {
          //   console.log(e.target.checked);
          // }}
          size='small'
          color='info'
        />
      }
    />
  );
}

export default GroupTaskCard;
