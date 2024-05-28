import Lottie from 'lottie-react';
import React, { useRef } from 'react';

import { complete_lottie } from '@/public/lottie/CandidateAssessment/complete-lottie';

function CompleteLottie() {
  const lottieRef = useRef();
  return (
    <div>
      <Lottie
        lottieRef={lottieRef}
        animationData={complete_lottie}
        loop={false}
        autoplay={true}
      />
    </div>
  );
}

export default CompleteLottie;
