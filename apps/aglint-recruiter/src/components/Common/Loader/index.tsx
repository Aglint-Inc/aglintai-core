import { Stack } from '@mui/material';
import React from 'react';

import { LoaderSvg } from '@/devlink';

const Loader = () => {
  return (
    <Stack
      height={'100%'}
      width={'100%'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <LoaderSvg />
    </Stack>
  );
};

export default Loader;
