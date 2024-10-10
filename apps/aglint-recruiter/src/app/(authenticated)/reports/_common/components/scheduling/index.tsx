import React from 'react';
import InterviewType from './interviewType';
import Reasons from './reasons';
import RecentDeclines from './recentDeclines';
import RecentReschedules from './recentReschedules';
import TrainingProgress from './TrainingProgress';

function SchedulingReports() {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-row gap-2'>
        <div className='w-[30%]'>
          <Reasons />
        </div>
        <div className='w-[70%]'>
          <InterviewType />
        </div>
      </div>
      <TrainingProgress />
      <div className='flex flex-row gap-2'>
        <div className='w-[30%]'>
          <RecentDeclines />
        </div>
        <div className='w-[70%]'>
          <RecentReschedules />
        </div>
      </div>
    </div>
  );
}

export default SchedulingReports;
