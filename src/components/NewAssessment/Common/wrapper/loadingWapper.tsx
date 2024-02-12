import { Stack } from '@mui/material';
import React from 'react';

const OptimisticWrapper: React.FC<{ children: React.JSX.Element }> = ({
  children,
}) => {
  return (
    <Stack style={{ opacity: 0.4, pointerEvents: 'none' }}>{children}</Stack>
  );
};

export default OptimisticWrapper;
