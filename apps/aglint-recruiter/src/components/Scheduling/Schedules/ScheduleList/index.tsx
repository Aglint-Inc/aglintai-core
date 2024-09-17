<<<<<<< HEAD
import { Loader } from '@/components/Common/Loader';
=======
import Loader from '@/components/Common/Loader';
>>>>>>> 8eb6ea7dfa37de2bebc9079affacd757345fc96f

import ScheduleMeetingList from '../../Common/ModuleSchedules/ScheduleMeetingList';
import { useScheduleStatesContext } from '../ScheduleStatesContext';

function ScheduleList() {
  const { filteredSchedules, loadingSchedules } = useScheduleStatesContext();

  return (
    <div className='p-4'>
      {loadingSchedules && (
        <div className='h-[calc(100vh-96px)] w-full'>
          <Loader />
        </div>
      )}
      {!loadingSchedules && filteredSchedules.length === 0 && (
<<<<<<< HEAD
        <div className='flex justify-center items-center min-h-[calc(100vh-128px)] bg-[var(--neutral-2)] rounded-[var(--radius-2)]'>
          <div className='max-w-sm w-[300px] p-2'>
            <div className='flex flex-col items-center justify-center p-8 text-center'>
              <svg
                className='w-12 h-12 text-gray-400 mb-2'
=======
        <div className='flex min-h-[calc(100vh-128px)] items-center justify-center rounded-[var(--radius-2)] bg-[var(--neutral-2)]'>
          <div className='w-[300px] max-w-sm p-2'>
            <div className='flex flex-col items-center justify-center p-8 text-center'>
              <svg
                className='mb-2 h-12 w-12 text-gray-400'
>>>>>>> 8eb6ea7dfa37de2bebc9079affacd757345fc96f
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
<<<<<<< HEAD
              <h3 className='text-lg font-medium text-gray-900 mb-1'>
=======
              <h3 className='mb-1 text-lg font-medium text-gray-900'>
>>>>>>> 8eb6ea7dfa37de2bebc9079affacd757345fc96f
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
