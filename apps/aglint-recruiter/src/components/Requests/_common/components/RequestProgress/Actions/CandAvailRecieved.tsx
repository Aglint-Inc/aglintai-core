import { type DatabaseTable } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import React from 'react';

// eslint-disable-next-line no-unused-vars
const CandAvailRecieved = (progress: DatabaseTable['request_progress']) => {
  return (
    <>
      <Stack direction={'row'} mt={1} gap={1}></Stack>
    </>
  );
};

export default CandAvailRecieved;
