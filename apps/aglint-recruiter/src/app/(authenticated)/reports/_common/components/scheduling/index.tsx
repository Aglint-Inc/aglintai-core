import InterviewType from './interviewType';
import Reasons from './reasons';
import RecentDeclines from './recentDeclines';
import RecentReschedules from './recentReschedules';
import TrainingProgress from './TrainingProgress';

function SchedulingReports() {
  return (
    <div className='flex flex-col space-y-8'>
      <Reasons />
      <InterviewType />
      <TrainingProgress />
      <div className='flex flex-row space-x-8'>
        <div className='w-[50%]'>
          <RecentDeclines />
        </div>
        <div className='w-[50%]'>
          <RecentReschedules />
        </div>
      </div>
    </div>
  );
}

export default SchedulingReports;
