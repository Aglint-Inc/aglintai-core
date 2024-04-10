import { useState } from 'react';

import { TaskCard } from '@/devlink3';
import { ShowCode } from '@/src/components/Common/ShowCode';
import { useInterviewerList } from '@/src/components/CompanyDetailComp/Interviewers';
import { TasksAgentContextType } from '@/src/context/TaskContext/TaskContextProvider';

import SubTaskCardSkeleton from '../../Components/SubTaskCardSkeleton';
import { useTaskStatesContext } from '../../TaskStatesContext';
import AddSubTask from '../AddSubTask';
import UpdateSubTask from '../UpdateSubTask';
import SubTaskCard from './SubTaskCard';

function TaskCardBox({
  task,
  index,
}: {
  task: TasksAgentContextType['tasks'][number];
  index: number;
}) {
  const { data: members } = useInterviewerList();
  const { taskId, setTaskId, selectedSubTaskId, addingSubTask, openViewTask } =
    useTaskStatesContext();
  const [selectedIndex, setSelectedIndex] = useState(null);
  // useEffect(() => {
  //   return () => {
  //     if (taskId) {
  //       setSelectedIndex(null);
  //     }
  //   };
  // }, [taskId]);
  if (members)
    return (
      <TaskCard
        textTitle={task.name}
        slotTaskInline={
          <>
            {task.sub_tasks &&
              task.sub_tasks.map((subTask, index) => {
                return (
                  <>
                    <ShowCode>
                      <ShowCode.When
                        isTrue={
                          selectedSubTaskId === subTask.id && !openViewTask
                        }
                      >
                        <UpdateSubTask taskId={task.id} subTask={subTask} />
                      </ShowCode.When>
                      <ShowCode.Else>
                        <SubTaskCard
                          taskId={task.id}
                          subTask={subTask}
                          subTaskIndex={index}
                        />
                      </ShowCode.Else>
                    </ShowCode>
                  </>
                );
              })}
            <ShowCode.When isTrue={addingSubTask && taskId === task.id}>
              <SubTaskCardSkeleton />
            </ShowCode.When>
          </>
        }
        onClickAddTask={{
          onClick: () => {
            setTaskId(task.id);
            setSelectedIndex(index);
          },
        }}
        slotNewTask={<AddSubTask taskId={task.id} />}
        isNewTaskVisible={selectedIndex === index && task.id === taskId}
      />
    );
}

export default TaskCardBox;
