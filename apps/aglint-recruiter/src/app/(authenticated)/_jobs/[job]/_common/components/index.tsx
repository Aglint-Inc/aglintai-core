import { ScrollArea } from '@components/ui/scroll-area';
import { Skeleton } from '@components/ui/skeleton';

import { useApplicationsChecklist, useJob } from '@/job/hooks';

import { Actions } from './Actions';
import DNDProvider from './DNDProvider';
import Filters from './Filters';
import { JobNotFound } from './JobNotFound';
import { SharedActions } from './SharedTopNav/actions';
import { SharedBreadCrumbs } from './SharedTopNav/breadcrumbs';
import { Table } from './Table';
import Tabs from './Tabs';

export const ApplicationsDashboard = () => {
  const { job, jobLoad } = useJob();
  return jobLoad ? (
    job ? (
      <ApplicationsComponent />
    ) : (
      <JobNotFound />
    )
  ) : (
    <div className='container mx-auto p-8 space-y-6'>
      <div className='flex justify-between items-center mb-6'>
        <div className='space-y-2'>
          <Skeleton className='h-8 w-48' />
          <Skeleton className='h-4 w-64' />
        </div>
        <Skeleton className='h-10 w-24' />
      </div>
      <div className='bg-white rounded-lg shadow p-4 space-y-4'>
        <div className='flex space-x-2'>
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className='h-8 w-24' />
          ))}
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex space-x-2'>
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className='h-8 w-24' />
            ))}
          </div>
          <Skeleton className='h-8 w-24' />
        </div>
        <div className='space-y-2'>
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className='h-12 w-full' />
          ))}
        </div>
      </div>
    </div>
  );
};

const ApplicationsComponent = () => {
  const checklist = useApplicationsChecklist();
  return (
    <DNDProvider>
      <div className='min-h-screen'>
        <div className='container mx-auto'>
          <div className='flex justify-between items-center mb-6'>
            <div>
              <h1 className='text-2xl font-bold mb-2'>Job Details</h1>
              <SharedBreadCrumbs />
            </div>
            <SharedActions />
          </div>

          <div className='flex flex-col gap-6 mb-6'>
            <div className='bg-white rounded-lg shadow p-4'>
              <div className='mb-4'>
                <Tabs />
              </div>
              <div className='my-2'>
                {checklist.length === 0 ? <Filters /> : <Actions />}
              </div>
              <div className='overflow-x-auto'>
                <ScrollArea>
                  <Table />
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DNDProvider>
  );
};
