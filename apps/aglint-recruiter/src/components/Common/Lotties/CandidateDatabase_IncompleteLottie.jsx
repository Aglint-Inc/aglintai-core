import { incomplete_lottie } from '@public/lottie/CandidateDatabase_incomplete-lottie';
import Lottie from 'lottie-react';
import React, { useRef } from 'react';

function InCompleteLottie() {
  const lottieRef = useRef();
  return (
    <div>
      <Lottie
        lottieRef={lottieRef}
        animationData={incomplete_lottie}
        loop={true}
        autoplay={true}
      />
    </div>
  );
}

export default InCompleteLottie;
