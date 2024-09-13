import { playStopLottie } from '@public/lottie/play-stop-lottie';
import Lottie from 'lottie-react';
import { useEffect } from 'react';

function PlayStop({ lottieRef, speaking }) {
  useEffect(() => {
    if (speaking) {
      lottieRef.current.goToAndPlay(0, true);
      setTimeout(() => {
        lottieRef.current.goToAndStop(35, true);
      }, 1000);
    } else {
      lottieRef.current.goToAndPlay(35, true);
      setTimeout(() => {
        lottieRef.current.goToAndStop(0, true);
      }, 1000);
    }
  }, [speaking, lottieRef]);

  return (
    <div className='h-[21px] relative'>
      <div className='absolute left-[-5px] top-[-8px] w-[35px]'>
        <Lottie
          lottieRef={lottieRef}
          animationData={playStopLottie}
          loop={true}
          autoplay={false}
        />
      </div>
    </div>
  );
}

export default PlayStop;
