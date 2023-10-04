import { Paper, Skeleton, Stack } from '@mui/material';
import React from 'react';

function SkeltonLinkedin() {
  return (
    <Stack spacing={1}>
      {[1, 2, 3, 4, 5].map((ele, i) => {
        return (
          <Paper key={i} sx={{ borderRadius: '4px' }}>
            <Stack px={2} py={1}>
              <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Skeleton
                  variant='text'
                  sx={{ fontSize: '1rem', width: 200 }}
                />
                <Skeleton variant='rounded' width={20} height={20} />
              </Stack>
              <Stack spacing={0.5} direction={'row'} alignItems={'center'}>
                <Skeleton variant='rounded' width={20} height={20} />
                <Skeleton
                  variant='text'
                  sx={{ fontSize: '1rem', width: 250 }}
                />
              </Stack>
            </Stack>
          </Paper>
        );
      })}
    </Stack>
  );
}

export default SkeltonLinkedin;
