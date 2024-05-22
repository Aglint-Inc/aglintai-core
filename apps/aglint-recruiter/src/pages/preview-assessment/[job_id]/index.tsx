import React from 'react';

import CandidateAssessment from '@/src/components/CandidateAssessment';
import Seo from '@/src/components/Common/Seo';
import { CandidateAssessmentProvider } from '@/src/context/CandidateAssessment';

function CandidateAssessmentPage() {
  return (
    <>
      <Seo
        title='Preview Assessment | Aglint AI'
        description='AI for People Products'
      />
      <div>
        <CandidateAssessmentProvider>
          <CandidateAssessment />
        </CandidateAssessmentProvider>
      </div>
    </>
  );
}

export default CandidateAssessmentPage;
CandidateAssessmentPage.publicProvider = (page) => {
  return <>{page}</>;
};
