import { Skeleton } from '@components/ui/skeleton';
import { Stack } from '@mui/material';
import { BarChart2 } from 'lucide-react';
import { useRouter } from 'next/router';

import { useInterviewTrainingStatus } from '@/queries/scheduling-dashboard';
import ROUTES from '@/utils/routing/routes';

import { InterviewModuleStats } from '../Common/InterviewType/InterviewModulesStats.';
import { InterviewStatsLoader } from './interviewers';

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
      (_, i) => (
        <InterviewStatsLoader
          key={i}
          slotSkeleton={<Skeleton className='w-full h-full' />}
        />
      ),
    );

  if (!(!!data && !!Array.isArray(data) && data.length !== 0))
    return (
      <div className='h-[296px]'>
        <div className='flex flex-col items-center justify-center h-full'>
          <BarChart2 className='w-12 h-12 text-gray-400' />
          <p className='mt-2 text-sm text-gray-500'>No data available</p>
        </div>
      </div>
    );

  const rows = data
    .slice(0, LIMIT)
    .map(({ id, name, training_status_count: { qualified, training } }) => (
      <Stack
        key={id}
        onClick={() =>
          router.push(
            `${ROUTES['/scheduling/interview-types/[type_id]']({ type_id: id })}`,
          )
        }
        sx={{
          cursor: 'pointer',
          ': hover': {
            backgroundColor: 'var(--neutral-3)',
          },
        }}
        // scheduling/module/members/0f337bba-fd0b-41ed-b356-408d9c4a8b5c
      >
        <div className='grid grid-cols-[60%_20%_20%] border-b border-[#eaf1f3] bg-white hover:bg-neutral-100 cursor-pointer transition-colors duration-200'>
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
      </Stack>
    ));
  return <>{rows}</>;
};
