import ApplicationDetail from 'src/app/(authenticated)/_jobs/[application]/_common/components';

import { ApplicationsStoreProvider, JobProvider } from '@/job/contexts';

function ApplicationDetailPage() {
  return <ApplicationDetail />;
}

ApplicationDetailPage.privateProvider = (page) => (
  <JobProvider>
    <ApplicationsStoreProvider>{page}</ApplicationsStoreProvider>
  </JobProvider>
);

export default ApplicationDetailPage;
