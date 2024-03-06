import { Stack } from '@mui/material';
import React from 'react';

import Loader from '@/src/components/Common/Loader';

function DynamicLoader() {
  return (
    <Stack
      width={'100%'}
      height={'100%'}
      justifyContent={'center'}
      alignItems={'center'}
      position={'absolute'}
      zIndex={100}
      style={{ backdropFilter: 'blur(5px)' }}
    >
      <Loader />
    </Stack>
  );
}

export default DynamicLoader;
