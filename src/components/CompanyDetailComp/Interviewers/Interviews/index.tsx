import ModuleSchedules from '@/src/components/Scheduling/Modules/ModuleMembers/ModuleSchedules';
import { useInterviewerContext } from '@/src/context/InterviewerContext/InterviewerContext';

function Interviews() {
  const { interviewsData } = useInterviewerContext();
  return (
    <>{interviewsData && <ModuleSchedules schedules={interviewsData} />}</>
  );
}

export default Interviews;
