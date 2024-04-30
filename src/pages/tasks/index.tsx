// import Tasks from '@/src/components/Tasks';
import Seo from '@/src/components/Common/Seo';
import Tasks from '@/src/components/Tasks';
import { JobAssistantProvider } from '@/src/context/JobAssistant';
import { TasksProvider } from '@/src/context/TasksContextProvider/TasksContextProvider';

function TasksPage() {
  return (
    <div>
      <Seo
        title={`Tasks`}
        description='AI for People Products'
      />
      {/* <TaskProvider> */}
      <JobAssistantProvider>
        <TasksProvider>
          <Tasks />
        </TasksProvider>
      </JobAssistantProvider>
      {/* </TaskProvider> */}
    </div>
  );
}

export default TasksPage;
