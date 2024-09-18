import { Loader } from '@/components/Common/Loader';

import ScheduleMeetingList from '../../Common/ModuleSchedules/ScheduleMeetingList';
import { useScheduleStatesContext } from '../ScheduleStatesContext';

function ScheduleList() {
  const { filteredSchedules, loadingSchedules } = useScheduleStatesContext();

  return (
    <div>
      {loadingSchedules && (
        <div className='h-[calc(100vh-96px)] w-full'>
          <Loader />
        </div>
      )}
      {!loadingSchedules && filteredSchedules.length === 0 && (
        <div className='flex min-h-[calc(100vh-128px)] items-center justify-center rounded-md bg-neutral-100'>
          <div className='w-[300px] max-w-sm p-2'>
            <div className='flex flex-col items-center justify-center p-8 text-center'>
              <svg
                className='mb-2 h-12 w-12 text-gray-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                />
              </svg>
              <h3 className='mb-1 text-lg font-medium text-gray-900'>
                No schedule found
              </h3>
              <p className='text-sm text-gray-500'>
                There are no schedules available at the moment.
              </p>
            </div>
          </div>
        </div>
      )}
      <ScheduleMeetingList filterSchedules={filteredSchedules} />
    </div>
  );
}

export default ScheduleList;
