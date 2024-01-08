import React from 'react';

// import CandDbProvider from '@/src/components/CandidateDatabase/Database/CandDbProvider';
// import CandDatabase from '@/src/components/CandidateDatabase/Database/Database';
import Seo from '@/src/components/Common/Seo';

const candidates = () => {
  return (
    <>
      <Seo
        title='Aglint | Candidate Search'
        description='Find Your Ideal Candidate with AI-Powered Matching!'
      />
      {/* <CandDbProvider>
        <CandDatabase />
      </CandDbProvider> */}
    </>
  );
};

export default candidates;
