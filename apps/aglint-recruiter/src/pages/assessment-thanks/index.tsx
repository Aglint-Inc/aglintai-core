import React from 'react';

import { AssessmentSuccessfull } from '@/devlink2/AssessmentSuccessfull';
import Seo from '@/src/components/Common/Seo';

function AssessmentThanksPage() {
  return (
    <div>
      <Seo title='Assessment | Aglint AI' />
      <AssessmentSuccessfull />
    </div>
  );
}

export default AssessmentThanksPage;

AssessmentThanksPage.publicProvider = (page) => {
  return <>{page}</>;
};
