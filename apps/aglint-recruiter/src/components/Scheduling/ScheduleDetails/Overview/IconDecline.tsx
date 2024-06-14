import { Stack } from '@mui/material';
import React from 'react';

function IconDecline() {
  return (
    <Stack pt={'var(--space-1)'}>
      <svg
        width='20'
        height='16'
        viewBox='0 0 20 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M0 8C0 3.58172 3.58172 0 8 0H12C16.4183 0 20 3.58172 20 8C20 12.4183 16.4183 16 12 16H8C3.58172 16 0 12.4183 0 8Z'
          fill='#F52B00'
          fill-opacity='0.0941176'
        />
        <rect
          width='12'
          height='12'
          transform='translate(4 2)'
          fill='white'
          fill-opacity='0.01'
        />
        <path
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M13.4252 5.2257C13.6049 5.04606 13.6049 4.7548 13.4252 4.57516C13.2456 4.39552 12.9543 4.39552 12.7747 4.57516L9.99994 7.3499L7.22522 4.57516C7.04557 4.39552 6.75431 4.39552 6.57467 4.57516C6.39503 4.7548 6.39503 5.04606 6.57467 5.2257L9.34941 8.00043L6.57467 10.7752C6.39503 10.9548 6.39503 11.246 6.57467 11.4257C6.75431 11.6053 7.04557 11.6053 7.22522 11.4257L9.99994 8.65097L12.7747 11.4257C12.9543 11.6053 13.2456 11.6053 13.4252 11.4257C13.6049 11.246 13.6049 10.9548 13.4252 10.7752L10.6505 8.00043L13.4252 5.2257Z'
          fill='#CD2200'
          fill-opacity='0.917647'
        />
      </svg>
    </Stack>
  );
}

export default IconDecline;
