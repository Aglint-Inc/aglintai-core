import { Stack } from '@mui/material';
import React from 'react';

import { Skeleton } from '@/devlink2/Skeleton';

function LoaderSlots() {
  return (
    <Stack
      height={'calc(100vh - 96px)'}
      p={'var(--space-4)'}
      spacing={'var(--space-4)'}
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <Stack
          key={index}
          position={'relative'}
          height={'50px'}
          width={'100%'}
          borderRadius={'10px'}
          overflow={'hidden'}
        >
          <Skeleton />
        </Stack>
      ))}
    </Stack>
  );
}

export default LoaderSlots;
