import React from 'react';

import CandidateInvite from '@/src/components/Scheduling/CandidateInvite';

function CandidateSchedule() {
  return (
    <>
      <CandidateInvite />
    </>
  );
}

export default CandidateSchedule;

CandidateSchedule.getLayout = (page) => {
  return <>{page}</>;
};
