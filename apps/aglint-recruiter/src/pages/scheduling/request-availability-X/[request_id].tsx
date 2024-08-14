import React from 'react';

import Seo from '@/src/components/Common/Seo';
import CandidateAvailability from '@/src/components/Scheduling/CandidateDetails/RequestAvailability/CandidateAvailability';
import { RequestAvailabilityProvider } from '@/src/components/Scheduling/CandidateDetails/RequestAvailability/RequestAvailabilityContext';

function RequestAvailability() {
  return (
    <>
      <Seo
        title='Request Availability | Aglint AI'
        description='AI for People Products'
      />
      <CandidateAvailability />;
    </>
  );
}

export default RequestAvailability;

RequestAvailability.publicProvider = (page) => {
  return <RequestAvailabilityProvider>{page}</RequestAvailabilityProvider>;
};
