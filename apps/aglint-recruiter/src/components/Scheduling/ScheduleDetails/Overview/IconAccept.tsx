import { Stack } from '@mui/material';
import React from 'react';

function IconAccept() {
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
          fill='#00AE48'
          fill-opacity='0.0980392'
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
          d='M13.1734 4.98196C13.4045 5.13308 13.4694 5.44295 13.3183 5.67407L9.91829 10.8741C9.83817 10.9966 9.70835 11.0778 9.56312 11.0964C9.41788 11.115 9.27181 11.0689 9.16347 10.9704L6.96347 8.97041C6.75914 8.78466 6.74409 8.46844 6.92984 8.26411C7.11559 8.05978 7.43181 8.04472 7.63614 8.23048L9.40224 9.83601L12.4813 5.12682C12.6325 4.8957 12.9423 4.83085 13.1734 4.98196Z'
          fill='#007152'
          fill-opacity='0.87451'
        />
      </svg>
    </Stack>
  );
}

export default IconAccept;
