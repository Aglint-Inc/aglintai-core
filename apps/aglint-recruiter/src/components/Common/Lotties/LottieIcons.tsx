import allLottie from '@public/lottie/allLottie';
import Lottie from 'lottie-react';

const LottieAnimations = ({
  animation,
  loop = true,
  autoplay = true,
  size,
}: {
  animation: keyof typeof allLottie;
  loop?: boolean;
  autoplay?: boolean;
  size?: number;
}) => {
  return (
    <Lottie
      // eslint-disable-next-line security/detect-object-injection
      animationData={allLottie[animation]}
      loop={loop}
      autoplay={autoplay}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: `scale(${size || 1})`,
      }}
    />
  );
};
export default LottieAnimations;
