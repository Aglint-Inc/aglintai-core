import ApplicationDetail from '@/components/Jobs/Job/ApplicationDetail';
import { JobProvider } from '@/job/contexts';

function ApplicationDetailPage() {
  return (
    <>
      <ApplicationDetail />
    </>
  );
}

ApplicationDetailPage.privateProvider = (page) => (
  <JobProvider>{page}</JobProvider>
);

export default ApplicationDetailPage;
