import {
  PageActions,
  PageHeader,
  PageHeaderText,
  PageTitle,
} from '@components/layouts/page-header';

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
  const { job } = useJob();
  return job ? <ApplicationsComponent /> : <JobNotFound />;
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
  return (
    <DNDProvider>
      <div className='mb-2 flex flex-col gap-2 px-4'>
        <Tabs />
        <Actionables />
      </div>
      <Table />
    </DNDProvider>
  );
};

const Actionables = () => {
  const checklist = useApplicationsStore((state) => state.checklist);
  return <>{checklist.length === 0 ? <Filters /> : <Actions />}</>;
};
