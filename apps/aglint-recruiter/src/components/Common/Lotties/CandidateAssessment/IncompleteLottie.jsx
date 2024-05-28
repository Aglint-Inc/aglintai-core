import Lottie from 'lottie-react';
import React, { useRef } from 'react';

import { incomplete_lottie } from '@/public/lottie/CandidateAssessment/incomplete-lottie';

function InCompleteLottie() {
  const lottieRef = useRef();
  return (
    <div>
      <Lottie
        lottieRef={lottieRef}
        animationData={incomplete_lottie}
        loop={false}
        autoplay={true}
      />
    </div>
  );
}

export default InCompleteLottie;
