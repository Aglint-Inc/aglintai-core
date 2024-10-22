import React from 'react';

import { Loader } from '@/components/Common/Loader';

function CandidatePortalLoader({ loadingText }: { loadingText: string }) {
  return (
    <div className='fixed inset-0 z-50 flex h-full w-full flex-col items-center justify-center gap-4 bg-muted'>
      <Loader className='h-10 w-10' />
      <div className='text-md font-regular text-muted-foreground'>
        {loadingText}
      </div>
    </div>
  );
}

export default CandidatePortalLoader;
