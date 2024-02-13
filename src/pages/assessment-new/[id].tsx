import Seo from '@components/Common/Seo';

import AssessmentComponent from '@/src/components/NewAssessment/AssessmentPage';
import JobsProvider from '@/src/context/JobsContext';
import { AssementQueryProvider } from '@/src/queries/assessment';

const AssessmentComponentPage = () => {
  return (
    <>
      <Seo
        title='Aglint | Jobs'
        description='AI Powered Talent Development Platform.'
      />
      <AssessmentComponent />
    </>
  );
};

AssessmentComponentPage.getProvider = function getProvider(page) {
  return (
    <JobsProvider>
      <AssementQueryProvider>{page}</AssementQueryProvider>
    </JobsProvider>
  );
};

export default AssessmentComponentPage;
