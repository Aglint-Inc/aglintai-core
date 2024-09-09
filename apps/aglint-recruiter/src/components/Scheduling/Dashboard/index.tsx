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
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <div className='col-span-1 md:col-span-2 lg:col-span-3'>
        <Reasons />
        <Leaderboard />
      </div>

      <div className='col-span-1 md:col-span-2 lg:col-span-3'>
        <DeclineRequests />
        <InterviewTypes />
      </div>

      <div className='col-span-1 md:col-span-2 lg:col-span-3 flex flex-col md:flex-row justify-between gap-4'>
        <TrainingProgress />
        <Interviewes />
      </div>

      <div className='col-span-1 md:col-span-2 lg:col-span-3 space-y-4'>
        <Filters />
        <Tabs />
      </div>

      <div className='col-span-1 md:col-span-2 lg:col-span-3'>
        <RecentDeclines />
        <RecentReschedules />
      </div>

      <div className='col-span-1 md:col-span-2 lg:col-span-3'>
        <CompletedInterviews />
        <Interviewers />
      </div>
    </div>
  );
});
SchedulingDashboard.displayName = 'SchedulingDashboard';

export default SchedulingDashboard;
