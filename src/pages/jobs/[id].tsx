import Seo from '@components/Common/Seo';
import JobApplicationProvider from '@context/JobApplicationsContext';

import JobApplicationsDashboard from '@/src/components/JobApplicationsDashboard';

const JobPage = () => {
  return (
    <>
      <Seo
        title='Aglint | Jobs'
        description='AI Powered Talent Development Platform.'
      />
      <JobApplicationsDashboard />
    </>
  );
};

JobPage.getProvider = function getProvider(page) {
  return <JobApplicationProvider>{page}</JobApplicationProvider>;
};

export default JobPage;
