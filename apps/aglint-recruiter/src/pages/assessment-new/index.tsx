import Seo from '@components/Common/Seo';

import AssessmentDashboard from '@/src/components/NewAssessment/AssessmentDashboard';
import { WithAssessment } from '@/src/components/withAssessment';

const AssessmentDashboardPage = () => {
  return (
    <>
      <Seo
        title='Assessments | Aglint AI'
        description='AI for People Products'
      />
      <WithAssessment>
        <AssessmentDashboard />
      </WithAssessment>
    </>
  );
};

export default AssessmentDashboardPage;
