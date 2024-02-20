import { Stack } from '@mui/material';
import { capitalize } from 'lodash';
import React from 'react';

import { Assessment } from '@/src/queries/assessment';

import AssessmentModeIcon from '../icons/modes';

const ModeTags: React.FC<{ type: Assessment['mode'] }> = ({ type }) => {
  return (
    <Stack direction={'row'} alignItems={'center'} gap={1}>
      <AssessmentModeIcon type={type} />
      <Stack fontWeight={600} fontSize={'12px'}>
        {capitalize(type)}
      </Stack>
    </Stack>
  );
};

export default ModeTags;
