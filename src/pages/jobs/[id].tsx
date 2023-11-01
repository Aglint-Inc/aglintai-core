import Seo from '@components/Common/Seo';
import JobApplicationProvider from '@context/NewJobApplicationsContext';

import JobApplicationsDashboard from '@/src/components/JobApplicationsDashboard';
import JobPostFormProvider from '@/src/components/JobsDashboard/JobPostCreateUpdate/JobPostFormProvider';

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
