import { ScheduleStatesProvider } from '@interviews/contexts/ScheduleStatesContext';

import MyInterviews from './MyInterviews';
import RecentCompletedInterviews from './RecentCompletedInterviews';
import UpComingInterviews from './UpComingInterviews';

function Interviews() {
  return (
    <div className='container-lg mx-auto w-full px-12'>
      <header>
        <div className='mb-4 flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-semibold'>Interviews</h1>
            <p className='mb-4 text-gray-600'>
              Connect your favorite tools to streamline your recruitment
              process.
            </p>
          </div>
        </div>
      </header>
      <div className='flex w-full flex-row'>
        {/* Left Column: All Upcoming Interviews */}
        <div className='w-7/12 space-y-4 pr-6'>
          <h2 className='text-lg font-semibold'>Upcoming Interviews</h2>
          <ScheduleStatesProvider>
            <UpComingInterviews />
          </ScheduleStatesProvider>
        </div>

        {/* Right Column: My Interviews and Recently Completed Interviews */}
        <div className='flex w-5/12 flex-col'>
          <div className='p-12'></div>
          <MyInterviews />
          <RecentCompletedInterviews />
        </div>
      </div>
    </div>
  );
}

export default Interviews;
