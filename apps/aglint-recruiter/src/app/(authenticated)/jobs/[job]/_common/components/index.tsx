import {
  PageActions,
  PageHeader,
  PageHeaderText,
  PageTitle,
} from '@components/layouts/page-header';
import { ScrollArea } from '@components/ui/scroll-area';
import { Skeleton } from '@components/ui/skeleton';

import {
  useApplicationsPrefetch,
  useApplicationsStore,
  useJob,
} from '@/job/hooks';

import { Actions } from './Actions';
import DNDProvider from './DNDProvider';
import { Filters } from './Filters';
import { JobNotFound } from './JobNotFound';
import { SharedActions } from './SharedTopNav/actions';
import { SharedBreadCrumbs } from './SharedTopNav/breadcrumbs';
import { Table } from './Table';
import Tabs from './Tabs';

export const ApplicationsDashboard = () => {
  void useApplicationsPrefetch();
  const { job, jobLoad } = useJob();
  return jobLoad ? (
    job ? (
      <ApplicationsComponent />
    ) : (
      <JobNotFound />
    )
  ) : (
    <div className='z-10 min-h-screen min-w-full'>
      <div className='h-full space-y-6 p-8'>
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
            {[1, 2, 3, 4, 5, 7, 8, 9, 10].map((i) => (
              <Skeleton key={i} className='h-12 w-full' />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const JobDetailsHeader = () => (
  <PageHeader>
    <PageHeaderText>
      <PageTitle>Job Details</PageTitle>
      <SharedBreadCrumbs />
    </PageHeaderText>
    <PageActions>
      <SharedActions />
    </PageActions>
  </PageHeader>
);

export const ApplicationsComponent = () => {
  const checklist = useApplicationsStore((state) => state.checklist);
  return (
    <DNDProvider>
      <div className='mb-2 flex flex-row gap-4 px-4'>
        <Tabs />
        {checklist.length === 0 ? <Filters /> : <Actions />}
      </div>
      <ScrollArea>
        <Table />
      </ScrollArea>
    </DNDProvider>
  );
};
