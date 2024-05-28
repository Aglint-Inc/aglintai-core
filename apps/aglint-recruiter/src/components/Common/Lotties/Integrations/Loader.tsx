import { Stack } from '@mui/material';
import Lottie from 'lottie-react';
import React from 'react';

import { loaderLottie } from '@/public/lottie/Integrations/loader-loattie';

function Loader() {
  return (
    <Stack height={70} position={'relative'}>
      <Stack left={-85} top={-54} position={'absolute'} width={170}>
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
