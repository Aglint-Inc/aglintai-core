import { Checkbox } from '@mui/material';
import { capitalize } from 'lodash';
import { useEffect, useState } from 'react';

import { AvatarWithName, ListCard, TaskTableCard } from '@/devlink3';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import {
  TasksAgentContextType,
  useTasksContext,
} from '@/src/context/TasksContextProvider/TasksContextProvider';
import { CustomDatabase } from '@/src/types/customSchema';

import AssigneeChip from '../../Components/AssigneeChip';
import SelectStatus from '../../Components/SelectStatus';
import { useTaskStatesContext } from '../../TaskStatesContext';

function TaskRow({ task }: { task: TasksAgentContextType['tasks'][number] }) {
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
    <TaskTableCard
      onClickCard={{
        onClick: () => {
          setOpenViewTask(true);
          setTaskId(task.id);
        },
      }}
      textTask={task.name}
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
                    slotAvatar={
                      <MuiAvatar
                        height={'25px'}
                        width={'25px'}
                        src={task?.applications?.candidates.avatar}
                        variant='circular'
                        fontSize='14px'
                        level={capitalize(
                          task?.applications.candidates?.first_name +
                            ' ' +
                            task?.applications.candidates?.last_name,
                        )}
                      />
                    }
                    textName={capitalize(
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
      slotStatus={
        <SelectStatus
          status={task.status}
          setSelectedStatus={setSelectedStatus}
        />
      }
      textJob={task?.applications?.public_jobs?.job_title || '--'}
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

export default TaskRow;
