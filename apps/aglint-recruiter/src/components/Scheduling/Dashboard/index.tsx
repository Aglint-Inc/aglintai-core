import { memo } from 'react';

import { useSchedulingAnalytics } from '@/context/SchedulingAnalytics';

import Loader from '../../Common/Loader';
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
import { Tabs } from './tabs';
import { TrainingProgress } from './trainingProgress';

const SchedulingDashboard = memo(() => {
  const { enabled } = useSchedulingAnalytics();
  if (!enabled) return <Loader />;
  return (
    <>
      <div className='flex flex-col gap-4 p-6'>
        <Filters />
        <Tabs />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-6'>
        <div className='flex flex-col gap-4'>
          <Reasons />
          <Leaderboard />
        </div>

        <div className='flex flex-col gap-4'>
          <DeclineRequests />
          <InterviewTypes />
        </div>

        <div className='flex flex-col gap-4'>
          <TrainingProgress />
          <Interviewes />
        </div>
      </div>
    </>
  );
});
SchedulingDashboard.displayName = 'SchedulingDashboard';

export default SchedulingDashboard;
