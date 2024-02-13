import Seo from '@components/Common/Seo';

import AssessmentDashboard from '@/src/components/NewAssessment';
import JobsProvider from '@/src/context/JobsContext';
import { AssementQueryProvider } from '@/src/queries/assessment';

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

AssessmentDashboardPage.getProvider = function getProvider(page) {
  return (
    <JobsProvider>
      <AssementQueryProvider>{page}</AssementQueryProvider>
    </JobsProvider>
  );
};

export default AssessmentDashboardPage;
