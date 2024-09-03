import { Stack } from '@mui/material';
import React from 'react';

const OptimisticWrapper: React.FC<{
  children: React.ReactNode;
  loading?: boolean;
}> = ({ children, loading = true }) => {
  return (
    <Stack
      style={{
        opacity: loading ? 0.4 : 1,
        pointerEvents: loading ? 'none' : 'auto',
        transition: '0.4s',
        width: '100%',
      }}
    >
      {children}
    </Stack>
  );
};

export default OptimisticWrapper;
