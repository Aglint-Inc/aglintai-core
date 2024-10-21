import CandidatePipeline from './candidatePipeline';
import InterviewerPerformance from './interviewerPerformance';
import InterviewStatistics from './interviewStatistics';

function StatsCards({ module_id }: { module_id: string }) {
  return (
    <div className='flex flex-col space-y-4'>
      <InterviewStatistics module_id={module_id} />

      <CandidatePipeline module_id={module_id} />

      <InterviewerPerformance module_id={module_id} />
    </div>
  );
}

export default StatsCards;
