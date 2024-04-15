import React from 'react';

import Seo from '@/src/components/Common/Seo';
import CandidateInvite from '@/src/components/Scheduling/CandidateInvite';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

function CandidateSchedule() {
  const { recruiter } = useAuthDetails();

  return (
    <>
      <Seo
        title={`${recruiter.name} | Interviewer`}
        description='AI for People Products'
      />
      <CandidateInvite />
    </>
  );
}

export default CandidateSchedule;

CandidateSchedule.getLayout = (page) => {
  return <>{page}</>;
};
