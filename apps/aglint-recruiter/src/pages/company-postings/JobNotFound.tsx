import { Box,Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

import { GlobalIcon } from '@/devlink/GlobalIcon';

const Container = styled(Box)`
  display: flex;
  alignItems: center;
  justifyContent: center;
  flexDirection: column;
  padding: ${({ theme }) => theme.spacing(4)};
  borderRadius: ${({ theme }) => theme.shape.borderRadius};
  backgroundColor: var(--neutral-2);
  boxShadow: ${({ theme }) => theme.shadows[1]};
  textAlign: center;
  maxWidth: 320px;
  margin: auto;
`;


const JobNotFound = () => {
  return (
    <Container>
      <GlobalIcon iconName="error"  size={9}/>
      <Typography variant="h3" gutterBottom>
        Job not found
      </Typography>
      <Typography variant="body1">
        {`Sorry, we couldn't find the job you're looking for. Please try searching again or contact support.`}
      </Typography>
    </Container>
  );
};

export default JobNotFound;
