import Seo from '@components/Common/Seo';

import AssessmentDashboard from '@/src/components/NewAssessment';
import JobsProvider from '@/src/context/JobsContext';
import { AssementQueryProvider } from '@/src/queries/assessment';

const AssessmentPage = () => {
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

AssessmentPage.getProvider = function getProvider(page) {
  return (
    <JobsProvider>
      <AssementQueryProvider>{page}</AssementQueryProvider>
    </JobsProvider>
  );
};

export default AssessmentPage;
