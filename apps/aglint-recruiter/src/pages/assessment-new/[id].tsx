import Seo from '@components/Common/Seo';

import AssessmentComponent from '@/src/components/NewAssessment/AssessmentPage';
import { WithAssessment } from '@/src/components/withAssessment';

const AssessmentComponentPage = () => {
  return (
    <>
      <Seo
        title='Assessment | Aglint AI'
        description='AI for People Products'
      />
      <WithAssessment>
        <AssessmentComponent />
      </WithAssessment>
    </>
  );
};

export default AssessmentComponentPage;
