import { LinearProgress } from '@mui/material';
import React from 'react';

function Progress({assessmentQuestions,currentProgress}) {
  return (
    <LinearProgress
      sx={{
        '& .bar1Determinate': {
          bgcolor: 'blue.500',
        },

        bgcolor: 'blue.200',
        borderRadius: '30px',
        height: '6px',
      }}
      classes={{
        bar1Determinate: 'bar1Determinate',
        determinate: 'determinate',
      }}
      variant='determinate'
      value={Math.floor((currentProgress / assessmentQuestions?.length) * 100)}
    />
  );
}

export default Progress;
