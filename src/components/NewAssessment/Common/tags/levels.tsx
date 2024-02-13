import { Stack } from '@mui/material';
import { capitalize } from 'lodash';
import React from 'react';

import { Assessment } from '@/src/queries/assessment/types';

import LevelIcon from '../icons/levels';

const LevelTag: React.FC<{ level: Assessment['level'] | null }> = ({
  level,
}) => {
  return (
    <Stack direction={'row'} alignItems={'center'} gap={1}>
      <LevelIcon level={level} />
      <Stack fontWeight={600} fontSize={'12px'}>
        {capitalize(level ?? '---')}
      </Stack>
    </Stack>
  );
};

export default LevelTag;
