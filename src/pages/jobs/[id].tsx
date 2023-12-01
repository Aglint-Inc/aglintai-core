import Seo from '@components/Common/Seo';

import JobApplicationsDashboard from '@/src/components/JobApplicationsDashboard';
import JobPostFormProvider from '@/src/components/JobsDashboard/JobPostCreateUpdate/JobPostFormProvider';
import JobApplicationProvider from '@/src/context/JobApplicationsContext';

const JobPage = () => {
  return (
    <>
      <Seo
        title='Aglint | Jobs'
        description='AI Powered Talent Development Platform.'
      />
      <JobPostFormProvider>
        <JobApplicationsDashboard />
      </JobPostFormProvider>
    </>
  );
};

JobPage.getProvider = function getProvider(page) {
  return <JobApplicationProvider>{page}</JobApplicationProvider>;
};

export default JobPage;
