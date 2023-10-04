import { Stack, Typography } from '@mui/material';
import React from 'react';

import Loader from '../../Common/Loader';

function LoadingBackdrop({ text }) {
  return (
    <Stack
      sx={{
        height: '100%',
        width: '100%',
        mt: '3px',
        zIndex: 5,
      }}
    >
      <Stack
        direction={'row'}
        position={'absolute'}
        sx={{
          left: '50%',
          transform: 'translate(-50%, 0)',
          top: '40vh',
          boxShadow: '0px 4px 8px 0px rgba(4, 68, 77, 0.15)',
          p: '10px 20px',
          background: '#fff',
          borderRadius: '10px',
        }}
        alignItems={'center'}
        justifyContent={'center'}
        spacing={'20px'}
      >
        <Stack>
          <Loader />
        </Stack>

        <Typography variant='h4'>{text}</Typography>
      </Stack>
    </Stack>
  );
}

export default LoadingBackdrop;
