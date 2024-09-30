import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@components/ui/breadcrumb';
import { Calendar } from 'lucide-react';

import GlobalEmpty from '@/components/Common/GlobalEmpty';
import { Loader } from '@/components/Common/Loader';

import { useScheduleStatesContext } from '../contexts/ScheduleStatesContext';
import { useAllInterviews } from '../hooks/useAllInterviews';
import AllInterviewFilters from './Filters/AllInterviewFilters';
import ScheduleMeetingList from './ui/ScheduleMeetingList';

function AllInterviews() {
  const { filterState } = useScheduleStatesContext();
  const { data: schedules, isFetched } = useAllInterviews({
    ...filterState,
  });
  return (
    <div className='container-lg mx-auto w-full px-4'>
      <header>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/scheduling'>Interviews</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href='/interviews/all'>
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
            <GlobalEmpty
              icon={
                <Calendar
                  className='h-6 w-6 text-muted-foreground'
                  strokeWidth={2}
                />
              }
              header='No interviews found'
              description='There are no interviews matching your filters.'
            />
          )}
          <ScheduleMeetingList filterSchedules={schedules ?? []} />
        </>
      </div>
    </div>
  );
}

export default AllInterviews;
