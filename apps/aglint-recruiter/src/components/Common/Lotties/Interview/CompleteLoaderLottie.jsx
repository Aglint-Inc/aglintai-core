import Lottie from 'lottie-react';
import React, { useRef } from 'react';

import { complete_loader_lottie } from '@/public/lottie/complete-loader-lottie';

function CompleteLoaderLottie() {
  const lottieRef = useRef();
  return (
    <div>
      <Lottie
        lottieRef={lottieRef}
        animationData={complete_loader_lottie}
        loop={true}
        autoplay={true}
      />
    </div>
  );
}

export default CompleteLoaderLottie;
