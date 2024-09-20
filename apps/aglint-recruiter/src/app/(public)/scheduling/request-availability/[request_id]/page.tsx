'use client';
import React from 'react';

import Seo from '@/components/Common/Seo';

import CandidateAvailability from './_common/components/MainBody';
function RequestAvailability() {
  return (
    <>
      <Seo
        title='Candidate Request Availability | Aglint AI'
        description='AI for People Products'
      />
      <CandidateAvailability />
    </>
  );
}

export default RequestAvailability;
