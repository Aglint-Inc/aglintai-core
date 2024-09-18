import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import Link from 'next/link';

import { UIButton } from '@/components/Common/UIButton';

import { ScheduleStatesProvider } from './_common/contexts/ScheduleStatesContext';
import MyInterviews from './Components/MyInterviews';
import RecentCompletedInterviews from './Components/RecentCompletedInterviews';
import UpComingInterviews from './Components/UpComingInterviews';

function Interviews() {
  return (
    <div className='container-lg mx-auto w-full px-12'>
      <header>
        <div className='mb-8 flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-semibold'>All Interviews</h1>
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
          <MyInterviews />

          <Card>
            <CardHeader>
              <CardTitle className='text-lg font-semibold'>
                <div className='flex justify-between'>
                  <h1>Recently Completed</h1>
                  <Link href={'/scheduling/all'}>
                    <UIButton size='sm' variant='ghost'>
                      View All
                    </UIButton>
                  </Link>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RecentCompletedInterviews />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Interviews;
