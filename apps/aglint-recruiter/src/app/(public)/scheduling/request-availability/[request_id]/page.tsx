'use client';
import React from 'react';

import Seo from '@/components/Common/Seo';
import CandidateAvailability from '@/components/Scheduling/RequestAvailability/CandidateAvailability';
import { RequestAvailabilityProvider } from '@/components/Scheduling/RequestAvailability/RequestAvailabilityContext';

function RequestAvailability() {
  return (
    <>
      <RequestAvailabilityProvider>
        <Seo
          title='Request Availability | Aglint AI'
          description='AI for People Products'
        />
        <CandidateAvailability />;
      </RequestAvailabilityProvider>
    </>
  );
}

export default RequestAvailability;
