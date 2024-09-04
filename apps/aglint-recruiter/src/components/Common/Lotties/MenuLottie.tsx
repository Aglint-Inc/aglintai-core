import { menuLottieValue } from '@public/lottie/menuLottieValue';
import Lottie from 'lottie-react';
import { useEffect } from 'react';

function MenuLottie({ lottieRef, isStop }) {
  useEffect(() => {
    if (isStop) {
      lottieRef.current.goToAndPlay(0, true);
      setTimeout(() => {
        lottieRef.current.goToAndStop(40, true);
      }, 650);
    } else {
      lottieRef.current.goToAndPlay(40, true);
      setTimeout(() => {
        lottieRef.current.goToAndStop(0, true);
      }, 650);
    }
  }, [isStop]);
  return (
    <>
      <Lottie
        lottieRef={lottieRef}
        animationData={menuLottieValue}
        loop={true}
        autoplay={isStop}
      />
    </>
  );
}

export default MenuLottie;
