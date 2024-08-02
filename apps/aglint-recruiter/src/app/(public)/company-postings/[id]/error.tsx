'use client';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

import { GlobalIcon } from '@/devlink/GlobalIcon';

const Container = styled(Box)`
  display: flex;
  alignitems: center;
  justifycontent: center;
  flexdirection: column;
  padding: ${({ theme }) => theme.spacing(4)};
  borderradius: ${({ theme }) => theme.shape.borderRadius};
  backgroundcolor: var(--neutral-2);
  boxshadow: ${({ theme }) => theme.shadows[1]};
  textalign: center;
  maxwidth: 320px;
  margin: auto;
`;

const JobNotFound = () => {
  return (
    <Container>
      <GlobalIcon iconName='error' size={9} />
      <Typography variant='h3' gutterBottom>
        Job not found
      </Typography>
      <Typography variant='body1'>
        Sorry, we couldn&apos;t find the job you&apos;re looking for. Please try
        searching again or contact support.
      </Typography>
    </Container>
  );
};

export default JobNotFound;
