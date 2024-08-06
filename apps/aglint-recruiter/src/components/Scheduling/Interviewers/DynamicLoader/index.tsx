import { Stack } from '@mui/material';
import React from 'react';

import Loader from '@/src/components/Common/Loader';

function DynamicLoader({ height = '100%' }: { height?: string }) {
  return (
    <Stack
      width={'100%'}
      height={height}
      justifyContent={'center'}
      alignItems={'center'}
      position={'absolute'}
      bgcolor={'white'}
      zIndex={100}
    >
      <Loader />
    </Stack>
  );
}

export default DynamicLoader;
