import { Stack } from '@mui/material';

import { Skeleton } from '@/devlink2/Skeleton';

function SkeletonMessage() {
  return (
    <Stack direction={'row'} spacing={'var(--space-2)'} position={'relative'}>
      <Stack width={'24px'} height={'24px'} position={'relative'}>
        <Skeleton />
      </Stack>

      <Stack spacing={'var(--space-1)'} width={'100%'} position={'relative'}>
        <Stack
          direction={'row'}
          spacing={'var(--space-2)'}
          position={'relative'}
        >
          <Stack width={'70px'} height={'16px'} position={'relative'}>
            <Skeleton />
          </Stack>
          <Stack width={'50px'} height={'16px'} position={'relative'}>
            <Skeleton />
          </Stack>
        </Stack>
        <Stack width={'200px'} height={'16px'} position={'relative'}>
          <Skeleton />
        </Stack>
      </Stack>
    </Stack>
  );
}

export default SkeletonMessage;
