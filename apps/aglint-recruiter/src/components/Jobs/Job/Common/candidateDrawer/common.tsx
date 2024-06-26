import { Stack } from '@mui/material';
import { memo, PropsWithChildren } from 'react';

import NoApplicants from '@/public/lottie/NoApplicants';
import { ApplicationStore } from '@/src/context/ApplicationContext/store';

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

export const Loader = memo(
  ({ children, count }: PropsWithChildren<{ count: number }>) => {
    return (
      <>
        {[...Array(Math.trunc(Math.random() * (count - 1)) + 1)].map(
          () => children,
        )}
      </>
    );
  },
);
Loader.displayName = 'Loader';
