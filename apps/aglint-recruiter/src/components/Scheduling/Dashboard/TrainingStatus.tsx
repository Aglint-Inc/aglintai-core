import { Skeleton } from '@components/ui/skeleton';
import { BarChart2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useInterviewTrainingStatus } from '@/queries/scheduling-dashboard';
import ROUTES from '@/utils/routing/routes';

import { InterviewModuleStats } from '../Common/InterviewType/InterviewModulesStats.';

const LIMIT = 6;

const TrainingStatus = () => {
  const { push } = useRouter();
  const { data } = useInterviewTrainingStatus();
  return (
    <>
      <InterviewModuleStats
        onClickViewAllModules={{
          onClick: () => push(`${ROUTES['/scheduling']()}?tab=interviewtypes`),
        }}
        isViewAllVisible={!!data && data.length !== 0}
        slotInterviewModuleStatsCard={<TrainingStatusComponent />}
      />
    </>
  );
};

export default TrainingStatus;

const TrainingStatusComponent = () => {
  const { data, status } = useInterviewTrainingStatus();

  const router = useRouter();

  if (status === 'pending')
    return [...new Array(Math.trunc(Math.random() * (LIMIT - 1)) + 1)].map(
      (_, i) => <Skeleton key={i} className='h-full w-full' />,
    );

  if (!(!!data && !!Array.isArray(data) && data.length !== 0))
    return (
      <div className='h-[296px]'>
        <div className='flex h-full flex-col items-center justify-center'>
          <BarChart2 className='h-12 w-12 text-gray-400' />
          <p className='mt-2 text-sm text-gray-500'>No data available</p>
        </div>
      </div>
    );

  const rows = data
    .slice(0, LIMIT)
    .map(({ id, name, training_status_count: { qualified, training } }) => (
      <div
        key={id}
        onClick={() =>
          router.push(`${ROUTES['/interview-pool/[pool]']({ type_id: id })}`)
        }
        className='cursor-pointer hover:bg-neutral-100'
      >
        <div className='grid cursor-pointer grid-cols-[60%_20%_20%] border-b border-[#eaf1f3] bg-white transition-colors duration-200 hover:bg-neutral-100'>
          <div className='p-2 px-4'>
            <span>{name}</span>
          </div>
          <div className='p-2 px-4'>
            <span>{qualified}</span>
          </div>
          <div className='p-2 px-4'>
            <span>{training}</span>
          </div>
        </div>
      </div>
    ));
  return <>{rows}</>;
};
