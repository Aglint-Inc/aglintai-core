import { Card, CardContent } from '@components/ui/card';
import React from 'react';

import DeclineLeadTimeChart from './DeclineLeadTimeChart';
import HistoricInterviews from './HistoricInterviews';
import InterviewCountByTimeFrame from './InterviewCountByTimeFrame';

const InterviewCount = () => {
  return (
    <>
      <div className='flex flex-col space-y-6'>
        <Card className='w-full  shadow-none'>
          <CardContent>
            <div className='space-y-8'>
              <InterviewCountByTimeFrame />
              <HistoricInterviews />
            </div>
          </CardContent>
        </Card>
      </div>
      <DeclineLeadTimeChart />
    </>
  );
};

export default InterviewCount;
