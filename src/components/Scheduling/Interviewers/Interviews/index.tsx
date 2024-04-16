import ModuleSchedules from '@/src/components/Scheduling/Common/ModuleSchedules';

function Interviews({ interviewsData }) {
  return (
    <>{interviewsData && <ModuleSchedules schedules={interviewsData} />}</>
  );
}

export default Interviews;
