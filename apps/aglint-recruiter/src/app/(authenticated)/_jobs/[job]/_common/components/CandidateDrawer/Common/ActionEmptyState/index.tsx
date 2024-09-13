import { Stack } from '@mui/material';
import { memo } from 'react';

import { UIAlert } from '@/components/Common/UIAlert';

export const ActionEmptyState = memo(() => {
  return (
    <Stack width={'800px'} alignItems={'center'} justifyContent={'center'}>
      <UIAlert
        title='To see the interview plan for this candidate, move the candidate to the interview state.'
        color={'purple'}
        iconName='Lightbulb'
        type='inline'
      />
    </Stack>
  );
});
ActionEmptyState.displayName = 'ActionEmptyState';
