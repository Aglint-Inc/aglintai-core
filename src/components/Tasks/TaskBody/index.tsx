import { Task } from '@/devlink3';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useTasksAgentContext } from '@/src/context/TaskContext/TaskContextProvider';
import { FilterHeader } from '@/src/context/Tasks/Filters/FilterHeader';

import { ShowCode } from '../../Common/ShowCode';
import { EmailAgentId, PhoneAgentId } from '../utils';
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
  const { userDetails } = useAuthDetails();

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
                type: 'filter',
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
                type: 'filter',
                name: 'Assignee',
                options: [
                  { header: 'Agents', options: agentsDetails },
                  { header: 'Members', options: filter.assignee.options },
                ],
                setValue: (val) => {
                  handelFilter({
                    ...filter,
                    assignee: { ...filter.assignee, values: val },
                  });
                },
                value: filter.assignee.values,
              },
              {
                type: 'filter',
                name: 'Job Title',
                options: filter.jobTitle.options,
                setValue: (val) => {
                  handelFilter({
                    ...filter,
                    jobTitle: { ...filter.jobTitle, values: val },
                  });
                },
                value: filter.jobTitle.values,
              },
              {
                type: 'button',
                name: 'My Tasks',
                active: filter.assignee.values.includes(userDetails?.user?.id),
                onClick: () => {
                  {
                    filter.assignee.values = filter.assignee.values.includes(
                      userDetails.user.id,
                    )
                      ? []
                      : [userDetails.user.id];
                    handelFilter({
                      ...filter,
                    });
                  }
                },
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

const agentsDetails = [
  {
    id: EmailAgentId,
    label: 'Email',
  },
  {
    id: PhoneAgentId,
    label: 'Phone',
  },
];
