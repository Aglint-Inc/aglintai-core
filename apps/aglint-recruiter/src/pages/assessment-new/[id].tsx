import Seo from '@components/Common/Seo';

import AssessmentComponent from '@/src/components/NewAssessment/AssessmentPage';

const AssessmentComponentPage = () => {
  return (
    <>
      <Seo
        title='Assessment | Aglint AI'
        description='AI for People Products'
      />
      <AssessmentComponent />
    </>
  );
};

export default AssessmentComponentPage;
