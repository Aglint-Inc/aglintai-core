import { useCurrentJob } from '@/job/hooks';

import ReorderableInterviewPlan from './ReorderableInterviewPlan';

export const CandidatePlan = () => {
  const { job_id } = useCurrentJob();
  return (
    <div className='w-full'>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-col gap-2'>
          <h2 className='mb-2 text-xl font-bold'>Candidate Plan</h2>
          <p className='mb-4 text-sm text-gray-600'>
            Update the candidate plan here. Changes will be saved automatically.
          </p>
        </div>
      </div>
      <div className='my-8 mb-10 max-w-2xl space-y-4'>
        <ReorderableInterviewPlan jobId={job_id} applicationId={null} />
      </div>
    </div>
  );
};
