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
CandidateAssessmentPage.publicProvider = (page) => {
  return <>{page}</>;
};
