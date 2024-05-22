// import Tasks from '@/src/components/Tasks';
import { useRouter } from 'next/router';

import Seo from '@/src/components/Common/Seo';
import Tasks from '@/src/components/Tasks';
import { JobAssistantProvider } from '@/src/context/JobAssistant';
import { TasksProvider } from '@/src/context/TasksContextProvider/TasksContextProvider';

function TasksPage() {
  const {
    query: { task_id },
  } = useRouter();
  return (
    <>
      {task_id?.length > 0 ? (
        <Seo
          title='Tasks Details | Aglint AI'
          description='AI for People Products'
        />
      ) : (
        <Seo
          title='Tasks Lists | Aglint AI'
          description='AI for People Products'
        />
      )}
      <div>
        {/* <TaskProvider> */}
        <JobAssistantProvider>
          <TasksProvider>
            <Tasks />
          </TasksProvider>
        </JobAssistantProvider>
        {/* </TaskProvider> */}
      </div>
    </>
  );
}

export default TasksPage;
