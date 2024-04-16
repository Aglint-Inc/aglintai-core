import Seo from '@components/Common/Seo';

import AssessmentDashboard from '@/src/components/NewAssessment/AssessmentDashboard';
import JobsProvider from '@/src/context/JobsContext';

const AssessmentDashboardPage = () => {
  return (
    <>
      <Seo
        title='Aglint | Jobs'
        description='AI Powered Talent Development Platform.'
      />
      <AssessmentDashboard />
    </>
  );
};

AssessmentDashboardPage.privateProvider = function privateProvider(page) {
  return <JobsProvider>{page}</JobsProvider>;
};

export default AssessmentDashboardPage;
