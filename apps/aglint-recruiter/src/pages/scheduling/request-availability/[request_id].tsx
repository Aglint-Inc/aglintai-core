import React from 'react';

import CandidateAvailability from '@/src/components/Scheduling/CandidateDetails/RequestAvailability/CandidateAvailability';
import { RequestAvailabilityProvider } from '@/src/components/Scheduling/CandidateDetails/RequestAvailability/RequestAvailabilityContext';

function RequestAvailability() {
  return <CandidateAvailability />;
}

export default RequestAvailability;

RequestAvailability.publicProvider = (page) => {
  return <RequestAvailabilityProvider>{page}</RequestAvailabilityProvider>;
};
