import { Stack } from '@mui/material';
import Lottie from 'lottie-react';

import allLottie from './allLottie';

const LottieAnimations = ({
  animation,
  loop = true,
  autoplay = true,
}: {
  animation: keyof typeof allLottie;
  loop?: boolean;
  autoplay?: boolean;
}) => {
  return (
    <Stack height={'100%'} alignItems={'center'}>
      <Lottie
        // eslint-disable-next-line security/detect-object-injection
        animationData={allLottie[animation]}
        loop={loop}
        autoplay={autoplay}
        style={{ justifyContent: 'center' }}
      />
    </Stack>
  );
};
export default LottieAnimations;
