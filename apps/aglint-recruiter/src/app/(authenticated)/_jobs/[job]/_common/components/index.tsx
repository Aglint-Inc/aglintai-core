import { ScrollArea } from '@components/ui/scroll-area';

import Loader from '@/components/Common/Loader';
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
    <div className='w-full h-screen flex items-center justify-center'>
      <Loader />
    </div>
  );
};

const ApplicationsComponent = () => {
  const checklist = useApplicationsChecklist();
  return (
    <DNDProvider>
      <div className='min-h-screen bg-gray-100'>
        <div className='container mx-auto p-6'>
          <div className='flex justify-between items-center mb-6'>
            <div>
              <h1 className='text-3xl font-bold mb-2'>Job Details</h1>
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
