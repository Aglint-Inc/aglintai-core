import { Loader2 } from 'lucide-react';
import { memo } from 'react';

import { useSchedulingAnalytics } from '@/context/SchedulingAnalytics';

import { CompletedInterviews } from './completedInterviews';
import { DeclineRequests } from './declineRequests';
import { Filters } from './filters';
import { Interviewers } from './interviewers';
import { Interviewes } from './interviews';
import { InterviewTypes } from './interviewTypes';
import { Leaderboard } from './leaderboard';
import { Reasons } from './reasons';
import { RecentDeclines } from './recentDeclines';
import { RecentReschedules } from './recentReschedules';
import { TrainingProgress } from './trainingProgress';
const SchedulingDashboard = memo(() => {
  const { enabled } = useSchedulingAnalytics();
  if (!enabled)
    return (
      <div className='flex h-[350px] items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-gray-400' />
      </div>
    );
  return (
    <>
      <div className='flex flex-col gap-4 p-6'>
        <Filters />
        {/* <Tabs /> */}
      </div>

      <div className='grid grid-cols-1 gap-4 p-6 md:grid-cols-2'>
        <div className='flex h-full flex-col gap-4'>
          <div className='flex-1'>
            <Reasons />
          </div>
          <div className='flex-1'>
            <Leaderboard />
          </div>
        </div>
        <div className='flex h-full flex-col gap-4'>
          <div className='flex-1'>
            <DeclineRequests />
          </div>
          <div className='flex-1'>
            <InterviewTypes />
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-4 p-6 md:grid-cols-2'>
        <div className='flex h-full flex-col gap-4'>
          <div className='flex-1'>
            <TrainingProgress />
          </div>
          <div className='flex-1'>
            <Interviewes />
          </div>
        </div>
        <div className='flex h-full flex-col gap-4'>
          <div className='flex-1'>
            <CompletedInterviews />
          </div>
          <div className='flex-1'>
            <Interviewers />
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-4 p-6 md:grid-cols-2'>
        <div className='flex h-full flex-col gap-4'>
          <div className='flex-1'>
            <RecentDeclines />
          </div>
        </div>
        <div className='flex h-full flex-col gap-4'>
          <div className='flex-1'>
            <RecentReschedules />
          </div>
        </div>
      </div>
    </>
  );
});
SchedulingDashboard.displayName = 'SchedulingDashboard';

export default SchedulingDashboard;
