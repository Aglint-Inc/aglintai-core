import { Stack } from '@mui/material';
import type React from 'react';

const OptimisticWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Stack style={{ opacity: 0.4, pointerEvents: 'none' }}>{children}</Stack>
  );
};

export default OptimisticWrapper;
