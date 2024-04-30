import Seo from '@components/Common/Seo';

import AssessmentComponent from '@/src/components/NewAssessment/AssessmentPage';
import JobsProvider from '@/src/context/JobsContext';

const AssessmentComponentPage = () => {
  return (
    <>
      <Seo
        title='Aglint | Jobs'
        description='AI for People Products'
      />
      <AssessmentComponent />
    </>
  );
};

AssessmentComponentPage.privateProvider = function privateProvider(page) {
  return <JobsProvider>{page}</JobsProvider>;
};

export default AssessmentComponentPage;
