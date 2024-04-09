import { Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { BodyWithSublink, PageLayout, SublinkTab } from '@/devlink2';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useTasksAgentContext } from '@/src/context/TaskContext/TaskContextProvider';
import { pageRoutes } from '@/src/utils/pageRouting';

import AddTaskButton from './Components/AddTaskButton';
import TaskBody from './TaskBody';
import { TaskStatesProvider } from './TaskStatesContext';

const Tasks = () => {
  const { filter, handelFilter } = useTasksAgentContext();
  const { userDetails } = useAuthDetails();
  const searchParam = useSearchParams();
  const router = useRouter();
  const navItems = [
    { name: 'My Tasks', pathName: 'myTasks' },
    { name: 'All Tasks', pathName: 'allTasks' },
  ];

  useEffect(() => {
    if (searchParam.has('myTasks')) {
      filter.assignee.values = [userDetails.user.id];
      handelFilter({
        ...filter,
      });
    }
    if (searchParam.has('allTasks')) {
      filter.assignee.values = [];
      handelFilter({
        ...filter,
      });
    }
  }, []);
  return (
    <TaskStatesProvider>
      <PageLayout
        slotTopbarLeft={<Typography variant='body1'>Tasks</Typography>}
        slotTopbarRight={<AddTaskButton />}
        slotBody={
          <BodyWithSublink
            slotSublinkTab={navItems.map((item, i) => {
              return (
                <SublinkTab
                  onClickTab={{
                    onClick: () => {
                      if (item.pathName === 'myTasks') {
                        filter.assignee.values = [userDetails.user.id];
                        handelFilter({
                          ...filter,
                        });
                      }
                      if (item.pathName === 'allTasks') {
                        filter.assignee.values = [];
                        handelFilter({
                          ...filter,
                        });
                      }

                      router.push('/' + pageRoutes.TASKS + '?' + item.pathName);
                    },
                  }}
                  isActtive={searchParam.has(item.pathName)}
                  key={i}
                  text={item.name}
                />
              );
            })}
            slotTabContent={<TaskBody />}
          />
        }
      />
    </TaskStatesProvider>
  );
};

export default Tasks;
