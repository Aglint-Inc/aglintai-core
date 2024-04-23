// import { Stack } from '@mui/material';
import Lottie from 'lottie-react';

import allLottie from './allLottie';

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
    // <Stack height={'100%'} alignItems={'center'}>
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
    //   </Stack>
  );
};
export default LottieAnimations;
