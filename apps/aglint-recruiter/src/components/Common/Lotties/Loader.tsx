import { loaderLottie } from '@public/lottie/loader-loattie';
import Lottie from 'lottie-react';
import React from 'react';

function Loader() {
  return (
    <div className='relative h-[100px]'>
      <div className='absolute left-[-100px] top-[-25px] w-[200px]'>
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
