import Seo from '@components/Common/Seo';

import AssessmentDashboard from '@/src/components/NewAssessment/AssessmentDashboard';
import JobsProvider from '@/src/context/JobsContext';

const AssessmentDashboardPage = () => {
  return (
    <>
      <Seo
        title='Assessments | Aglint AI'
        description='AI for People Products'
      />
      <AssessmentDashboard />
    </>
  );
};

AssessmentDashboardPage.privateProvider = function privateProvider(page) {
  return <JobsProvider>{page}</JobsProvider>;
};

export default AssessmentDashboardPage;
