import { Task } from '@/devlink3';
import { useTasksAgentContext } from '@/src/context/TaskContext/TaskContextProvider';
import { FilterHeader } from '@/src/context/Tasks/Filters/FilterHeader';

import { ShowCode } from '../../Common/ShowCode';
import AddTask from './AddTask';
import TaskCardBox from './TasksCard';
import ViewTaskDrawer from './ViewTask';

export type TaskType = {
  id: string;
  name: string;
  status: 'in_progress' | 'completed' | 'closed' | 'pending';
  applications: {
    id: string;
    candidates: {
      first_name: string;
      last_name: string;
    };
  };
  sub_tasks: {
    name: string;
    completion_date: string;
    task_id: string;
    agent: 'call' | 'email' | 'job' | null;
    status: 'in_progress' | 'completed' | 'cancelled' | 'pending';
    assignee: string;
  }[];
};

function TaskBody() {
  const { tasks, search, filter, handelSearch, handelFilter } =
    useTasksAgentContext();

  return (
    <>
      <AddTask />
      <ViewTaskDrawer />
      <Task
        slotSearchFilter={
          <FilterHeader
            search={{
              value: search,
              setValue: (e) => {
                handelSearch(e);
              },
            }}
            filters={[
              {
                name: 'State',
                options: filter.status.options,
                setValue: (val) => {
                  handelFilter({
                    ...filter,
                    status: { ...filter.status, values: val },
                  });
                },
                value: filter.status.values,
              },
              {
                name: 'Assignee',
                options: filter.assignee.options,
                setValue: (val) => {
                  handelFilter({
                    ...filter,
                    assignee: { ...filter.assignee, values: val },
                  });
                },
                value: filter.assignee.values,
              },
            ]}
          />
        }
        slotTaskCard={
          <ShowCode>
            <ShowCode.When isTrue={!!tasks}>
              {tasks &&
                tasks.map((item, index) => {
                  return <TaskCardBox task={item} key={index} />;
                })}
            </ShowCode.When>
          </ShowCode>
        }
      />
    </>
  );
}

export default TaskBody;
