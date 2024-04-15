import React from 'react';

import CandDbProvider from '@/src/components/CandidateDatabase/Database/CandDbProvider';
import CandDatabase from '@/src/components/CandidateDatabase/Database/Database';
import Seo from '@/src/components/Common/Seo';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

const Candidates = () => {
  const { recruiter } = useAuthDetails();
  return (
    <>
      <Seo
        title={`${recruiter.name} | Candidate Search`}
        description='AI for People Products'
      />
      <CandDbProvider>
        <CandDatabase />
      </CandDbProvider>
    </>
  );
};

export default Candidates;
