import { Typography } from '@mui/material';
import React from 'react';

import { apiHomepageResponse } from '@/src/app/api/candidate_portal/home_page/route';

import InterviewProgressCard from './InterviewProgressCard';

function InterviewProgress({
  interviews,
}: {
  interviews: apiHomepageResponse['interviewPlan'];
}) {
  return (
    <div className='w-full max-w-3xl mx-auto flex flex-col gap-4 pb-2'>
      <Typography fontWeight={500}>Interview Plan</Typography>
      <div>
        {interviews.map((interview, index) => (
          <InterviewProgressCard
            key={index}
            interview={interview}
            isLast={index === interviews.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

export default InterviewProgress;
