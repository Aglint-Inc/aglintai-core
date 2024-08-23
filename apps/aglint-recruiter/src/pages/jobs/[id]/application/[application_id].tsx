import ApplicationDetail from '@/src/components/Jobs/Job/ApplicationDetail';
import { JobProvider } from '@/src/context/JobContext';

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
