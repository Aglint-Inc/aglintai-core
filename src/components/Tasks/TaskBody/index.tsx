/* eslint-disable security/detect-object-injection */
import { capitalize } from 'lodash';

import {
  AvatarWithName,
  ListCard,
  TaskTable,
  TaskTableJobCand,
  TaskTableJobCard,
} from '@/devlink3';
import {
  TasksAgentContextType,
  useTasksContext,
} from '@/src/context/TasksContextProvider/TasksContextProvider';

import MuiAvatar from '../../Common/MuiAvatar';
import { ShowCode } from '../../Common/ShowCode';
import { useTaskStatesContext } from '../TaskStatesContext';
import AddNewTask from './AddNewTask';
import FilterTasks from './FilterTasks';
import GroupTaskCard from './GroupTaskCard';
import TaskRow from './TaskRow';
import ViewTaskDrawer from './ViewTask';

function TaskBody({ byGroup }) {
  const { tasks } = useTasksContext();

  const { setShowAddNew, setSelectedApplication } = useTaskStatesContext();

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
            slotTaskTableCard={tasks.map((ele, i) => {
              return <TaskRow task={ele} key={i} />;
            })}
          />
        </ShowCode.When>
        <ShowCode.When isTrue={byGroup}>
          <TaskTableJobCand
            slotFilter={<FilterTasks />}
            slotTaskJobCard={formattedTasks.map((item, i) => {
              return (
                <TaskTableJobCard
                  textRole={item.applications.public_jobs.job_title}
                  slotAvatarWithName={
                    <>
                      <ListCard
                        isAvatarWithNameVisible={true}
                        isListVisible={false}
                        slotAvatarWithName={
                          item?.applications && (
                            <AvatarWithName
                              slotAvatar={
                                <MuiAvatar
                                  height={'25px'}
                                  width={'25px'}
                                  src={item?.applications?.candidates.avatar}
                                  variant='circular'
                                  fontSize='14px'
                                  level={capitalize(
                                    item?.applications.candidates?.first_name +
                                      ' ' +
                                      item?.applications.candidates?.last_name,
                                  )}
                                />
                              }
                              textName={capitalize(
                                item?.applications.candidates?.first_name +
                                  ' ' +
                                  item?.applications.candidates?.last_name,
                              )}
                            />
                          )
                        }
                      />
                    </>
                  }
                  key={i}
                  slotTaskTableJobCard={item.tasklist.map((ele, i) => {
                    return <GroupTaskCard key={i} task={ele} />;
                  })}
                  onClickNewTask={{
                    onClick: () => {
                      setShowAddNew(true);
                      setSelectedApplication(item.applications);
                    },
                  }}
                />
              );
            })}
          />
        </ShowCode.When>
      </ShowCode>
    </>
  );
}

export default TaskBody;
