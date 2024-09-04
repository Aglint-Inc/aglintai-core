import React from 'react';

import AppleLoader from '../../Common/Lotties/AppleLoader';

function CandidatePortalLoader({loadingText}:{loadingText:string}) {
  return (
    <div className='absolute inset-0 flex flex-col items-center gap-4 justify-center w-full h-full bg-white '>
      <AppleLoader  width={50} height={50}/>
      <div className='text-md text-muted-foreground font-regular'>{loadingText}</div>
    </div>
  );
}

export default CandidatePortalLoader;
