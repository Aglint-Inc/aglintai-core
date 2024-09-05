import React from 'react';

import ConfigureCandidateGreetingLoader from './ConfigureCandidateGreetingLoader';
import ConfigureCoverImageSkeleton from './ConfigureCoverImageSkeleton';

function CandidatePoratlSettingsSkeleton() {
  return (
    <div className='p-4 pl-6 flex flex-col gap-8 pb-32'>
      <ConfigureCoverImageSkeleton />
      <ConfigureCandidateGreetingLoader/>
      <ConfigureCandidateGreetingLoader/>
      <ConfigureCandidateGreetingLoader/>
    </div>
  );
}

export default CandidatePoratlSettingsSkeleton;
