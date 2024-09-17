import { loaderLottie } from '@public/lottie/loader-loattie';
import Lottie from 'lottie-react';
import React from 'react';

function Loader() {
  return (
    <div className='relative h-[70px]'>
      <div className='absolute left-[-85px] top-[-54px] w-[170px]'>
        <Lottie
          //   lottieRef={lottieRef}
          animationData={loaderLottie}
          loop={true}
          autoplay={true}
        />
      </div>
    </div>
  );
}

export default Loader;
