'use client';
import React from 'react';

import Seo from '@/src/components/Common/Seo';
import CandidateAvailability from '@/src/components/Scheduling/CandidateDetails/SchedulingDrawer/BodyDrawer/RequestAvailability/CandidateAvailability';
import { RequestAvailabilityProvider } from '@/src/components/Scheduling/CandidateDetails/SchedulingDrawer/BodyDrawer/RequestAvailability/RequestAvailabilityContext';

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
