import {
  PageActions,
  PageHeader,
  PageHeaderText,
  PageTitle,
} from '@components/layouts/page-header';
import { ScrollArea } from '@components/ui/scroll-area';

import { Loader } from '@/common/Loader';
import { useApplicationsStore, useJob } from '@/job/hooks';

import { Actions } from './Actions';
import DNDProvider from './DNDProvider';
import { Filters } from './Filters';
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
    <Loader />
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
        {checklist.length === 0 ? (
          <>
            <Tabs />
            <Filters />
          </>
        ) : (
          <Actions />
        )}
      </div>
      <ScrollArea>
        <Table />
      </ScrollArea>
    </DNDProvider>
  );
};
