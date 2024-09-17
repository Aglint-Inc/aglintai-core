//this file is not used
import Lottie from 'lottie-react';
import React, { useRef } from 'react';

import { jd_lottie } from '@/public/lottie/jd-loader-lottie';

function JdFetching() {
  const lottieRef = useRef();
  return (
    <div className='relative left-0 h-[50px] w-[60px]'>
      <div className='absolute left-[-5px] top-0 w-[70px]'>
        <Lottie
          lottieRef={lottieRef}
          animationData={jd_lottie}
          loop={true}
          autoplay={true}
        />
      </div>
    </div>
  );
}

export default JdFetching;
