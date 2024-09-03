import { Stack } from '@mui/material';
import { memo } from 'react';

import NoApplicants from '@/public/lottie/NoApplicants';
import { type ApplicationStore } from '@/src/context/ApplicationContext/store';

export const EmptyState = memo(({ tab }: { tab: ApplicationStore['tab'] }) => {
  return (
    <Stack width={'100%'} alignItems={'center'} justifyContent={'center'}>
      <Stack width={'100px'}>
        <NoApplicants />
      </Stack>
      <Stack>No {tab} data found</Stack>
    </Stack>
  );
});
EmptyState.displayName = 'EmptyState';
