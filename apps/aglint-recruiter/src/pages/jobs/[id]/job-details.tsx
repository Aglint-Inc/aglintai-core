import Seo from '@components/Common/Seo';

import JobDetailsDashboard from '@/src/components/Jobs/Job/Job-Details';
import { JobProvider } from '@/src/context/JobContext';

const JobDetailsPage = () => {
  return (
    <>
      <Seo
        title={`Jobs Details - Job | Aglint AI`}
        description='AI for People Products'
      />
      <JobDetailsDashboard />
    </>
  );
};

JobDetailsPage.privateProvider = (page) => {
  return <JobProvider>{page}</JobProvider>;
};

export default JobDetailsPage;
