import React from 'react';

import ConfigureCandidateGreetingLoader from './ConfigureCandidateGreetingLoader';
import ConfigureCoverImageSkeleton from './ConfigureCoverImageSkeleton';

function CandidatePoratlSettingsSkeleton() {
  return (
    <div className='flex flex-col gap-8 p-4 pb-32 pl-6'>
      <ConfigureCoverImageSkeleton />
      <ConfigureCandidateGreetingLoader />
      <ConfigureCandidateGreetingLoader />
      <ConfigureCandidateGreetingLoader />
    </div>
  );
}

export default CandidatePoratlSettingsSkeleton;
