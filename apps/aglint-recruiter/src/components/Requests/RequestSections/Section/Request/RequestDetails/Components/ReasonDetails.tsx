import { Stack } from '@mui/material';
import React from 'react';

import { TextWithIcon } from '@/devlink2/TextWithIcon';

function ReasonDetails() {
  return (
    <Stack direction={'row'} spacing={1} alignItems={'center'}>
      <TextWithIcon
        textContent={
          'Personal Emergency :  I won’t be available because of viral fever.'
        }
        iconSize={3}
        fontSize={1}
        color={'neutral'}
        iconName={'chat'}
      />
    </Stack>
  );
}

export default ReasonDetails;
