import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@components/ui/breadcrumb';
import { Calendar } from 'lucide-react';

import { Loader } from '@/components/Common/Loader';

import { useScheduleStatesContext } from '../contexts/ScheduleStatesContext';
import { useAllInterviews } from '../hooks/useAllInterviews';
import AllInterviewFilters from './Filters/AllInterviewFilters';
import ScheduleMeetingList from './ScheduleMeetingList';

function AllInterviews() {
  const { filterState } = useScheduleStatesContext();
  const { data: schedules, isFetched } = useAllInterviews({
    ...filterState,
  });
  return (
    <div className='container-lg mx-auto w-full px-12'>
      <header>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/scheduling'>Interviews</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href='/scheduling/all'>
                All Interviews
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className='mb-8 flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-semibold'>All Interviews</h1>
            <p className='mb-4 text-gray-600'>
              View and manage all scheduled interviews for your recruitment
              process.
            </p>
          </div>
        </div>
      </header>
      <div className='w-7/12 space-y-4'>
        <>
          <AllInterviewFilters />
          {!isFetched && <Loader />}
          {isFetched && schedules?.length === 0 && (
            <div className='flex items-center justify-center rounded-md'>
              <div className='w-[300px] max-w-sm p-2'>
                <div className='flex flex-col items-center justify-center p-8 text-center'>
                  <Calendar className='mb-2 h-12 w-12 text-gray-400' />
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
          <ScheduleMeetingList filterSchedules={schedules} />
        </>
      </div>
    </div>
  );
}

export default AllInterviews;
