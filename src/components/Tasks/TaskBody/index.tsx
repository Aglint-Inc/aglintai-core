/* eslint-disable security/detect-object-injection */

import { Stack } from '@mui/material';

import { TaskEmpty, TaskTable, TaskTableJobCand } from '@/devlink3';
import {
  TasksAgentContextType,
  useTasksContext,
} from '@/src/context/TasksContextProvider/TasksContextProvider';

import { ShowCode } from '../../Common/ShowCode';
import DynamicLoader from '../../Scheduling/Interviewers/DynamicLoader';
import { useTaskStatesContext } from '../TaskStatesContext';
import AddNewTask from './AddNewTask';
import FilterTasks from './FilterTasks';
import GroupSections from './GroupSections';
import TaskRow from './TaskRow';
import ViewTaskDrawer from './ViewTask';

function TaskBody({ byGroup }) {
  const { tasks, loadingTasks } = useTasksContext();

  const { setShowAddNew } = useTaskStatesContext();

  const groupedTasks = tasks
    .filter((ele) => ele.application_id)
    .reduce((acc, task) => {
      const { application_id, ...taskDetails } = task;
      if (!acc[application_id]) {
        acc[application_id] = { applications: {}, tasklist: [] };
      }
      acc[application_id].applications = task.applications;
      acc[application_id].tasklist.push(taskDetails);
      return acc;
    }, {});

  const formattedTasks = Object.values(groupedTasks) as {
    applications: TasksAgentContextType['tasks'][number]['applications'];
    tasklist: TasksAgentContextType['tasks'];
  }[];

  return (
    <>
      <ViewTaskDrawer />
      <AddNewTask />
      <ShowCode>
        <ShowCode.When isTrue={!byGroup}>
          <TaskTable
            slotFilter={<FilterTasks />}
            onClickNewTask={{
              onClick: () => {
                setShowAddNew(true);
              },
            }}
            slotTaskTableCard={
              <>
                {tasks
                  .filter((ele) => ele.type !== 'empty')
                  .map((ele, i) => {
                    return (
                      <>
                        <TaskRow task={ele} key={i} />
                      </>
                    );
                  })}
                <ShowCode.When isTrue={!loadingTasks && tasks.length === 0}>
                  <Stack height={'40vh'}>
                    <TaskEmpty />
                  </Stack>
                </ShowCode.When>
                <ShowCode.When isTrue={loadingTasks}>
                  <DynamicLoader height='80%' />
                </ShowCode.When>
              </>
            }
          />
        </ShowCode.When>
        <ShowCode.When isTrue={byGroup}>
          <TaskTableJobCand
            slotFilter={<FilterTasks />}
            slotTaskJobCard={
              <>
                {formattedTasks.map((item, i) => {
                  return <GroupSections key={i} item={item} index={i} />;
                })}
                <ShowCode.When isTrue={!loadingTasks && tasks.length === 0}>
                  <Stack height={'40vh'}>
                    <TaskEmpty />
                  </Stack>
                </ShowCode.When>
                <ShowCode.When isTrue={loadingTasks}>
                  <DynamicLoader height='80%' />
                </ShowCode.When>
              </>
            }
          />
        </ShowCode.When>
      </ShowCode>
    </>
  );
}

export default TaskBody;
