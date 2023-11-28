import React from 'react';

import CandDbProvider from '@/src/components/CandidateDatabase/Database/CandDbProvider';
import CandDatabase from '@/src/components/CandidateDatabase/Database/Database';

const candidates = () => {
  return (
    <>
      <CandDbProvider>
        <CandDatabase />
      </CandDbProvider>
    </>
  );
};

export default candidates;
