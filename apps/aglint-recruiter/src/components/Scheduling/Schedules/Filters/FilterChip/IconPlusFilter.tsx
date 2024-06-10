import { Stack } from '@mui/material';
import React from 'react';

function IconPlusFilter() {
  return (
    <Stack>
      <svg
        width='16'
        height='16'
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect width='16' height='16' fill='white' fill-opacity='0.01' />
        <path
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M8.53324 2.93324C8.53324 2.63869 8.29445 2.3999 7.9999 2.3999C7.70535 2.3999 7.46657 2.63869 7.46657 2.93324V7.46657H2.93324C2.63869 7.46657 2.3999 7.70535 2.3999 7.9999C2.3999 8.29445 2.63869 8.53324 2.93324 8.53324H7.46657V13.0666C7.46657 13.3611 7.70535 13.5999 7.9999 13.5999C8.29445 13.5999 8.53324 13.3611 8.53324 13.0666V8.53324H13.0666C13.3611 8.53324 13.5999 8.29445 13.5999 7.9999C13.5999 7.70535 13.3611 7.46657 13.0666 7.46657H8.53324V2.93324Z'
          fill='var(--accent-12)'
        />
      </svg>
    </Stack>
  );
}

export default IconPlusFilter;
