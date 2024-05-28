//this file is not used
import { Stack } from '@mui/material';
import Lottie from 'lottie-react';
import React, { useRef } from 'react';

import { jd_lottie } from '@/public/lottie/JobApplicationsDashboard/jd-loader-lottie';

function JdFetching() {
  const lottieRef = useRef();
  return (
    <Stack position={'relative'} height={'50px'} left={'0px'} width={'60px'}>
      <Stack width={'70px'} position={'absolute'} top={'-0px'} left={'-5px'}>
        <Lottie
          lottieRef={lottieRef}
          animationData={jd_lottie}
          loop={true}
          autoplay={true}
        />
      </Stack>
    </Stack>
  );
}

export default JdFetching;
