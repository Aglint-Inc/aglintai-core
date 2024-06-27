/* eslint-disable security/detect-object-injection */

import { Checkbox, Stack } from '@mui/material';

import { TaskEmpty } from '@/devlink3/TaskEmpty';
import { TaskTable } from '@/devlink3/TaskTable';
import { TaskTableJobCand } from '@/devlink3/TaskTableJobCand';
import { useTasksContext } from '@/src/context/TasksContextProvider/TasksContextProvider';

import { ShowCode } from '../../Common/ShowCode';
import DynamicLoader from '../../Scheduling/Interviewers/DynamicLoader';
import { useTaskStatesContext } from '../TaskStatesContext';
import { getFormattedTask } from '../utils';
import AddNewTask from './AddNewTask';
import FilterTasks from './FilterTasks';
import GroupSections from './GroupSections';
import TaskRow from './TaskRow';
import ToolBar from './ToolBar';
import ViewTaskDrawer from './ViewTask';

function TaskBody() {
  const { tasks, loadingTasks } = useTasksContext();

  const {
    setShowAddNew,
    selectedTasksIds,
    setSelectedTasksIds,
    selectedGroupBy,
  } = useTaskStatesContext();

  const formattedTasks = getFormattedTask({ tasks, selectedGroupBy });

  return (
    <>
      <ViewTaskDrawer />
      <AddNewTask />
      <ShowCode>
        <ShowCode.When isTrue={selectedGroupBy.label === 'none'}>
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
                sx={{color:'var(--accent-9)'}}
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
                  <Stack height={'calc(100vh - 176px)'} style={{ backgroundColor: 'var(--neutral-2)' }}>
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
        <ShowCode.When
          isTrue={selectedGroupBy && selectedGroupBy.label !== 'none'}
        >
          <TaskTableJobCand
            gridProps={{
              style: {
                gridTemplateColumns:
                  selectedGroupBy.label === 'job'
                    ? `20px 1fr 150px 110px 160px 180px 1px`
                    : selectedGroupBy.label === 'candidate'
                      ? `20px 1fr 150px 110px 160px 1px 180px`
                      : selectedGroupBy.label === 'assignee'
                        ? `20px 1fr 150px 110px 1px 160px 180px`
                        : selectedGroupBy.label === 'priority'
                          ? `20px 1fr 150px 1px 160px 160px 180px`
                          : selectedGroupBy.label === 'status'
                            ? `20px 1fr 1px 160px 160px 160px 180px`
                            : null,
                alignContent: 'center',
              },
            }}
            textJobHeader={selectedGroupBy.label === 'job' ? '' : 'Job'}
            textAssigneeHeader={
              selectedGroupBy.label === 'assignee' ? '' : 'Assignee'
            }
            textCandidateHeader={
              selectedGroupBy.label === 'candidate' ? '' : 'Candidate'
            }
            textPriorityHeader={
              selectedGroupBy.label === 'priority' ? '' : 'Priority'
            }
            textStatusHeader={
              selectedGroupBy.label === 'status' ? '' : 'Status'
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
            slotTaskJobCard={
              <>
                {formattedTasks &&
                  formattedTasks.map((item, i) => {
                    return <GroupSections key={i} item={item} index={i} />;
                  })}
                <ShowCode.When isTrue={!loadingTasks && tasks.length === 0}>
                <Stack height={'calc(100vh - 136px)'} style={{ backgroundColor: 'var(--neutral-2)' }}>
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
