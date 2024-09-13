// this file is not used
import { recordLottie } from '@public/lottie/record-lottie';
import Lottie from 'lottie-react';

let stopRecording;
import { useEffect } from 'react';

function RecordLottie({ lottieRef, listening }) {
  useEffect(() => {
    if (listening) {
      lottieRef.current.goToAndPlay(0, true);
      setTimeout(() => {
        stopRecording = setInterval(() => {
          lottieRef.current.goToAndPlay(70, true);
        }, 235);
      }, 833);
    } else {
      clearInterval(stopRecording);
      lottieRef.current.goToAndPlay(146, true);
      setTimeout(() => {
        lottieRef.current.goToAndStop(0, true);
      }, 650);
    }
  }, [listening]);
  return (
    <div className='h-[21px] relative'>
      <div className='absolute left-[-18px] top-[-25px] w-[65px]'>
        <Lottie
          lottieRef={lottieRef}
          animationData={recordLottie}
          loop={true}
          autoplay={false}
        />
      </div>
    </div>
  );
}

export default RecordLottie;
