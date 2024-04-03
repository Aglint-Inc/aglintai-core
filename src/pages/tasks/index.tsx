
import Tasks from '@/src/components/Tasks';
import { JobAssistantProvider } from '@/src/context/JobAssistant';
import {
  TaskProvider
} from '@/src/context/TaskContext/TaskContextProvider';

function TasksPage() {

  return (
    <div>
      {/* <TaskProvider> */}
      <JobAssistantProvider>
        <Tasks />
      </JobAssistantProvider>
      {/* </TaskProvider> */}
    </div>
  );
}

TasksPage.getProvider = (page) => <TaskProvider>{page}</TaskProvider>;

export default TasksPage;
