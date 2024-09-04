import ApplicationDetail from '@/components/Jobs/Job/ApplicationDetail';
import { JobProvider } from '@/context/JobContext';

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
