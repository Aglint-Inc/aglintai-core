// import Tasks from '@/src/components/Tasks';
import { useRouter } from 'next/router';

import Seo from '@/src/components/Common/Seo';
import Tasks from '@/src/components/Tasks';
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
        <TasksProvider>
          <Tasks />
        </TasksProvider>
      </div>
    </>
  );
}

export default TasksPage;
