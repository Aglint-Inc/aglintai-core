import React from 'react';
import InterviewProgressCard from './InterviewProgressCard';
import { apiHomepageResponse } from '@/src/app/api/candidate_portal/home_page/route';

function InterviewProgress({
  interviews,
}: {
  interviews: apiHomepageResponse['interviewPlan'];
}) {
  return (
    <div className='w-full max-w-3xl mx-auto flex flex-col gap-4 pb-20'>
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
