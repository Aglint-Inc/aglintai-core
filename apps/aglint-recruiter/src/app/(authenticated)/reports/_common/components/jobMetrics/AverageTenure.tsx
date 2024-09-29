import { Skeleton } from '@components/ui/skeleton';

import UISectionCard from '@/components/Common/UISectionCard';

import { useCandidateExp } from '../../hook/job/jobMatrix';

export default function AverageTenure() {
  const { data, isFetching } = useCandidateExp();
  return (
    <div className='max-w-3xl'>
      <UISectionCard title='Average Tenure'>
        <div className='flex w-full flex-col items-center justify-center'>
          <div className='mb-2 text-6xl font-bold'>
            {isFetching ? (
              <Skeleton className='h-[60px] w-[100px]' />
            ) : (
              data.avg_tenure || '-'
            )}
          </div>
          <div className='mb-4 text-2xl font-semibold'>Years</div>
          <p className='text-center text-muted-foreground'>
            Average time before switching companies.
          </p>
        </div>
      </UISectionCard>
    </div>
  );
}
