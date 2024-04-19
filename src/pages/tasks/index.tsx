// import Tasks from '@/src/components/Tasks';
import Tasks from '@/src/components/Tasks';
import { JobAssistantProvider } from '@/src/context/JobAssistant';
import { TasksProvider } from '@/src/context/TasksContextProvider/TasksContextProvider';

function TasksPage() {
  return (
    <div>
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
