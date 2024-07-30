import { Stack } from '@mui/material';
import React from 'react';

import { GlobalIcon } from '@/devlink/GlobalIcon';

function CompanySettingsIcon() {
  return (
    <Stack direction={'row'}>
      <GlobalIcon iconName='settings' size={6} weight={'regular'} />
    </Stack>
  );
}

export default CompanySettingsIcon;
