import { Avatar, Typography } from '@mui/material';
import React from 'react';

import { JobCandidateCard } from '@/devlink';

function CandidateCard({ candidateDetails }) {
  return (
    <JobCandidateCard
      slotProfilePic={
        <Avatar
          sx={{
            width: '84px',
            height: '84px',
            backgroundColor: `rgba(${Math.random() * 150},${
              Math.random() * 150
            },${Math.random() * 150},0.6)`,
          }}
          variant='rounded'
        >
          <Typography color={'white.700'} fontSize={'20px'} variant='body1'>
            {candidateDetails.first_name.charAt(0)}
          </Typography>
        </Avatar>
      }
      textName={candidateDetails.first_name}
    />
  );
}

export default CandidateCard;
