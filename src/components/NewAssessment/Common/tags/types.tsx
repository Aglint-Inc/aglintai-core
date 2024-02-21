import { Stack } from '@mui/material';
import { capitalize } from 'lodash';
import React from 'react';

import { type Assessment } from '@/src/queries/assessment/types';

import AssessmentTypeIcon from '../icons/types';

const TypeTags: React.FC<{ type: Assessment['type'] }> = ({ type }) => {
  return (
    <Stack direction={'row'} alignItems={'center'} gap={1}>
      <AssessmentTypeIcon type={type} />
      <Stack fontWeight={600} fontSize={'12px'}>
        {capitalize(type)}
      </Stack>
    </Stack>
  );
};

export default TypeTags;
