import { Stack } from '@mui/material';
import { memo } from 'react';

import { GlobalBannerInline } from '@/devlink2/GlobalBannerInline';

export const ActionEmptyState = memo(() => {
  return (
    <Stack width={'800px'} alignItems={'center'} justifyContent={'center'}>
      <GlobalBannerInline
        textContent='To see the interview plan for this candidate, move the candidate to the interview state.'
        slotButton={<></>}
        color={'purple'}
        iconName='lightbulb'
      />
    </Stack>
  );
});
ActionEmptyState.displayName = 'ActionEmptyState';
