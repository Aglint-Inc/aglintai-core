import React from 'react';

import AppleLoader from '../../../../../../../components/Common/Lotties/AppleLoader';

function CandidatePortalLoader({ loadingText }: { loadingText: string }) {
  return (
    <div className='absolute inset-0 z-50 flex h-full w-full flex-col items-center justify-center gap-4 bg-white'>
      <AppleLoader width={50} height={50} />
      <div className='text-md font-regular text-muted-foreground'>
        {loadingText}
      </div>
    </div>
  );
}

export default CandidatePortalLoader;
