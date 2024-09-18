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
    <div className='min-h-screen'>
      <div className='container mx-auto space-y-6 p-8'>
        <div className='mb-6 flex items-center justify-between'>
          <div className='space-y-2'>
            <Skeleton className='h-8 w-48' />
            <Skeleton className='h-4 w-64' />
          </div>
          <Skeleton className='h-10 w-24' />
        </div>
        <div className='space-y-4 rounded-lg bg-white p-4 shadow'>
          <div className='flex space-x-2'>
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className='h-8 w-24' />
            ))}
          </div>
          <div className='flex items-center justify-between'>
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
    </div>
  );
};

const ApplicationsComponent = () => {
  const checklist = useApplicationsChecklist();
  return (
    <DNDProvider>
      <div className='container-lg mx-auto w-full px-12'>
        <div className='mb-6 flex items-center justify-between'>
          <div>
            <h1 className='mb-2 text-2xl font-bold'>Job Details </h1>
            <SharedBreadCrumbs />
          </div>
          <SharedActions />
        </div>

        <div className='mb-6 flex flex-col gap-6'>
          <div className='rounded-lg bg-white p-4 shadow'>
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
    </DNDProvider>
  );
};
