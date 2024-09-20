'use client';
import React from 'react';

import CandidateAvailability from './_common/components/MainBody';
import AvailabilityLayout from './AvailabilityLayout';
function RequestAvailability() {
  return (
    <AvailabilityLayout>
      <CandidateAvailability />
    </AvailabilityLayout>
  );
}

export default RequestAvailability;
