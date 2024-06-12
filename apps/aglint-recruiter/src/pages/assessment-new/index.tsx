import Seo from '@components/Common/Seo';

import AssessmentDashboard from '@/src/components/NewAssessment/AssessmentDashboard';

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

export default AssessmentDashboardPage;
