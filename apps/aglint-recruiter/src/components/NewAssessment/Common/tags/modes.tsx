import { Stack } from '@mui/material';
import { capitalize } from 'lodash';
import React from 'react';

import { type Assessment } from '@/src/queries/assessment/types';

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
