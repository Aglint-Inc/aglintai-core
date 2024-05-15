import { Stack } from '@mui/material';
import Lottie from 'lottie-react';
import { useEffect } from 'react';

import { playStopLottie } from './play-stop-lottie';
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
  }, [speaking]);
  return (
    <Stack height={21} position={'relative'}>
      <Stack left={-5} top={-8} position={'absolute'} width={35}>
        <Lottie
          lottieRef={lottieRef}
          animationData={playStopLottie}
          loop={true}
          autoplay={false}
        />
      </Stack>
    </Stack>
  );
}

export default PlayStop;
