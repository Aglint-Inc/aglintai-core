import { Stack } from '@mui/material';
import Lottie from 'lottie-react';
import React from 'react';

import { loaderLottie } from './loader-loattie';
function Loader() {
  return (
    <Stack height={100} position={'relative'}>
      <Stack left={-100} top={-25} position={'absolute'} width={200}>
        <Lottie
          //   lottieRef={lottieRef}
          animationData={loaderLottie}
          loop={true}
          autoplay={true}
        />
      </Stack>
    </Stack>
  );
}

export default Loader;
