import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card';
import React from 'react';

import { type getHomePage } from '@/routers/candidatePortal/get_home_page';

import InterviewProgressCard from './InterviewProgressCard';

function InterviewProgress({
  interviews,
}: {
  interviews: getHomePage['output']['interviewPlan'];
}) {
  return (
    <Card className='mx-auto w-full max-w-3xl border-border'>
      <CardHeader>
        <CardTitle className='text-lg font-medium'>Interview Plan</CardTitle>
      </CardHeader>
      <CardContent>
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
