import ModuleSchedules from '@/src/components/Scheduling/Modules/ModuleMembers/ModuleSchedules';

function Interviews({ interviewsData }) {
  return (
    <>{interviewsData && <ModuleSchedules schedules={interviewsData} />}</>
  );
}

export default Interviews;
