import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import React from 'react';

import type { apiHomepageResponse } from '@/api/candidate_portal/home_page/route';

import InterviewProgressCard from './InterviewProgressCard';

function InterviewProgress({
  interviews,
}: {
  interviews: apiHomepageResponse['interviewPlan'];
}) {
  return (
    <Card className='mx-auto w-full max-w-3xl'>
      <CardHeader>
        <CardTitle className='text-lg font-medium'>Interview Plan</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {interviews.map((interview, index) => (
          <InterviewProgressCard
            key={index}
            interview={interview}
            isLast={index === interviews.length - 1}
          />
        ))}
      </CardContent>
    </Card>
  );
}

export default InterviewProgress;
