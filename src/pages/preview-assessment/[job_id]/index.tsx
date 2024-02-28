import React from 'react';

import CandidateAssessment from '@/src/components/CandidateAssessment';
import { CandidateAssessmentProvider } from '@/src/context/CandidateAssessment';

function CandidateAssessmentPage() {
  return (
    <div>
      <CandidateAssessmentProvider>
        <CandidateAssessment />
      </CandidateAssessmentProvider>
    </div>
  );
}

export default CandidateAssessmentPage;
CandidateAssessmentPage.getLayout = (page) => {
  return <>{page}</>;
};
