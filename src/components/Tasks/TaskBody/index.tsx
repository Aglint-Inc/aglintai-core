/* eslint-disable security/detect-object-injection */

import { Checkbox, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect } from 'react';

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
import ToolBar from './ToolBar';
import ViewTaskDrawer from './ViewTask';

function TaskBody({ byGroup }) {
  const { tasks, loadingTasks } = useTasksContext();

  const { setShowAddNew, selectedTasksIds, setSelectedTasksIds } =
    useTaskStatesContext();

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

  const { handelUpdateTask } = useTasksContext();

  async function upDateTasks() {
    const overDueTasks = [];
    for (let task of tasks) {
      const toDayDateTime = dayjs();
      const dueDateTime = dayjs(task.due_date);
      if (
        dueDateTime.isBefore(toDayDateTime) &&
        task.status !== 'overdue' &&
        task.status !== 'completed' &&
        task.status !== 'closed' &&
        task.status !== 'cancelled' &&
        task.status !== 'on_hold'
      ) {
        overDueTasks.push({ id: task.id, status: 'overdue' });
      }
    }
    handelUpdateTask([...overDueTasks]);
  }

  useEffect(() => {
    upDateTasks();
  }, []);

  return (
    <>
      <ViewTaskDrawer />
      <AddNewTask />
      <ShowCode>
        <ShowCode.When isTrue={!byGroup}>
          <TaskTable
            slotCheckbox={
              <Checkbox
                checked={selectedTasksIds.length > 0}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedTasksIds(tasks.map((ele) => ele.id));
                  } else {
                    setSelectedTasksIds([]);
                  }
                }}
                size='small'
                color='info'
              />
            }
            slotFilter={
              <ShowCode>
                <ShowCode.When isTrue={selectedTasksIds.length > 0}>
                  <ToolBar />
                </ShowCode.When>
                <ShowCode.Else>
                  <FilterTasks />
                </ShowCode.Else>
              </ShowCode>
            }
            onClickNewTask={{
              onClick: () => {
                setShowAddNew(true);
              },
            }}
            isNewTaskCardVisible={false}
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
            slotFilter={
              <ShowCode>
                <ShowCode.When isTrue={selectedTasksIds.length > 0}>
                  <ToolBar />
                </ShowCode.When>
                <ShowCode.Else>
                  <FilterTasks />
                </ShowCode.Else>
              </ShowCode>
            }
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
