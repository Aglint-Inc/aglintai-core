import React from 'react';

import CandidateAssessment from '@/src/components/CandidateAssessment';
import Seo from '@/src/components/Common/Seo';
import { CandidateAssessmentProvider } from '@/src/context/CandidateAssessment';

function CandidateAssessmentPage() {
  return (
    <div>
      <Seo title='Candidate Assessment | Aglint AI' />
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
